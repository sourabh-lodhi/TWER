const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const XLSX = require("xlsx");
const Handlebars = require('handlebars');
var pdf = require('html-pdf');
const { sendPayslipMail } = require("../services");


const payslipTemplate = path.join(__dirname, "../../assets/payslip/templates/payslip.handlebars")
// const { TimesheetRepository } = require("../../repository");
// const { usersService, LeavesServices } = require("../../services");
// let sourcePath = path.join(__dirname, `../../assets/timesheets`);
// const leavesServices = new LeavesServices();
class FileService {
  isPathExists = (path) => {
    if (fs.existsSync(path)) {
      return true;
    }
    return false;
  };

  unlinkFile = (filePath) => {
    if (this.isPathExists(filePath)) {
      fs.unlinkSync(filePath);
    }
  };

  makeDirectory = (folderPath) => {
    if (!this.isPathExists(folderPath)) {
      return new Promise((resolve, reject) => {
        return fs.mkdir(folderPath, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true)
          }

        });
      })
    }
  }
  genratePaySlip = (data) => {
    var html = Handlebars.compile(fs.readFileSync(payslipTemplate).toString())(data)

    const pdfPath = `./emp-${data.Code}.pdf`
    // fs.createWriteStream(pdfPath)
    pdf.create(html, { height: 1080, width: 1080 }).toFile(pdfPath, function (err, res) {
      if (err) return console.log(err);
      sendPayslipMail("shubhamk@thoughtwin.com", 'Payslip', {
        path: res.filename,
        name: `${data.name}.pdf`
      })
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
  }
}

module.exports = new FileService();
