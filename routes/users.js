const { User, Post, validateUser, validateLogin, validatePost } = require('../models/user')
const { Product, validateProduct } = require('../models/products')
const express = require('express')
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const router = express.Router()
const admin = require('../middleware/admin'); 
// add

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});
// put/update

router.put('/:userId', auth, async (req, res) => {
    try {
      const { error } = validateUser(req.body)
      if (error) return res.status(400).send(error)
  
      const user = await User.findById(req.params.userId)
      if (!user) return res.status(400).send(
        `The user with id: "${req.params.userId}" does not exist.`
        )
  
      user.firstName = req.body.name
      user.lastName = req.body.description
      user.aboutMe = req.body.category
      user.email = req.body.price
      user.password = req.body.password
      user.friendList = req.body.friendList
      user.pendingRequest = req.body.pendingRequest
      user.post = req.body.post
      user.isAdmin = req.body.isAdmin
  
      await user.save()
      return res.send(user)
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

// delete

router.delete("/:userId", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// add user

router.post('/', async (req, res) => {
  try{
    const { error } = validateUser(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne ({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(10);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      aboutMe: "",
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt)
    });

    await user.save();

    const token = user.generateAuthToken();

       return res
       .header('x-auth-token', token)
       .header('access-control-expose-headers', 'x-auth-token')
       .send({ _id: user._id, firstName: user.firstName, email: user.email });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
})

router.post('/:userId/posts', [auth], async (req, res) => {
  try {
    const { error } = validatePost(req.body)
    if (error) return res.status(400).send(error)

    const user = await User.findById(req.params.userId)
    if (!user) return res.status(400).send(
      `The user with id: "${req.params.userId}" does not exist.`
    )
    
    const post = new Post({
      body: req.body.body,
      picture: req.body.picture,
    })
    user.posts.push(post)
    await user.save()

    return res.send(post)
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`)
  }
})

module.exports = router
