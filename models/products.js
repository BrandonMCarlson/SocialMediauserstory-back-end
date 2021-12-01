const mongoose = require('mongoose')
const Joi = require('joi')


const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true },
  category: { type: String, required: true, minlength: 5, maxlength: 50 },
  price: { type: Number, required: true },
  dateModified: { type: Date, default: Date.now },
})

const Product = mongoose.model('Product', productSchema)

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().required(),
    category: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
  })
  return schema.validate(product)
}

// module.exports = Product

exports.Product = Product
exports.validateProduct = validateProduct
exports.productSchema = productSchema
