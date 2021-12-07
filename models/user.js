const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const storage = require('../middleware/image');
const upload = require('../middleware/image')

const imageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	img:
	{
		data: Buffer,
		contentType: String
	}
});

const postSchema = new mongoose.Schema({
  body: { type: String, required: true, minlength: 2, maxLength: 255 },
  likes: { type: Number, default: 0 },
  disLikes: { type: Number, default: 0 },
  picture: { data: Buffer, contentType: String},
  dateModified: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema)

const validatePost = (post) => {
  const schema = Joi.object({
    body: Joi.string().min(2).max(255).required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
  })
  return schema.validate(post)
}

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxLength: 50},
  lastName: { type: String, required: true, minlength: 2, maxLength: 50},
  aboutMe: { type: String, required: false, minlength: 0, maxlength: 255, default: ""},
  email: { type: String, unique: true, required: true, minLength: 5, maxLength: 255 },
  password: {type: String, required: true, maxLength: 1024, minLength: 5 },
  friendsList: [{type: mongoose.Types.ObjectId}],
  pendingRequest: [{type: mongoose.Types.ObjectId}],
  posts: [{ type: postSchema }],
  isAdmin: { type: Boolean, default: false },
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ 
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    aboutMe: this.aboutMe,
    email: this.email,
    password: this.password,
    isAdmin: this.isAdmin
     }, config.get('jwtSecret'));
 };
 

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    aboutMe: Joi.string().min(0).max(255),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};



// module.exports = Product

exports.Post = Post
exports.validatePost = validatePost
exports.postSchema = postSchema
exports.User = User
exports.validateUser = validateUser
exports.validateLogin = validateLogin;
exports.imageSchema = imageSchema