const express = require('express');
const router = express.Router();
const { getAllDocuments } = require('../controllers/adminDocumentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/documents', authMiddleware, roleMiddleware(['admin']), getAllDocuments);

module.exports = router;
