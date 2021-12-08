const express = require('express');
const cors = require('cors');
const connectDB = require('./startup/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs');
const path = require('path');
require('dotenv/config');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
        console.log(err);
    });
  }
  if (res.headerSent) {
    return (next(error))
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!"});
});


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

