const User = require('../models/user')
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({user})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      message: e.message
    })
  }
}

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email}).exec();
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Password no matched!'
      })
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
    res.cookie('t', token, { expiresIn: '7d'})
    return res.json({token, user})
  }  catch(e) {
    console.log(e.message)
    return res.status(400).send(e.message)
  }
}

const signOut = (req, res) => {
  res.clearCookie('t')
  return res.json({message: "Sign out success"})
}

module.exports = {
  signUp,
  signIn,
  signOut
}
