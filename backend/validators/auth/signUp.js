const {check} = require("express-validator");
const User = require('../../models/user')

exports.rules = (() => {
  return [
    check('name', 'Must be min of 3 and max of 100 character long')
      .notEmpty()
      .isLength({
        min: 3,
        max: 100
      }),
    check('email')
      .notEmpty()
      .withMessage('Email is required!')
      .isLength({
      min: 4,
      max: 150
    }).withMessage('Character must be range of 4 to 150 long!')
      .isEmail()
      .withMessage('Invalid email input. Kindly check the format!')
      .custom(email => {
      return User.findOne({email}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
    check('password', 'Must be min of 6 and max of 100 character long')
      .notEmpty()
      .isLength({
      min: 6,
      max: 100
    }),
  ]
})();
