const nodemailer = require("nodemailer");

exports.sendTimeSheetMail = (email, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: message,
    text: message,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("otp send successfully");
    })
    .catch((error) => {
      console.log("Timesheet mail error", error);
    });
};
