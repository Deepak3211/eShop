import express from 'express';
import { registerUser, loginUser, getAccessToken, logoutUser,getUserInfo } from '../controllers/authController.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/refresh_token').get(getAccessToken);
router.route('/getUserInfo').get(auth,getUserInfo);

export default router;