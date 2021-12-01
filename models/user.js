const mongoose = require('mongoose');
const { productSchema } = require('../models/products');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxLength: 50},
  lastName: { type: String, required: true, minlength: 2, maxLength: 50},
  aboutMe: { type: String, required: false, minlength: 5, maxlength: 1024, default: ""},
  email: { type: String, unique: true, required: true, minLength: 5, maxLength: 255 },
  password: {type: String, required: true, maxLength: 1024, minLength: 5 },
  friendsList: { type: [/*profileScema*/], default: [] },
  pendingRequest: { type: [], default: []},
  post: { type: [], default [] },
  isAdmin: { type: Boolean, default: false },
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name, isAdmin: this.isAdmin }, config.get('jwtSecret'));
 };
 

const User = mongoose.model('User', userSchema)

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  })
  return schema.validateUser(user)
}

exports.User = User
exports.validate = validateUser
