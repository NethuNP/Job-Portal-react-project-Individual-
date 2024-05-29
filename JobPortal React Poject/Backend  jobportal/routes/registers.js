const express = require('express');
const router = express.Router();
const register = require('../models/register');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { roles } = require('../utils/constants');

// Middleware for authenticating role
const authenticateRole = (role) => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    const userRole = decoded.role;
    if (userRole !== role) {
      return res.status(403).send('Forbidden: Insufficient role');
    }

    next();
  });
};

// Route for registering a new user
router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!(firstName && lastName && email && password && confirmPassword)) {
      return res.status(400).send('All fields are compulsory');
    }

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    const existingUser = await register.findOne({ email });
    if (existingUser) {
      return res.status(401).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await register.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id, email, role: roles.user }, // Assuming new users get 'user' role by default
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    user.token = token;
    user.password = undefined;

    await sendApprovalEmail(email);

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

// Route to update a user
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    await register.findByIdAndUpdate(id, updatedUser);
    res.status(200).send({ status: "User updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating user", error: err.message });
  }
});

// Route to delete a user
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await register.findByIdAndDelete(id);
    res.status(200).send({ status: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting user", error: err.message });
  }
});

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await register.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching users');
  }
});

// Route to fetch a user by ID
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await register.findById(id);
    res.status(200).send({ status: "User fetched", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with fetching user", error: err.message });
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Find the user by email
    const user = await register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User is not registered' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Set token in a cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    // Prepare user data for response (without the password)
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    // Send the token and user data in the response
    res.status(200).cookie('token', token, options).json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Function to send approval email
async function sendApprovalEmail(email) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'jobnestlanka@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: 'jobnestlanka@gmail.com',
      to: email,
      subject: 'Approval Email',
      text: `Your JOBNEST account has been approved ✅! 
            Your email: ${email} 
            Hurry up...🥳🥳🥳 Log in to your account and access the world of jobs with us... Thanks - JOBNEST Team`
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending approval email:', error);
  }
}

module.exports = router;
