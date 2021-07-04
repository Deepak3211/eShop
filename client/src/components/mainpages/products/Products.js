import { useContext, useState } from "react"
import { GlobalState } from "../../../GlobalState"
import ProductItem from '../utils/productItem/ProductItem'
import './products.css'
import Loading from '../utils/loading/Loading'
import axios from "axios"
import { toast } from "react-toastify"
import { Checkbox, Button } from "semantic-ui-react"
import Filter from "./Filter"
import LoadMore from "./LoadMore"
const Products = () => {
  const state = useContext(GlobalState)
  // console.log(state.productsAPI.products)
  const [products, setProducts] = state.productsAPI.products;
 // console.log(products);
const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
    // console.log(products)
      const deleteImage = await axios.post('/api/v1/destroy', { public_id}, {
        headers: { Authorization: token}
      })
      const deleteProduct = await  axios.delete(`/api/v1/products/${id}`, {
      headers: { Authorization: token}
      })
      // console.log('deleteProduct', deleteProduct)
      toast(deleteProduct.data.message, {
      position: "top-center",
      })
      setLoading(false);
      setCallback(!callback);
  } catch (error) {
    toast(error.response.data.message);
  }
  
  }
  
  const handleCheck = (id) => {
  // console.log(product.checked)
    products.forEach(product => {
    if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products]);
  }
  
  const checkAll = () => {
    products.forEach(product => {
      product.checked = !isCheck
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  }
  const deleteAll = () => {
    products.forEach(product => {
    if(product.checked) deleteProduct(product._id, product.images.public_id)
    })
    setIsCheck(false);
  }
  
  if(loading) return <>  <Loading /> </>
  return (
    <>
      <Filter />
      {isAdmin &&
      <div className="delete__all">
        Select All
        <Checkbox className='check__del' checked={isCheck} onChange={checkAll} />
        <Button onClick = {deleteAll} color = 'google plus'>Delete All</Button>
        
      </div>
        
      }

    <div className="product__Items">
      {products.map(product => {
        return <ProductItem key={product._id} product={product} isAdmin={isAdmin} token={token} handleCheck={handleCheck} deleteProduct={ deleteProduct}/>
        
        
      }
      
      )}
      </div>
      <LoadMore />
    {products.length === 0 && <Loading />}
      </>
  )
}

export default Products
