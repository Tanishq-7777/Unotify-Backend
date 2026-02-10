const { transporter } = require("./emailConfing");
const { Verification_Email_Template } = require("./emailTemplate");

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Tanishq Saxena" <saxenatanishq4567@gmail.com>',
      to: email,
      subject: "Verify Your Email Address.",
      text: "Verify Your Email Address.", // Plain-text version of the message
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode,
      ),
    });
    console.log("Email sent Successfully");
  } catch (err) {
    console.error("Email error:", err);
  }
};
module.exports = { sendVerificationEmail };
