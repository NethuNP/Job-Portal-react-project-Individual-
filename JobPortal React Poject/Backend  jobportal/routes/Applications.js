const express = require('express');
const multer = require('multer');
const Application = require('../models/Application');
const router = express.Router();
const fs = require('fs');

const directory = './uploads';

// Ensure the uploads directory exists synchronously
try {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
        console.log('Directory created successfully.');
    } else {
        console.log('Directory already exists.');
    }
} catch (err) {
    console.error('Error creating directory:', err);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Set upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage });

// Route to handle file upload
router.post('/add', upload.single('application'), async (req, res) => {
    try {
        const { companyName, jobTitle, jobLocation, postingDate, email, mimeType } = req.body;
        const application = req.file ? req.file.path : null;

        // Check if required fields are present
        if (!companyName || !jobTitle || !jobLocation || !postingDate || !email || !application) {
            return res.status(400).send("All fields are required");
        }

        // Save file data to database
        const newApplication = new Application({
            companyName,
            jobTitle,
            jobLocation,
            postingDate,
            email,
            status,
            application,
            mimeType
        });

        await newApplication.save();
        res.json("Application added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to add application");
    }
});

// Route to fetch all applications
router.get("/", async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching applications");
    }
});

// Route to download an application file
router.get("/download/:id", async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).send("Application not found");
        }
        const filePath = application.application;
        if (!filePath) {
            return res.status(404).send("Application file not found");
        }
        res.download(filePath);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error downloading application file");
    }
});

// Route to delete an application by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;
        const deletedApplication = await Application.findByIdAndDelete(applicationId);
        if (!deletedApplication) {
            return res.status(404).send("Application not found");
        }
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting application");
    }
});

module.exports = router;
