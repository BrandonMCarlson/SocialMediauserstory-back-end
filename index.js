const express = require('express');
const cors = require('cors');
const connectDB = require('./startup/db');
const users = require('./routes/users');
const products = require('./routes/products');
const auth = require('./routes/auth');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/products', products);

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

 