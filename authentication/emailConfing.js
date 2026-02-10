const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "saxenatanishq4567@gmail.com",
    pass: "ubvfdnelhybhjakm",
  },
});
// const sendEmail = async () => {
//   try {
//     const info = await transporter.sendMail({
//       from: '"Tanishq Saxena" <saxenatanishq4567@gmail.com>',
//       to: "srishtisaxenaa.04@gmail.com", //srishtisaxenaa.04@gmail.com
//       subject: "Hello AstroWorld User",
//       text: "Hello Moorkh", // Plain-text version of the message
//       html: "<b>Hello Moorkh</b>", // HTML version of the message
//     });
//   } catch (err) {
//     console.error("Email error:", err);
//   }
// };
// sendEmail();
module.exports = {
  transporter,
};
