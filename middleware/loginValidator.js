///////////////////////////////////////////////
const { check, validationResult } = require("express-validator");

///////////////////////////////////////////////
exports.loginValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("<strong>Email</strong> - Անվան դաշտը դատարկ է")
    .isEmail()
    .withMessage("<strong>Email</strong> -  Նամակի ֆորմատ չէ"),
  check("password")
    .exists()
    .withMessage("<strong>Password</strong> -  is undefined")
    .not()
    .isEmpty()
    .withMessage("<strong>Password</strong> - Ծածկագրի դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
    })
    .withMessage("<strong>Password</strong> - Պետք է ունենա 6 կամ ավել սիմվոլ")
    .isLength({
      max: 20,
    })
    .withMessage(
      "<strong>Password</strong> - Չպետք է ունենա 20 կամ ավել սիմվոլ"
    ),
];

///////////////////////////////////////////////
exports.loginValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};
