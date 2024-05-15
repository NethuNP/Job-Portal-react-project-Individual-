const express = require("express");
const router = express.Router();
const ApprovedJob = require("../models/ApprovedJob");

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

module.exports = router;
