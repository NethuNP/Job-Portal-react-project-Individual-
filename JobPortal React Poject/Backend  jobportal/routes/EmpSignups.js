const express = require('express');
const router = express.Router();
const EmpSignup = require('../models/EmpSignup'); // Correct the model name
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
    const { companyName, businessOwner, email, contactno, address, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    let role = roles.employer; 
    if (email === "admin@gmail.com") {
      role = roles.admin;
    } 

    const newEmp = new EmpSignup({
      companyName,
      businessOwner,
      email,
      contactno,
      address,
      password: hashedPassword,
      role,
    });

    await newEmp.save();
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
  const { companyName, businessOwner, email, contactno, address, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = {
      companyName,
      businessOwner,
      email,
      contactno,
      address,
      password: hashedPassword,
    };

    await EmpSignup.findByIdAndUpdate(id, updatedUser);
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
    await EmpSignup.findByIdAndDelete(id);
    res.status(200).send({ status: "User deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting user", error: err.message });
  }
});

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await EmpSignup.find();
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
    const employer = await EmpSignup.findById(id);
    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }

    console.log("Fetched employer:", employer);

    res.status(200).json({
      success: true,
      message: "User found",
      data: employer,
    });
  } catch (error) {
    console.error("Error fetching employer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
});


// Route to get the total count of EmpSignup documents
router.get('/total', async (req, res) => {
  try {
    const total = await EmpSignup.countDocuments();
    res.status(200).json({ total });
  } catch (error) {
    console.error('Error fetching total count of EmpSignup:', error);
    res.status(500).json({ error: 'Failed to fetch total count of EmpSignup' });
  }
});


// Route to login a employer 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find employer by email
    const employer = await EmpSignup.findOne({ email });

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found",
      });
    }
    // Check if password is correct
    const checkCorrectPassword = await bcrypt.compare(password, employer.password);

    if (!checkCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: employer._id,
        role: employer.role, // Assuming role is stored in the user document
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
      data: { employer: { ...employer._doc, password: undefined }, role: employer.role }, // Exclude password from response
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
