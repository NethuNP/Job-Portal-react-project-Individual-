// models/Employer.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  role: { type: String, default: 'employer' },
  // Add other fields as necessary
});

module.exports = mongoose.model('Employer', employerSchema);
