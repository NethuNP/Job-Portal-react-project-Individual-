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
//get total 
router.get('/total', async (req, res) => {
  try {
      const totalRegisters = await register.countDocuments({});
      res.json({ total: totalRegisters });
  } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching total registered users count");
  }
});


// Route for registering a new user

router.post('/add', async (req, res) => {
  try {
    const { firstName, lastName, email, password,confirmPassword} =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmedPassword = await bcrypt.hash(confirmPassword, 10);

    let role = roles.seeker; 
    if (email === "admin@gmail.com") {
      role = roles.admin;
    }

    const newUser = new register({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword:hashedConfirmedPassword,
      role,
    });

    await newUser.save();
    await sendApprovalEmail(email);

    res.status(200).json({
      success: true,
      message: "Successfully registered",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to register. Please try again later.",
      error: error.message,
    });
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
      password: hashedPassword,
      confirmPassword:hashedConfirmedPassword
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


// Get Single User by ID
router.route("/get/:id").get(async (req, res) => {
  const id = req.params.id;

  try {
    const seeker = await register.findById(id);
    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "seeker not found",
      });
    }

    console.log("Fetched seeker:", seeker);

    res.status(200).json({
      success: true,
      message: "User found",
      data: seeker,
    });
  } catch (error) {
    console.error("Error fetching seeker:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});



// Route to login a seeker 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const seeker = await register.findOne({ email });

    if (!seeker) {
      return res.status(404).json({
        success: false,
        message: "Seeker not found",
      });
    }

    // Check if password is correct
    const checkCorrectPassword = await bcrypt.compare(password, seeker.password);

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: seeker._id,
        role: seeker.role, // Assuming role is stored in the user document
      },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    // Set token in the browser cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true, // Enable for HTTPS
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    res.status(200).json({
      token: token,
      success: true,
      message: "Successfully logged in",
      data: { seeker: { ...seeker._doc, password: undefined }, role: seeker.role }, // Exclude password from response
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",
      error: error.message,
    });
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
