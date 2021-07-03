import express from 'express';
import { getCategories,createCategory,deleteCategory,updateCategory } from '../controllers/categoryController.js';
import {auth, authAdmin} from '../middlewares/auth.js';
const router = express.Router();

router.route('/category')
.get(getCategories)
.post(auth, authAdmin, createCategory);

router.route('/category/:id').delete(auth, authAdmin, deleteCategory).put(auth, authAdmin,updateCategory)

export default router;