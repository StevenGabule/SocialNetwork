const {check} = require("express-validator");
const User = require('../../models/user')

exports.rules = (() => {
  return [
    check('email')
      .notEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Invalid email input. Kindly check the format!')
      .custom(email => {
        return User.findOne({email}).then(user => {
          if (!user) {
            return Promise.reject('Email not found!');
          }
        });
      }),
    check('password')
      .notEmpty()
      .withMessage('Must be min of 6 and max of 100 character long')
  ]
})();
