const nodeMialer = require("nodemailer");


const sendMailTransport = async (email, token) => {
  try {
    const mailTransport = nodeMialer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailDetails = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: "Reset Password Notification",
      html: `<h1 style="font-family: Arial, sans-serif; font-size:12px; color: red;">Here is the token to reset your password. Click on the button below:<br><br><a 
      href="https://www.yourcareerEx.com/${token}" 
      style="background-color:blue; color:white; text-decoration:none; padding:10px 18px; border-radius:4px; font-weight:bold; display:inline-block;">
      Reset Password</a>
      <br><br>
      If the button does not work for any reason, click the link below:
      <br><br>
     <a href="https://www.yourcareerEx.com/${token}" 
    style="color:blue; text-decoration:underline; word-break:break-all;">
    https://www.yourcareerEx.com/${token}</a>
    </h1>
`,
    };

    await mailTransport.sendMail(mailDetails);
  } catch (error) {
    console.log(error);
  }
};

const isValidEmail = (email) => {
  const regex =
    /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
  return regex.test(String(email).toLowerCase());
};

module.exports = { sendMailTransport, isValidEmail };
