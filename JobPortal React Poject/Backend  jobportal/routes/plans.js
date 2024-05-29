const express = require('express');
const router = express.Router();
const Plan = require('../models/Plan');

// GET all plans
router.get('/', async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new plan
router.post('/', async (req, res) => {
    try {
        const { name, monthlyPrice, yearlyPrice, description, monthlyPostJobs, yearlyPostJobs, trialDays } = req.body;
        const plan = new Plan({
            name,
            monthlyPrice,
            yearlyPrice,
            description,
            monthlyPostJobs,
            yearlyPostJobs,
            trialDays
        });
        const savedPlan = await plan.save();
        res.status(201).json(savedPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create plan' });
    }
});

module.exports = router;
