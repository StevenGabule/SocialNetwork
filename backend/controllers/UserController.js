const User = require('../models/user')

const index = async(req, res) => {
  try {
    const users = await User.find({}).exec();
    return res.status(200).json({users})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

module.exports = {
  index
}
