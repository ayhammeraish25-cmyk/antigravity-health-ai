import express from 'express';
const router = express.Router();
import { searchUsers, followUser, unfollowUser, getNetwork } from '../controllers/socialController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/search').get(protect, searchUsers);
router.route('/follow/:id').post(protect, followUser);
router.route('/unfollow/:id').post(protect, unfollowUser);
router.route('/network').get(protect, getNetwork);

export default router;
