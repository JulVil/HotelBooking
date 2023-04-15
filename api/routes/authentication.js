import express from 'express';
import { register, login, adminLogin } from '../controllers/authControl.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/adminLogin', adminLogin);

export default router;
