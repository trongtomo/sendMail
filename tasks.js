require("dotenv").config();

var moment = require("moment");
var nodemailer = require("nodemailer");

const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");
const { log } = require("console");

//env Email
const userEmail = process.env.MAIL_USER;
const passEmail = process.env.MAIL_PASS;
//request http
const baseUrl = "http://192.168.1.32:92";
const start_date = moment().subtract(2, "day").format("DD-MM-YYYY");
const end_date = moment().subtract(1, "day").format("DD-MM-YYYY");
const file = fs.createWriteStream(`${start_date}_${end_date}.zip`);
const request = http.get(
  `${baseUrl}/Report/Daily?start=${start_date}&end=${end_date}`,
  function (response) {
    response.pipe(file);
    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
      sendmail();
    });
  }
);
//2 step verify auth and create app password on gmail
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: passEmail,
  },
});

let mailDetails = {
  from: userEmail,
  to: "thanhnguyet@phumyphuong.vn",
  cc: [
    "quangvinh@phumyphuong.vn,",
    '"nquangky@gmail.com" <nquangky@gmail.com>',
    "vinhloc@phumyphuong.vn",
    "nguyenlan@phumyphuong.vn",
    '"lientam.pham@gmail.com" <lientam.pham@gmail.com>',
    '"linhdtm2711@gmail.com" <linhdtm2711@gmail.com>',
    '"minhle1508@gmail.com" <minhle1508@gmail.com>',
    '"thanhnguyet03@gmail.com" <thanhnguyet03@gmail.com>',
    "developer@phumyphuong.vn",
  ],
  subject: `[MOPA] Dữ liệu Mopa & Suppliers từ ngày ${start_date} đến ${end_date}`,
  html: `<p>Hi Chị Nguyệt,</p></br><p>Gửi chị dữ liệu cho Mopa, các suppliers (DMS, Phát) từ ngày ${start_date} đến ${end_date}</p></br><p>Thanks & Best Regards,</p></br><p></p>Trong Nguyen.</p>`,
  attachments: [
    {
      filename: `${file.path}`,
      path: __dirname + `/${file.path}`,
      cid: "uniq-mailtrap.png",
    },
  ],
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
