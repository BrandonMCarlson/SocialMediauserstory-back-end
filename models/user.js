const mongoose = require('mongoose');
const { productSchema } = require('../models/products');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxLength: 50},
  lastName: { type: String, required: true, minlength: 2, maxLength: 50},
  aboutMe: { type: String, required: false, minlength: 0, maxlength: 255, default: ""},
  email: { type: String, unique: true, required: true, minLength: 5, maxLength: 255 },
  password: {type: String, required: true, maxLength: 1024, minLength: 5 },
  friendsList: { type: [/*profileScema*/], default: [] },
  pendingRequest: { type: [], required: false, default: []},
  post: { type: [], required: false, default: [] },
  isAdmin: { type: Boolean, default: false },
})

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, firstName: this.firstName, email: this.email, isAdmin: this.isAdmin }, config.get('jwtSecret'));
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

exports.User = User
exports.validateUser = validateUser
