import { Checkbox, Image,Divider } from 'semantic-ui-react';
import './productItem.css'
import BtnRender from './BtnRender';

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  
   
  return (
<div className="product__container">
      <div className="product__checkbox">
      {isAdmin && 

        <Checkbox   checked={product.checked} onChange={() => handleCheck(product._id)} /> }
      
      </div>
      
      <Image className='card__image' src={product.images.url} ></Image>
      <div className="container__information">
      <Divider  hidden/>
        <h2>{product.title}</h2>
      <Divider  />
        
        <h3>₹ {product.price}</h3>
      <Divider  />
        
        <p>{ product.description }</p>
      </div>
      <BtnRender product={product} deleteProduct={ deleteProduct}/>
      </div>
 
      
  )
}

export default ProductItem
