// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./startup/db');
// const users = require('./routes/users');
// const auth = require('./routes/auth');
// const images = require('./routes/images');
// const bodyParser = require('body-parser');
// const path = require('path');
// require('dotenv/config');
// const crypto = require('crypto')//to generate file name
// const mongoose = require('mongoose')
// const multer = require('multer')
// const {GridFsStorage} = require('multer-gridfs-storage')
// const Grid = require('gridfs-stream')
// const app = express();

// // connectDB();

// let conn = mongoose.connection
// let gfs
// conn.once('open', () => {
//     //initialize our stream
//     gfs = Grid(conn.db, mongoose.mongo)
//     gfs.collection('imageUpload')
// })

// const mongoURI = "mongodb+srv://KingDanx:Skater89!@cluster0.flj9w.mongodb.net/SocialMediaProject?retryWrites=true&w=majority"


// let storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//       return new Promise(
//           (resolve, reject) => {
//                      const fileInfo = {
//                   filename: file.originalname,
//                   bucketName: "imageUpload"
//               }
//               resolve(fileInfo)

//           }
//       )
//   }
// })

// const upload = multer({ storage })

// app.post("/upload",upload.single("upload"),(req,res)=>{
// res.json({file:req.file})
// })

// app.use(cors());
// app.use(express.json());
// // app.use('/api/users', users);
// // app.use('/api/auth', auth);
// // app.use('/api/images', images);
// // app.use(bodyParser.urlencoded({ extended: false}));
// // app.use(bodyParser.json());

// // app.set("view engine", "ejs");


// const port = process.env.PORT || 5000
// app.listen(port, () => {
//   console.log(`Server started on port: ${port}`);
// });

