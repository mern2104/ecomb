const nodemailer = require("nodemailer");

exports.sendVerificationEmail = (email, name, url) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: "qprykxlicektqxiv",
    },
  });

  let info = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Oreby Ecommerce Verification Link", // Subject line
    text: `Hello ${name}`, // plain text body
    html: `<b>${url}</b>`, // html body
  };

  transporter.sendMail(info, (err, res) => {
    if (err) return err;
    
    return res;
  });
};
