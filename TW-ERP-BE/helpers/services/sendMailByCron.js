require("dotenv").config();
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const messages = require("../../constant");

cron.schedule(" 10 22 18 * * *", () => {
  // aproved();
});

// const aproved = async () => {
//   for (let i = 0; i < leaveApproved.length; i++) {
//     const element = leaveApproved[i];
//     if (element.leaveFrom == "2022/08/01 14:04:03") {
//       sendMail(element);
//     }
//   }
// };

const sendMail = (email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email.from,
    subject: messages.leave.GENERATE_OOO_FRhOM_MY_SIDE,
    text: `${email.from}<h2>${email.type}</h2> <h1>||| OOO</h1> ${email.leaveFrom} to ${email.leaveTo}`,
  };
  transporter
    .sendMail(mailOptions)
    .then((info) => {})
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
