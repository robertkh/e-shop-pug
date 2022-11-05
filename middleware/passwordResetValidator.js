const { check, validationResult } = require("express-validator");

exports.resetValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("<strong>email</strong> : Անվան դաշտը դատարկ է")
    .isEmail()
    .withMessage("<strong>email</strong> : Նամակի ֆորմատ չէ"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("<strong>password</strong> : Անվան դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("<strong>password</strong> : Պետք է ունենա 6-20 սիմվոլ"),
];

exports.resetValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};
