const path = require("path");
const XLSX = require("xlsx");
const moment = require("moment");
const {
  getMonthDateRange,
  monthsString,
} = require("../helpers/utils/timesheetUtil");
const TimesheetModel = require("../models/timesheet.model");
const userService = require("../services/userService");
let sourcePath = path.join(__dirname, `../assets/timesheets`);
const leaveServices = require("../services");
const { UserAccountService } = require("../services/userAccountService");
const { decryptSalaryPassword } = require("../services");
const { professional_tax_slabs, calculatePF } = require("../constant/account");
const { updateTimeSheet } = require("../helpers/timeSheetCSV");
const { sendTimeSheetMail } = require("../helpers");
const userAccountService = new UserAccountService();
class TimesheetRepository {
  findTimeSheet = async (condition) => {
    try {
      return await TimesheetModel.findOne({
        month: condition.month,
        year: condition.year,
      });
    } catch (error) {
      return new Error(error);
    }
  };
  findTimesheetById = async (id) => {
    try {
      return await TimesheetModel.findOne({ _id: id });
    } catch (error) {
      return new Error(error);
    }
  };
  createTimesheet = async (body) => {
    try {
      const selectedTimesheet = await this.findTimeSheet({
        month: body.month,
        year: body.year,
      });
      if (selectedTimesheet) {
        selectedTimesheet.previousTimesheets = [
          ...selectedTimesheet.previousTimesheets,
          selectedTimesheet.timesheetFile,
        ];
        selectedTimesheet.timesheetFile = body.timesheetFile;
        await selectedTimesheet.save();
        return selectedTimesheet;
      } else {
        const timesheet = await TimesheetModel.create(body);
        await timesheet.save();
        return timesheet;
      }
    } catch (error) {
      return new Error(error);
    }
  };
  getAllTimesheets = async () => {
    try {
      return await TimesheetModel.find();
    } catch (error) {
      return new Error(error);
    }
  };
  deleteTimesheets = async (id) => {
    try {
      return await TimesheetModel.deleteOne({ _id: id });
    } catch (error) {
      return new Error(error);
    }
  };
  changeStatusOfAttendance = (days, daysAndStatus, status) => {
    if (Array.isArray(days) && days.length > 0) {
      for (let date of days) {
        if (date !== "Invalid date") {
          const firstDigit = date.split("-")[0];
          if (Number(firstDigit) <= Number("09")) {
            const digit = firstDigit.replace("0", "");
            daysAndStatus[`${digit}`] = status;
          } else {
            daysAndStatus[`${firstDigit}`] = status;
          }
        }
      }
    }
    return daysAndStatus;
  };
  getFullDayAndHalfDayDates = (sheetData, i, condition) => {
    const days = Object.values(sheetData[i + 1]);
    const status = Object.values(sheetData[i + 8]);
    // days.splice(0, 1);
    // status.shift(0, 1);
    const daysAndStatus = Object.assign(
      ...days.map((k) => ({ [k || "val"]: status[k] }))
    );
    delete daysAndStatus["val"];
    /**
     * calculating full days
     */
    const fullday = days.reduce((acc, e, index) => {
      if (status[index] === "A") {
        return [
          ...acc,
          `${moment(
            `${e}-${condition.month}-${condition.year}`,
            "DD-MMMM-YYYY"
          ).format("DD-MM-YYYY")}`,
        ];
      }
      return acc;
    }, []);
    /**
     * calculating half days
     */
    const halfday = days.reduce((acc, e, index) => {
      if (status[index] === "P/2") {
        return [
          ...acc,
          `${moment(
            `${e}-${condition.month}-${condition.year}`,
            "DD-MMMM-YYYY"
          ).format("DD-MM-YYYY")}`,
        ];
      }
      return acc;
    }, []);
    /**
     * calculating week_off
     */
    const week_off = days.reduce((acc, e, index) => {
      if (status[index] === "WO") {
        return [
          ...acc,
          `${moment(
            `${e}-${condition.month}-${condition.year}`,
            "DD-MMMM-YYYY"
          ).format("DD-MM-YYYY")}`,
        ];
      }
      return acc;
    }, []);
    /**
     * calculating presents
     */
    const presents = days.reduce((acc, e, index) => {
      if (status[index] === "P") {
        return [
          ...acc,
          `${moment(
            `${e}-${condition.month}-${condition.year}`,
            "DD-MMMM-YYYY"
          ).format("DD-MM-YYYY")}`,
        ];
      }
      return acc;
    }, []);
    return { daysAndStatus, days, fullday, halfday, week_off, presents };
  };
  convertDates = (from, to) => {
    const dates = [];
    const dateStart = moment(from);
    const dateEnd = moment(to);
    while (dateEnd.diff(dateStart, "days") >= 0) {
      dates.push(dateStart.format("DD-MM-YYYY"));
      dateStart.add(1, "days");
    }
    return dates;
  };
  createApprovedDatesList = (leaves) => {
    let totalWfh = [];
    let totalLeaves = [];
    let extraDays = [];
    leaves.forEach((element) => {
      if (element.type.includes("wfh")) {
        totalWfh = [
          ...totalWfh,
          ...this.convertDates(element.fromDate, element.toDate),
        ];
      } else if (element.type.includes("extra")) {
        extraDays = [
          ...extraDays,
          ...this.convertDates(element.fromDate, element.toDate),
        ];
      } else {
        totalLeaves = [
          ...totalLeaves,
          ...this.convertDates(element.fromDate, element.toDate),
        ];
      }
    });
    return { totalLeaves, totalWfh, extraDays };
  };
  calculatePayedAndUnPaidLeaves = (absents, approvedLeaves) => {
    let paid = { fullDay: [], halfday: [] };
    let unPaid = { fullDay: [], halfday: [] };
    let wfh = { fullDay: [], halfday: [] };
    let extra = { fullDay: [], halfday: [] };

    absents.fullday.forEach((element) => {
      if (approvedLeaves.totalLeaves.find((e) => e === element)) {
        paid.fullDay = [...paid.fullDay, element];
      } else if (approvedLeaves.totalWfh.find((e) => e === element)) {
        wfh.fullDay = [...wfh.fullDay, element];
      } else if (approvedLeaves.extraDays.find((e) => e === element)) {
        extra.fullDay = [...extra.fullDay, element];
      } else {
        unPaid.fullDay = [...unPaid.fullDay, element];
      }
    });
    absents.halfday.forEach((element) => {
      if (approvedLeaves.totalLeaves.find((e) => e === element)) {
        paid.halfday = [...paid.halfday, element];
      } else if (approvedLeaves.totalWfh.find((e) => e === element)) {
        wfh.halfday = [...wfh.halfday, element];
      } else if (approvedLeaves.extraDays.find((e) => e === element)) {
        extra.halfday = [...extra.halfday, element];
      } else {
        unPaid.halfday = [...unPaid.halfday, element];
      }
    });
    return { paid, unPaid, wfh, extra };
  };

  getTimesheetDetails = async (timesheetDetail, salary_password) => {
    const condition = {
      year: timesheetDetail.year,
      month: timesheetDetail.month,
    };
    const data = getMonthDateRange(condition.year, condition.month);

    if (timesheetDetail) {
      const timesheetPath = path.join(
        sourcePath,
        `/${condition.year}/${condition.month}/${timesheetDetail.timesheetFile}`
      );
      const workbook = XLSX.readFile(timesheetPath);
      const sheetNames = workbook.SheetNames;
      const sheetData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetNames[0]]
      );
      const excelData = [];
      for (let i = 0; i < sheetData.length; i = i + 10) {
        const result = this.getFullDayAndHalfDayDates(sheetData, i, condition);
        let element = Object.values(sheetData[i]);
        element = element.filter((obj) => obj);
        const empCode = element[1];
        let presents = Number(element[5]);
        let absents = Number(element[13]);
        const user = await userService.getUserByEmpCode(empCode);
        if (user) {
          const accountDetails = await userAccountService.getUserAccountByUser(
            user._id
          );
          const Leaves = await leaveServices.getLeavesByUser(user._id, {
            $or: [
              {
                fromDate: {
                  $gte: new Date(data.start),
                  $lt: new Date(data.end),
                },
              },
              {
                toDate: {
                  $gte: new Date(data.start),
                  $lt: new Date(data.end),
                },
              },
            ],
            status: "approved",
          });

          const approvedLeavesDates = this.createApprovedDatesList(Leaves);
          const paidAndUnpaidLeaves = this.calculatePayedAndUnPaidLeaves(
            result,
            approvedLeavesDates
          );

          let wfhCount = 0;

          if (
            paidAndUnpaidLeaves.wfh.fullDay.length ||
            paidAndUnpaidLeaves.wfh.halfday.length
          ) {
            wfhCount =
              paidAndUnpaidLeaves.wfh.fullDay.length +
              paidAndUnpaidLeaves.wfh.halfday.length / 2;

            result.daysAndStatus = paidAndUnpaidLeaves.wfh.fullDay.length
              ? this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.wfh.fullDay,
                result.daysAndStatus,
                "WFH"
              )
              : this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.wfh.halfday,
                result.daysAndStatus,
                "WFH/2"
              );
          }
          let extraCount = 0;
          if (
            paidAndUnpaidLeaves.extra.fullDay.length ||
            paidAndUnpaidLeaves.extra.halfday.length
          ) {
            extraCount =
              paidAndUnpaidLeaves.extra.fullDay.length +
              paidAndUnpaidLeaves.extra.halfday.length / 2;

            result.daysAndStatus = paidAndUnpaidLeaves.wfh.fullDay.length
              ? this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.extra.fullDay,
                result.daysAndStatus,
                "EXD"
              )
              : this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.extra.halfday,
                result.daysAndStatus,
                "EXD/2"
              );
          }


          let total_paid_leaves =
            paidAndUnpaidLeaves.paid.fullDay.length +
            paidAndUnpaidLeaves.paid.halfday.length / 2;
          let total_unpaid_leaves =
            paidAndUnpaidLeaves.unPaid.fullDay.length +
            paidAndUnpaidLeaves.unPaid.halfday.length / 2;



          if (user.allocatedLeaves - user.leavesTaken > 0) {
            result.daysAndStatus = paidAndUnpaidLeaves.paid.fullDay.length
              ? this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.paid.fullDay,
                result.daysAndStatus,
                "L"
              )
              : this.changeStatusOfAttendance(
                paidAndUnpaidLeaves.paid.halfday,
                result.daysAndStatus,
                "L/2"
              );
          }

          let total_week_offs = Number(element[7]);

          const leave_balance = user.allocatedLeaves - user.leavesTaken;
          if (total_paid_leaves && leave_balance < total_paid_leaves) {

            const extra_leaves = total_paid_leaves - leave_balance;
            total_paid_leaves += total_paid_leaves - extra_leaves;
            total_unpaid_leaves += extra_leaves;

          }
          
          const net_week_offs = total_week_offs - extraCount;
          const paid_working_days = presents + total_week_offs + total_paid_leaves + extraCount
          const total_days = paid_working_days + total_unpaid_leaves

          const salary = decryptSalaryPassword(
            accountDetails.salary,
            salary_password
          );

          const month_salary = (salary / 12).toFixed(2);

          const month_paid_salary = (month_salary / total_days) * paid_working_days;
          const total_pf = accountDetails.pf_status
            ? calculatePF(month_paid_salary / 2)
            : 0;
          const professionalTax = professional_tax_slabs(
            salary,
            monthsString.indexOf(condition.month)
          );
          const paid_salary = (
            month_paid_salary -
            professionalTax -
            total_pf * 2
          ).toFixed(2);

          const salaryObj = {
            "Month": timesheetDetail.month,
            "Year": timesheetDetail.year,
            "Code": String(user.empCode),
            "Email": user.email,
            "Name of Emplyee": user.fullName,
            "Pan No": accountDetails.pan_no || '',
            "UAN No": accountDetails.uan_no || '',
            "D.O.J": moment(user.joiningDate).format("DD-MMM-YY"),
            "Bank Account No": accountDetails.account_no || '',
            "Bank Name": accountDetails.bank_name || '',
            ...result.daysAndStatus,
            "Total Leaves Allocated": user.allocatedLeaves,
            "Paid Leaves Already Taken": user.leavesTaken,
            "Present": presents,
            "Absents": absents,
            "Extra Working": extraCount,
            "Work From Home": wfhCount,
            "Week Off / Holiday": net_week_offs || 0,
            "Working": total_days,
            "Paid Leaves": total_paid_leaves,
            "Unpaid Leaves": total_unpaid_leaves,
            "Net Working Days": paid_working_days,

            pf_employee: total_pf,
            pf_employer: total_pf,
            professional_tax: professionalTax,
            "Advance": "",
            TDS: "",
            'Previous Adjustment': "",
            "Payable Salary": paid_salary,
            "Net Salary": (month_paid_salary).toFixed(2),
            "Total Salary": salary,
          };


          if (user.previousMonthLeaves !== Number(total_paid_leaves) || user.previousMonth !== timesheetDetail.month) {
            await userService.updateOneUser(user._id, {
              leavesTaken: Number(user.leavesTaken) + (Number(total_paid_leaves) - user.previousMonthLeaves),
              previousMonthLeaves: user.previousMonthLeaves + (Number(total_paid_leaves) - user.previousMonthLeaves),
              previousMonth: timesheetDetail.month
            })
          }
console.log("updateTimeSheet")
          excelData.push(salaryObj);
          updateTimeSheet(excelData, result.days);
        }
      }
      const sheetPath = path.join(__dirname, "../assets/timesheet.csv");
      sendTimeSheetMail(
        "shubhamk@thoughtwin.com",
        `Timesheet of ${timesheetDetail.month} ${timesheetDetail.year}`,
        {
          name: "timesheet.csv",
          path: sheetPath,
        }
      );
    } else {
      return "No Timesheet Found!";
    }
  };
}
module.exports = new TimesheetRepository();
