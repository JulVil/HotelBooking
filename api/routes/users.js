import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  updateReservedRoom,
} from '../controllers/userControl.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//UPDATE USER
router.put('/:id', verifyUser, updateUser);

//UPDATE ROOMS RESERVED BY USER
router.put('/reserved/:id', updateReservedRoom);

//DELETE USER
router.delete('/:id', verifyUser, deleteUser);

//GET USER
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;
