const express = require('express');
const  { registerUser, loginUser, getAccessToken, logoutUser,getUserInfo ,addCart,history} = require('../controllers/authController');
const  { auth, authAdmin } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/refresh_token').get(getAccessToken);
router.route('/getUserInfo').get(auth,getUserInfo);
router.route('/addcart').patch(auth, addCart);
router.route('/history').get(auth, history);

module.exports = router;
