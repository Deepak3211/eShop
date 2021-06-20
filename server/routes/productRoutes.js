import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import {auth, authAdmin} from '../middlewares/auth.js';

const router = express.Router();

router.route('/products')
  .get(getProducts)
  .post(auth, authAdmin, createProduct)

router.route('/products/:id')
  .delete(auth, authAdmin,deleteProduct)
  .put(auth, authAdmin,updateProduct)
export default router;