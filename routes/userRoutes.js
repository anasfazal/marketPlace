import express from 'express';
import {
  createUser,
  createManyUsers,
  fetchAllUsers,
  fetchUserById,
  modifyUser,
  removeUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/bulk', createManyUsers);
router.get('/', fetchAllUsers);
router.get('/:id', fetchUserById);
router.put('/:id', modifyUser);
router.delete('/:id', removeUser);

export default router;
