const { TimesheetRepository } = require("../repository");
const csv = require('csvtojson')

const fs = require("fs");
const path = require("path");

const FS = require("../helpers/utils/file.utils");

exports.uploadTimesheet = async (request, response) => {
  try {
    const body = {
      timesheetFile: request.file.filename,
      month: request.query.month,
      year: request.query.year,
    };

    const timesheet = await TimesheetRepository.createTimesheet(body);
    if (timesheet) {
      TimesheetRepository.getTimesheetDetails(
        timesheet,
        request.salary_password
      );
      return response.status(200).json({
        status: "success",
        message: "Timesheet uploaded successfully, Please check your mail",
      });
    } else {
      return response.status(500).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
};

exports.sendPaySlips = async (request, response) => {
  try {
    const timesheetFile = request.file.filename;
    let resJson = await csv().fromFile(path.join(__dirname, `../assets/timesheets/${timesheetFile}`));
    
    resJson = resJson[1] // change this to loop

    let data = {
      month: resJson.Month,
      year: resJson.Year,
      empCode: resJson.Code || '',
      name: resJson['Name of Emplyee'] || '',
      pf_account_no: resJson['UAN No'] || '',
      designation: '',
      bank_account_no: resJson['Bank Account No'] || '',
      pan_no: resJson['Pan No'],
      bank_name: resJson['Bank Name'],
      //
      total_days: resJson['Working'],
      extra_working_days: resJson['Extra Working'],
      paid_days: resJson['Net Working Days'],
      month_paid_leaves: resJson['Paid Leaves'],
      already_taken: resJson['Paid Leaves Already Taken'],
      allocated_leaves: resJson['Total Leaves Allocated'],
      previous_leaves: resJson['Paid Leaves Already Taken'],
      absents: resJson['Absents'],
      cf_leaves: Number(resJson['Total Leaves Allocated']) - Number(resJson['Paid Leaves']),
      //
      basic_pay: (Number(resJson['Net Salary']) / 2).toFixed(2),
      hra: 0,
      conveyance_all: 0,
      medical_all: 0,
      total_pf: Number(resJson.pf_employee) + Number(resJson.pf_employer),
      professional_tax: Number(resJson.professional_tax),
      advance: Number(resJson['Advance']) || 0,
      tds: Number(resJson['TDS']) || 0,
      previous_adj: Number(resJson['Previous Adjustment']) || 0,
      net_salary: Number(resJson['Net Salary'])
    }
    data.hra = (data.basic_pay / 2).toFixed(2);
    data.conveyance_all = (data.basic_pay / 4).toFixed(2);
    data.medical_all = (data.basic_pay / 4).toFixed(2);
    data.total_deductions = (data.total_pf + data.professional_tax + data.tds + data.previous_adj)
    data.net_payable = data.net_salary - data.total_deductions

    response.json(data)
    FS.genratePaySlip(data)

  } catch (error) {
    response.status(400).json({
      message: error.message,
    });
  }
}
