const fs = require('fs');
const express = require('express');
const router = express.Router();





router.post('/:userID/photos',function(req,res){
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
  });

exports.router=router;