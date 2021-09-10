const {check} = require("express-validator");

exports.rules = (() => {
  return [
    check('title', 'Must be min of 5 and max of 150 character long').notEmpty().isLength({
      min: 4,
      max: 150
    }),
    check('body', 'Must be min of 4 and max of 2000 character long').notEmpty().isLength({
      min: 4,
      max: 2000
    }),
  ]
})();
