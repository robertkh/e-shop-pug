const nodemailer = require("nodemailer");

module.exports = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dimord2015@gmail.com", // this should be YOUR GMAIL account
      pass: "parnarareg", // this should be your password
    },
  });

  let htmlBody = `<h4>Activation link</h4> <p><a href="${
    req.protocol
  }://${req.get("host")}${req.baseUrl}/setnewpass/${
    res.locals.jwt
  }">Սեղմիր հղմանը ամրագրելու համար ծածկագրի փոփոխությունը։</a></p>`;

  let mailOptions = {
    from: '"e-Shop" <dimord2015@gmail.com>',
    to: req.body.email,
    subject: "Password recover",
    html: htmlBody,
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.json({
        message:
          "message not sent: an error occured; check the server's console log",
      });
    } else {
      //res.json({ message: `message sent: ${info.messageId}` });
      console.log(`message sent: ${info.response}`);
    }
  });
};
