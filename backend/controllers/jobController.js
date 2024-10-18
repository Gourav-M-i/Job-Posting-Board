const Job = require('../models/Job');
const Company = require('../models/Company');

// Post a Job
exports.postJob = async (req, res) => {
    const { title, description, experienceLevel, candidates, endDate } = req.body;
    try {
        const job = new Job({
            title,
            description,
            experienceLevel,
            candidates,
            endDate,
            company: req.company.companyId
        });

        await job.save();

        const company = await Company.findById(req.company.companyId);
        company.jobs.push(job._id);
        await company.save();

        res.status(201).json({ message: 'Job posted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
