import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Card, Icon, Image, Divider } from 'semantic-ui-react';
import './detailProduct.css';
import ProductItem from "../utils/productItem/ProductItem";
const DetailProduct = () => {

const params = useParams();
// console.log('params', params);
const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
// console.log(products)
const [detailProduct, setDetailProduct] = useState([]);
// console.log('detailProduct',detailProduct);

useEffect(() => {
if (params.id) {
products.forEach(product => {
if (product._id === params.id)setDetailProduct(product);

})
}
}, [params.id, products]);
if (detailProduct.length === 0) return null;



  return (
    <>
    <div className="product__details">
      <div className="product__detailsLeft">

      <Image className='detailCard__image' src={detailProduct.images.url} />
          <p>{detailProduct.title}</p>
      </div>
      <div className="product__detailsRight">
       <Card className = 'detail__card' >
          <Card.Content className='detail__cardContent'>
            <Card.Content className='detail__cardHeader'>

            <Card.Header >{detailProduct.title} </Card.Header>
            <Card.Content className = 'detail__pid'> #id : {detailProduct.product_id} </Card.Content>
            </Card.Content>
          <Divider />
          <Card.Content className = 'detail__price'> <strong>
            ₹ {detailProduct.price} </strong> </Card.Content>
          <Divider />
          
      <Card.Description className = 'detail__description'>
        { detailProduct.description }
            </Card.Description>
          <Divider />

            <Card.Content className = 'detail__sold'>
              Sold : {detailProduct.sold}

            </Card.Content>
            
          </Card.Content>

      <Link to = '/cart' className = 'cart__link' onClick={()=> addCart(detailProduct)} >
        <Icon name='lightning' />
        Buy Now
      </Link>
          
    </Card>
      </div>
    
          
      </div>
      <div className = 'related__productsDetails'>
        <h2>Similar Products</h2>
        <div className="related__products">

      
          {products.map(product => {
            // console.log('product',product)
            if (product._id!==detailProduct._id) {
             
              return product.category === detailProduct.category ? <ProductItem className ='x'  key={ product._id} product={ product } /> : null
            }
            })}
        </div>
      </div>
</>
  )
}

export default DetailProduct
