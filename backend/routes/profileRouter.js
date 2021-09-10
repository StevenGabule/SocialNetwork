const router = require('express').Router();
const {index, update} = require("../controllers/ProfileController");
const {hasAuthorization} = require("../middleware/hasAuthorization");

router.get('/:userId', hasAuthorization, index)
router.put('/:userId', update)

module.exports = router;
