require("dotenv").config();
var nodemailer = require("nodemailer");

const http = require("http"); // or 'https' for https:// URLs

//env Email
const userEmail = process.env.MAIL_USER;
const passEmail = process.env.MAIL_PASS;

// Set something to do or just bland sendMail
sendmail();

//1 step verify auth and create app password on gmail
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: passEmail,
  },
});

//2 Config your mail message(details or something called like that)
let mailDetails = {
  from: userEmail,  
  to: "putYourReceiverHere",
  cc: [
    "putYourCChere"
  ],
  subject: "Hello World!",
  html: `<p>Hello, I need Money<p>`,
};
function sendmail() {
  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err.message);
    } else {
      console.log("Email sent successfully" + data.response);
    }
  });
}
