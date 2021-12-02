// const Joi = require("joi");
// const mongoose = require("mongoose");



// const ImageSchema = new mongoose.Schema({
//     img: {
//         data: Buffer,
//         contentType: String
//     }
// }
// );

// const Image = mongoose.model('Image', ImageSchema);

// const validateImage = (image) => {
//     const schema = Joi.object({
//         data: Joi.string().required(),
//         contentType: Joi.string().required(),
//     })
//     return schema.validate(image)
// }

// exports.Image=Image;
// exports.validateImage=validateImage;