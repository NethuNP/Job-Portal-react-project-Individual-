const express = require("express");
const router = express.Router();
const ApprovedJob = require("../models/ApprovedJob");
const nodemailer=require('nodemailer');

require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Insert Route for Approved Jobs
router.post('/add', async (req, res) => {
    try {
        const {
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel,
            requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        } = req.body;

        const newApprovedJob = new ApprovedJob({
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel,
            requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        });

        await newApprovedJob.save();
        await sendApprovalEmail(postedBy);
        res.status(201).json({ message: "Approved job added successfully" });
    } catch (err) {

        
        console.error(err);
        res.status(500).json({ error: "Failed to add approved job" });
    }
});

// Fetch all approved jobs
router.get("/", async (req, res) => {
    try {
        const approvedJobs = await ApprovedJob.find();
        res.status(200).json(approvedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching approved jobs" });
    }
});

// Fetch total approved jobs count
router.get("/total", async (req, res) => {
    try {
        const totalApprovedJobs = await ApprovedJob.countDocuments();
        res.json({ total: totalApprovedJobs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching total approved jobs count");
    }
});

// Update approved job by ID
router.put("/update/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel,
            requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        } = req.body;

        const updateApprovedJob = {
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel,
            requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        };

        await ApprovedJob.findByIdAndUpdate(jobId, updateApprovedJob);
        res.status(200).json({ message: "Approved job updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with updating approved job", details: err.message });
    }
});

// Delete approved job by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        await ApprovedJob.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Approved job deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with deleting approved job", details: err.message });
    }
});

// Fetch approved job by ID
router.get("/get/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const fetchedApprovedJob = await ApprovedJob.findById(jobId);
        if (!fetchedApprovedJob) {
            return res.status(404).json({ error: "Approved job not found" });
        }
        res.status(200).json({ message: "Approved job fetched", job: fetchedApprovedJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error with fetching approved job", details: err.message });
    }
});

// Function to send approval email
async function sendApprovalEmail(postedBy) {
    try {
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // false for other ports
        auth: {
          user: 'jobnestlanka@gmail.com', // your email
          pass: 'setk uqql cczt jvee ' // your password
        }
      });
  
      // send mail with defined transport object and capture the result
      let info = await transporter.sendMail({
        from: 'jobnestlanka@gmail.com', // sender address
        to: postedBy, // list of receivers
        subject: 'Approval Email', // Subject line
        text: `Your Posted Job has been approved ✅! . 
              your email : ${postedBy} 
              Hurry Up...🥳🥳🥳 Log in to your account and access the world of jobs with us...Thanks-JOBNEST Team`
      });
  
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending approval email:', error);
      }
    }


module.exports = router;
