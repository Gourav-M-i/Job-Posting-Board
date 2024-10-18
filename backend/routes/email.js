const express = require('express');
const { sendJobAlerts } = require('../controllers/emailController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', auth, sendJobAlerts);

module.exports = router;
