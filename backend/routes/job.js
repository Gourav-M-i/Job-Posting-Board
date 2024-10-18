const express = require('express');
const { postJob } = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/post', auth, postJob);

module.exports = router;
