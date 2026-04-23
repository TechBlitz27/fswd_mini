const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { getAllClients, getClient, createClient, updateClient, deleteClient, getMyProfile } = require('../controllers/clientController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.get('/my-profile', authorize('client'), getMyProfile);
router.get('/', authorize('admin', 'ca', 'staff'), getAllClients);
router.get('/:id', authorize('admin', 'ca', 'staff', 'client'), getClient);

router.post('/',
  authorize('admin', 'ca'),
  [
    body('name').trim().notEmpty().withMessage('Name required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('pan').trim().notEmpty().withMessage('PAN required')
  ],
  createClient
);

router.put('/:id', authorize('admin', 'ca'), updateClient);
router.delete('/:id', authorize('admin'), deleteClient);

module.exports = router;
