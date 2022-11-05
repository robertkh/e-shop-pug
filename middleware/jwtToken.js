const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!req.cookies.access_token) {
    return res
      .status(401)
      .send(
        "<br/> <br/> <h1>Ներողություն, նշված հասցեի տվյալները ձեր համար հասանելի չեն։ </h1>"
      );
  }

  const token = req.cookies.access_token.split(" ")[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, config.get("PrivateKey"));
    if (decoded._id == req.session.activeUserId) {
      next();
    } else {
      res.send("Access denied. You are not Admin");
    }
  } catch (ex) {
    res.status(400).send("Invalid JWT.");
  }
};
