const fs = require('fs');
const express = require('express');
const router = express.Router();
const image = ('../middleware/image');





// router.post('/', image, async(req,res) => {
//     const newItem = new Item();
//     newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//     newItem.img.contentType = 'image/png';


//     await newItem.save();

//     return res.send(newImage)
// });



// exports.router=router;