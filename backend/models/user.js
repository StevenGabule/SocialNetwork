const mongoose = require('mongoose')
const {Schema} = mongoose;
const {v4: uuidv4} = require('uuid')
const crypto = require('crypto')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.salt
      delete ret.hashed_password
      return ret
    }
  }
})

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password
  })

// encrypt password
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return ""
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (e) {
      console.log(e.message)
      return ""
    }
  }
}


module.exports = mongoose.model('Users', userSchema)
