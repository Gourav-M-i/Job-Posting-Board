const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Company
exports.register = async (req, res) => {
    try {
        const { name, companyName, email, employeeSize, phone, password } = req.body;
        const existingCompany = await Company.findOne({ email });
        if (existingCompany) return res.status(400).json({ message: 'Company already exists' });

        const company = new Company({ name, email, phone, password, companyName, employeeSize });
        await company.save();

        delete company.password;
        // Send email or SMS for verification (implementation is up to you)

        res.status(201).json({ company: company, message: 'Company registered. Please verify your email or phone' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Login Company
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const company = await Company.findOne({ email });
        if (!company) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // if (!company.verified) return res.status(403).json({ message: 'Account is not verified' });

        const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};
