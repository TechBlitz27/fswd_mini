const express = require('express');
const router = express.Router();
const { getAllDueDates, createDueDate, updateDueDate, deleteDueDate } = require('../controllers/dueDateController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// Public route — no auth required
router.get('/', getAllDueDates);

// Protected admin-only routes
router.post('/', protect, authorize('admin'), createDueDate);
router.put('/:id', protect, authorize('admin'), updateDueDate);
router.delete('/:id', protect, authorize('admin'), deleteDueDate);

module.exports = router;
