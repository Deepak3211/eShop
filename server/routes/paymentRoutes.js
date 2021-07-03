import express from 'express';
import { createOrder, orderSuccess,getPayments } from '../controllers/paymentController.js';
import {auth, authAdmin} from '../middlewares/auth.js';

const router = express.Router();
router.route('/payments').get(auth, authAdmin,getPayments)
router.route('/payment/order').post(auth,createOrder)
router.route('/payment/success').post(auth,orderSuccess);

export default router;