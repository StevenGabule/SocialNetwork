const User = require('../models/user')

const index = async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findById(userId).exec()
    return res.json({user})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      message: e.message
    })
  }
}
const edit = async (req, res) => {
  try {
    const {id} = req.user;
    const user = await User.findById(id).exec()
    return res.json({user})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      message: e.message
    })
  }
}

const update = async (req, res) => {
  try {
    const {id: _id} = req.user;
    const user = await User.findOneAndUpdate({_id}, {name: req.body.name}, {new: true})
    return res.status(200).json({user})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

module.exports = {
  index,
  edit,
  update
}
