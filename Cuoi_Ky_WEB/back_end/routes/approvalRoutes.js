const express = require('express');
const approvalController = require('../controllers/approvalController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware')
const router = express.Router();

router.post('/approve', authMiddleware, roleMiddleware('admin'), approvalController.approveDocument);
router.get('/unapproved', authMiddleware, roleMiddleware('admin'), approvalController.getUnapprovedDocuments);

module.exports = router;
