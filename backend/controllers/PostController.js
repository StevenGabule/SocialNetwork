const Post = require('../models/post')
const formidable = require('formidable');
const fs = require('fs')

const index = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('postedBy').exec()
    return res.json({posts})
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      error: e.message
    })
  }
}

const create = async (req, res, next) => {
  try {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded"
        })
      }

      let post = new Post(fields)
      post.postedBy = req.user.id;

      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.path);
        post.photo.contentType = files.photo.type;
      }
      await post.save();
    })
    return res.json({
      message: 'Successfully added a new post!'
    })
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

const postsByUser = async (req, res) => {
  try {
    const posts = await Post
      .find({postedBy: req.user.id})
      .populate('postedBy', 'id name')
      .sort('created_at')
      .exec();
    return res.json({posts})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

const update = async (req, res) => {
  try {
    const post = await Post.findById({_id: req.body.id}).exec();
    if (!post) {
      return res.status(400).json({
        message: 'Post not found!'
      })
    }
    const newPost = await post.update(req.body);
    return res.status(201).json({post: newPost})
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

const destroy = async (req, res) => {
  try {
    await Post.findByIdAndDelete({_id: req.body.id}).exec();
    return res.status(204).json(null)
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      error: e.message
    })
  }
}

module.exports = {
  index,
  create,
  update,
  postsByUser,
  destroy
}
