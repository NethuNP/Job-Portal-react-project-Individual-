const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');
const bcrypt = require('bcrypt');

// Register a new employer
router.post('/register', async (req, res) => {
  try {
    const { email, password, companyName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new Employer({ email, password: hashedPassword, companyName });
    await newEmployer.save();
    res.status(201).json({ message: 'Employer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering employer', error });
  }
});

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const employer = await Employer.findOne({ email });
      if (!employer) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, employer.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.status(200).json({ status: true, role: employer.role });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });

module.exports = router;
