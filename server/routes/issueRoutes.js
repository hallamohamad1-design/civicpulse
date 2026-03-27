const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public or semi-public fetching (can be restricted if needed)
router.get('/', issueController.getIssues);

// Creating an issue requires being logged in and handles file uploads
router.post('/', authMiddleware, upload.single('photo'), issueController.createIssue);

// Updating an issue requires OFFICIAL or ADMIN role
router.put('/:id', authMiddleware, requireRole(['OFFICIAL', 'ADMIN']), issueController.updateIssueStatus);

module.exports = router;
