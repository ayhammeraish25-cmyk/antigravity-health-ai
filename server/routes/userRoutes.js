import express from 'express';
const router = express.Router();
import { authUser, registerUser, getUserProfile, forgotPassword, resetPassword } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);
router.route('/profile').get(protect, getUserProfile);

export default router;
