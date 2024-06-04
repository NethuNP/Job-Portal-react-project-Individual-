const express = require('express');
const multer = require('multer');
const Application = require('../models/Application');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Set upload directory
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
        const application = req.file ? req.file.filename : null; // Store only filename
        const status = 'Pending'; // Default status

        if (!companyName || !jobTitle || !jobLocation || !postingDate || !email || !application) {
            throw new Error("All fields are required");
        }

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
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error(err);
        res.status(500).send("Failed to add application");
    }
});

// Route to download an application file
router.get("/download/:filename", async (req, res) => {
    try {
        const fileName = req.params.filename;
        const filePath = path.join(uploadDir, fileName);

        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error(err);
                return res.status(404).send("Application file not found");
            }

            res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
            res.setHeader("Content-Type", 'application/pdf');

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error downloading application file");
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

// Route to fetch applications by email
router.get('/applications', async (req, res) => {
    const email = req.query.email;
    if (!email) {
        return res.status(400).send("Email query parameter is required");
    }

    try {
        const applications = await Application.find({ email });
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


// Route to decline an application by ID
router.put('/decline/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status: 'Declined' }, { new: true });
        if (!updatedApplication) {
            return res.status(404).send("Application not found");
        }
        res.json({ message: "Application declined successfully", application: updatedApplication });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error declining application");
    }
});

// Route to get total number of declined applications
router.get('/declined/total', async (req, res) => {
    try {
        const totalDeclinedApplications = await Application.countDocuments({ status: 'Declined' });
        res.json({ total: totalDeclinedApplications });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching total declined applications count");
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
        fs.unlinkSync(path.join(uploadDir, deletedApplication.application)); // Delete the file from the filesystem
        res.json({ message: "Application deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting application");
    }
});

// Route to approve an application by ID
router.put('/approve/:id', async (req, res) => {
    try {
        const applicationId = req.params.id;
        const updatedApplication = await Application.findByIdAndUpdate(applicationId, { status: 'Approved' }, { new: true });
        if (!updatedApplication) {
            return res.status(404).send("Application not found");
        }
        res.json({ message: "Application approved successfully", application: updatedApplication });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error approving application");
    }
});
// Route to get total number of pending applications
router.get('/pending/total', async (req, res) => {
    try {
        const totalPendingApplications = await Application.countDocuments({ status: 'Pending' });
        res.json({ total: totalPendingApplications });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching total pending applications count");
    }
});


// Route to get total number of applications
router.get('/total', async (req, res) => {
    try {
        const totalApplications = await Application.countDocuments({});
        res.json({ total: totalApplications });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching total applications count");
    }
});



module.exports = router;
