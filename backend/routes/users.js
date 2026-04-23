const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser, getDashboardStats } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect);

router.get('/stats', authorize('admin'), getDashboardStats);
router.get('/', authorize('admin', 'ca'), getAllUsers);
router.get('/:id', authorize('admin', 'ca'), getUser);
router.put('/:id', authorize('admin'), updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
