var moment = require("moment");

module.exports = (req, res, next) => {
  if (!req.session.first_v) {
    req.session.first_v = moment().toString();
  }
  next();
};
