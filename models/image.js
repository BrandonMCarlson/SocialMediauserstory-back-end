const Joi = require("joi");
const { Mongoose } = require("mongoose");



const ImageSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
}
);

const Image = mongoose.model('Image', ImageSchema);

const validateImage = (Image) => {
    const schema = Joi.object({
        data: Joi.String().required(),
        contentType: Joi.String().required(),
    })
}

exports.Image=Image;
exports.validateImage=validateImage;