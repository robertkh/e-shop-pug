///////////////////////////////////////////////
const { check, validationResult } = require("express-validator");

///////////////////////////////////////////////
exports.messValidator = [
  check("username")
    .exists()
    .not()
    .isEmpty()
    .withMessage("<strong> Username - </strong> դաշտը դատարկ է:")
    .trim()
    .escape()
    .isLength({
      min: 6,
      max: 20,
    })
    .withMessage("<strong> Username - </strong> Պետք է ունենա 6-20 սիմվոլ:"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("<strong> E-mail - </strong> դաշտը դատարկ է:")
    .isEmail()
    .withMessage("<strong> E-mail - </strong> Նամակի ֆորմատ չէ:"),
  check("subject")
    .exists()
    .withMessage("<strong> Subject - </strong> is undefined")
    .not()
    .isEmpty()
    .withMessage("<strong> Subject - </strong> դաշտը դատարկ է:")
    .trim()
    .escape()
    .isLength({
      max: 64,
    })
    .withMessage(
      "<strong> Subject - </strong>  դաշտը չպետք է ունենա 64 կամ ավել սիմվոլ։"
    ),
  check("message")
    .exists()
    .not()
    .isEmpty()
    .withMessage("<strong> Message - </strong> դաշտը դատարկ է։")
    .isLength({
      max: 256,
    })
    .withMessage(
      "<strong> Message - </strong> դաշտը չպետք է ունենա 256 կամ ավել սիմվոլ։"
    ),
];

///////////////////////////////////////////////
exports.messValidationResult = (req, res, next) => {
  console.log("=== >>> signup validationResult invoked ");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};
