const express = require('express');
const cors = require('cors');
const connectDB = require('./startup/db');
const users = require('./routes/users');
const auth = require('./routes/auth');
// const images = require('./routes/images');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
// app.use('./api/images', images);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

 