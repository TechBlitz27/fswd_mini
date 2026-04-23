const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getAllEntries, getClientCompliance, createEntry, updateEntry, deleteEntry, getStats } = require('../controllers/complianceController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.get('/stats', authorize('admin', 'ca'), getStats);
router.get('/', authorize('admin', 'ca', 'staff'), getAllEntries);
router.get('/client/:clientId', authorize('admin', 'ca', 'staff', 'client'), getClientCompliance);

router.post('/',
  authorize('admin', 'ca'),
  [
    body('clientId').notEmpty().withMessage('Client ID required'),
    body('serviceType').isIn(['ITR', 'GST', 'Audit', 'TDS', 'ROC', 'Consultation']).withMessage('Invalid service type'),
    body('financialYear').matches(/^\d{4}-\d{2}$/).withMessage('Invalid financial year format')
  ],
  createEntry
);

router.put('/:id', authorize('admin', 'ca', 'staff'), updateEntry);
router.delete('/:id', authorize('admin', 'ca'), deleteEntry);

module.exports = router;
