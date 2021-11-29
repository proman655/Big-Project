const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "0parkjuhwan901@gmail.com",
  from: "0parkjuhwan901@gmail.com", // Use the email address or domain you verified above
  subject: "TESTING",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
//ES8
sgMail
  .send(msg)
  .then((respose) => console.log("Email sent\n", process.env.SENDGRID_API_KEY))
  .catch((error) => console.log(error.message));
