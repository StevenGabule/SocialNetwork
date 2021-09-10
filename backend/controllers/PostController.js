const Post = require('../models/post')

const index = async (req, res) => {
  try {
    const posts = await Post.find({})
    return res.json({
      posts
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e.message
    })
  }
}

const create = async (req, res) => {
  try {
    const post = Post.create(req.body)
    if (post) {
      return res.json({
        message: "Successfully created a new post!"
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e.message
    })
  }
}

module.exports = {
  index,
  create
}
