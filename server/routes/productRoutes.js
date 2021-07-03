const  express = require('express'); 
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { auth, authAdmin } = require('../middlewares/auth');

const router = express.Router();

router.route('/products')
  .get(getProducts)
  .post(auth, authAdmin, createProduct)

router.route('/products/:id')
  .delete(auth, authAdmin,deleteProduct)
  .put(auth, authAdmin,updateProduct)


module.exports = router;
