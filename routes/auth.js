const express = require('express');
const bcrypt = require('bcrypt');
const Login = require('../models/login');

const router = express.Router();

// Endpoint Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Register data received:', { username, email, password });
    const newUser = new Login({ username, email, password });
    await newUser.save();
    res.status(201).redirect('/register'); // Redirect to login page after successful registration
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user: ' + error.message);
  }
});

// Endpoint Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login data received:', { username, password });
    
    // Find user by email (if you're using email as the login field)
    const user = await Login.findOne({ email: username });
    console.log('User found:', user);

    if (!user) {
      console.error('Invalid username or password');
      return res.status(400).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.error('Invalid username or password');
      return res.status(400).send('Invalid username or password');
    }

    // Set session for user login status
    req.session.userId = user._id;
    console.log('Session set for user:', req.session.userId);

    // Redirect to dashboard after successful login
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Server error: ' + error.message);
  }
});

module.exports = router;
