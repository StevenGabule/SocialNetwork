const {hasAuthorization} = require("../middleware/hasAuthorization");
const router = require('express').Router();
const {index, create, postsByUser, destroy, update} = require("../controllers/PostController");

router.get('/posts', index)
router.post('/posts', create)
router.put('/posts', update)
router.get('/posted', postsByUser)
router.delete('/posts/:userId', hasAuthorization, destroy)

module.exports = router;
