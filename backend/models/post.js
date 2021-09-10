const mongoose = require('mongoose')
const {Schema} = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

module.exports = mongoose.model('Posts', postSchema)
