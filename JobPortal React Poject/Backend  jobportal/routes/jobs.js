const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const ApprovedJob = require("../models/ApprovedJob");


// Insert Route
router.post('/add', async (req, res) => {
    try {
        const { jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy,status, jobCategory } = req.body;

        const newJob = new Job({
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy,status, jobCategory
        });

        await newJob.save();
        res.json("Job added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add job");
    }
});



// Fetch all jobs
router.get("/", (req, res) => {
    Job.find()
        .then((jobs) => {
            res.json(jobs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching jobs");
        });
});

// Fetch total jobs count
router.get("/total", async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments();
        res.json({ total: totalJobs });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching total jobs count");
    }
});


// Update job by ID
router.put("/update/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const { email,jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, jobCategory, status, postedBy } = req.body;

        const updateJob = {
            email,jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy, status, jobCategory
        };

        await Job.findByIdAndUpdate(jobId, updateJob);
        res.status(200).send({ status: "Job updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete job by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        await Job.findByIdAndDelete(jobId);
        res.status(200).send({ status: "Job deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with deleting job", error: err.message });
    }
});

// Fetch job by ID
router.get("/get/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const fetchedJob = await Job.findById(jobId);
        res.status(200).send({ status: "Job fetched", job: fetchedJob });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with fetching job", error: err.message });
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

module.exports = router;
