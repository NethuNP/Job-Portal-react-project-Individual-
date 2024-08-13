const express = require("express");
const router = express.Router();
const ApprovedJob = require("../models/ApprovedJob");
const Job = require("../models/job");
const nodemailer = require('nodemailer');
require('dotenv').config();

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

// Delete approved job by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        await ApprovedJob.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Approved job deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting approved job" });
    }
});

// Approve a job by ID
router.put("/approve/:id", async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).send('Job not found');
        
        const approvedJob = new ApprovedJob(job.toObject());
        await approvedJob.save();
        await Job.findByIdAndDelete(req.params.id);
        
        res.send('Job approved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// Fetch approved job by ID
router.get("/get/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await ApprovedJob.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ job });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching job details" });
    }
});

module.exports = router;


// Function to send approval email
async function sendApprovalEmail(postedBy) {
    try {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // environment variable for email
                pass: process.env.EMAIL_PASS  // environment variable for password
            }
        });

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: postedBy,
            subject: 'Approval Email',
            text: `Your Posted Job has been approved ✅! 
                   Your email: ${postedBy} 
                   Hurry Up...🥳🥳🥳 Log in to your account and access the world of jobs with us...
                   Thanks-JOBNEST Team`
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending approval email:', error);
    }
}

module.exports = router;
