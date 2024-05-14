const router = require("express").Router();
let job = require("../models/job");

// Insert Route
router.post('/add', async (req, res) => {
    try {
        // Extract job data from request body
        const { jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory } = req.body;

        // Create a new job instance
        const newJob = new job({
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        });

        // Save the new job to the database
        await newJob.save();

        // Send success response
        res.json("Job added successfully");
    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).send("Failed to add job");
    }
});

// Fetch all jobs
router.route("/").get((req, res) => {
    job.find()
        .then((jobs) => {
            res.json(jobs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching jobs");
        });
});

// Update job by ID
router.route("/update/:id").put(async (req, res) => {
    try {
        const jobId = req.params.id;
        const { jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, jobCategory, postedBy } = req.body;

        const updateJob = {
            jobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, expireryDate, experienceLevel, requiredSkill, companyLogo, employmentType, description, postedBy, jobCategory
        };

        const updated = await job.findByIdAndUpdate(jobId, updateJob);
        res.status(200).send({ status: "Job updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

// Delete job by ID
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const jobId = req.params.id;
        await job.findByIdAndDelete(jobId);
        res.status(200).send({ status: "Job deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with deleting job", error: err.message });
    }
});

// Fetch job by ID
router.route("/get/:id").get(async (req, res) => {
    try {
        const jobId = req.params.id;
        const fetchedJob = await job.findById(jobId);
        res.status(200).send({ status: "Job fetched", job: fetchedJob });
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "Error with fetching job", error: err.message });
    }
});

// Approve job by ID
router.put('/approve/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = await job.findByIdAndUpdate(jobId, { $set: { approved: true } }, { new: true });

        if (!updatedJob) {
            return res.status(404).send({ message: "Job not found" });
        }

        res.status(200).send({ message: "Job approved successfully", job: updatedJob });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to approve job", error: err.message });
    }
});




module.exports = router;
