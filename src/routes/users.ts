import { Router } from 'express';
import {
  getCurrentUser,
  getUserById, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';
import { validGetUserById, validUpdateAvatar, validUpdateProfile } from '../middlewares/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validGetUserById, getUserById);
router.patch('/me', validUpdateProfile, updateProfile);
router.patch('/me/avatar', validUpdateAvatar, updateAvatar);

export default router;
