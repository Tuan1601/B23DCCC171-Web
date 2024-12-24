const express = require('express');
const documentController = require('../controllers/documentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/upload', authMiddleware,upload.single('file'), documentController.uploadDocument);
router.get('/', documentController.getAllDocuments);
router.get('/:subject_id', documentController.getDocumentsBySubject);
router.get('/download/:id', authMiddleware, documentController.downloadDocument);

module.exports = router;
