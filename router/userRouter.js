////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();

////////////////////////////////////////////////////
const {
  signupValidator,
  signupValidationResult
} = require('../middleware/signupValidator');

////////////////////////////////////////////////////
const {
  postUserSignup,
  getUserActive,
  postUserLogin,
  getUsersLogout,
  getNewPassword,
  setNewPassword
} = require('../controllers/userController');

////////////////////////////////////////////////////
const sendSignupMail = require('../middleware/sendSignupMail');
const sendResetMail = require('../middleware/sendResetMail');

////////////////////////////////////////////////////
router.post('/signup', signupValidator, signupValidationResult, postUserSignup, sendSignupMail);

////////////////////////////////////////////////////
const {
  loginValidator,
  loginValidationResult
} = require('../middleware/loginValidator');

////////////////////////////////////////////////////
router.post('/login', loginValidator, loginValidationResult, postUserLogin);

////////////////////////////////////////////////////
router.post('/logout', getUsersLogout);

////////////////////////////////////////////////////
router.get('/:id', getUserActive)

////////////////////////////////////////////////////
const {
  resetValidator,
  resetValidationResult
} = require('../middleware/passwordResetValidator');

////////////////////////////////////////////////////
router.post('/getnewpass', resetValidator, resetValidationResult, getNewPassword, sendResetMail);

////////////////////////////////////////////////////
router.get('/setnewpass/:id', setNewPassword);

////////////////////////////////////////////////////
module.exports = router;