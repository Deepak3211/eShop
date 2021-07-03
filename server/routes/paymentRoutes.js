const express = require('express');
const { createOrder, orderSuccess, getPayments } = require('../controllers/paymentController');
const { auth, authAdmin } = require('../middlewares/auth');

const router = express.Router();
router.route('/payments').get(auth, authAdmin,getPayments)
router.route('/payment/order').post(auth,createOrder)
router.route('/payment/success').post(auth,orderSuccess);

module.exports = router;
