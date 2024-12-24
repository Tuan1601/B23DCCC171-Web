const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/stats', authMiddleware, roleMiddleware(['admin']), getStats);

module.exports = router;
