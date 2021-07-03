const express = require('express'); 
const  { getCategories,createCategory,deleteCategory,updateCategory } = require('../controllers/categoryController');
const  { auth, authAdmin } = require('../middlewares/auth');

const router = express.Router();

router.route('/category')
.get(getCategories)
.post(auth, authAdmin, createCategory);

router.route('/category/:id').delete(auth, authAdmin, deleteCategory).put(auth, authAdmin,updateCategory)

module.exports = router;
