import { Router } from 'express';
import {
  createUser, getUserById, getUsers, updateAvatar, updateProfile,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
