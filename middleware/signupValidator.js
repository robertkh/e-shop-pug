///////////////////////////////////////////////
const { check, validationResult } = require("express-validator");

///////////////////////////////////////////////
exports.signupValidator = [
  check("username")
    .exists()
    .not()
    .isEmpty()
    .withMessage("<strong>Username</strong> - Անվան դաշտը դատարկ է")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("<strong>Username</strong> - Պետք է ունենա 6-20 սիմվոլ"),

  check("email")
    .not()
    .isEmpty()
    .withMessage("<strong>Email</strong> - Անվան դաշտը դատարկ է")
    .isEmail()
    .withMessage("<strong>Email</strong> - Նամակի ֆորմատ չէ"),

  check("password")
    .exists()
    .withMessage("<strong>Password</strong> - is undefined")
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
      "<strong>Password</strong> : Չպետք է ունենա 20 կամ ավել սիմվոլ"
    ),

  check(
    "confirmPassword",
    "<strong>Confirm Password</strong> - Ծածկագրերը չեն համընկնում։"
  )
    .exists()
    .custom((value, { req }) => value === req.body.password),
];

///////////////////////////////////////////////
exports.signupValidationResult = (req, res, next) => {
  console.log("=== >>> signup validationResult invoked ");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};
