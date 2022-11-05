///////////////////////////////////////////////
const { check, validationResult } = require("express-validator");

///////////////////////////////////////////////
exports.storeValidator = [
  check("itemName")
    .not()
    .isEmpty()
    .withMessage("Անուն :  Անվան դաշտը դատարկ է")
    .trim()
    .escape()
    .withMessage("Անուն :  Պետք է պարունակի միայն տառ և թիվ։")
    .isLength({
      min: 6,
      max: 30,
    })
    .withMessage("Անուն :  Պետք է ունենա 6-20 սիմվոլ"),

  check("itemQty")
    .trim()
    .isInt({
      min: 1,
    })
    .withMessage("Քանակ :  Պետք է պարունակի միայն 1 և ավելի մեծ ամբողջ թիվ։")
    .isNumeric({
      no_symbols: true,
    })
    .withMessage("Քանակ :  Չպետք է պարունակի որևէ սիմվոլ, բացի թվանշաններից։"),

  check("itemPrice")
    .trim()
    .toFloat()
    .isFloat({
      min: 0,
    })
    .withMessage("Գին :  Պետք է պարունակի միայն դրական տասնորդական թիվ։"),
];

///////////////////////////////////////////////
exports.storeValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  }
  next();
};
