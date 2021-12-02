const mongoose = require('mongoose')
const Joi = require('joi')


const postSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 255 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 255 },
  body: { type: String, required: true, minlength: 2, maxLength: 255 },
  picture: { $type: binData, required: false },
  dateModified: { type: Date, default: Date.now },
})

const Post = mongoose.model('Post', postSchema)

const validatePost = (post) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    body: Joi.string().min(2).max(255).required(),
  })
  return schema.validate(post)
}

// module.exports = Product

exports.Post = Post
exports.validatePost = validatePost
exports.postSchema = postSchema