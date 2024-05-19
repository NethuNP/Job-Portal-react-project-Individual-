const express = require('express');
const multer = require('multer');
const mime = require('mime-types');
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

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, directory); // Use the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Insert Route
router.post('/add', upload.single('application'), async (req, res) => {
    try {
        const { companyName, jobTitle, jobLocation, postingDate, email } = req.body;
        const application = req.file ? req.file.path : null;
        const mimeType = req.file ? mime.lookup(req.file.originalname) : null;

        // Check if required fields are present
        if (!companyName || !jobTitle || !jobLocation || !postingDate || !email) {
            return res.status(400).send("All fields are required");
        }

        // Check if application file is present
        if (!application) {
            return res.status(400).send("Application file is required");
        }

        const newApplication = new Application({
            companyName,
            jobTitle,
            jobLocation,
            postingDate,
            email,
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

// GET Route to fetch applications
router.get("/", (req, res) => {
    Application.find()
        .then((applications) => {
            res.json(applications);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching applications");
        });
});

module.exports = router;
