import { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import { Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './productItem.css';
const BtnRender = ({ product, deleteProduct}) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  return (
   <div className = "product__btn">
    {isAdmin ? <>
    
     <Card.Content extra className = 'extra'>
      <Link to = { `/update_product/${product._id}`} className = 'card__basket'>
        <Icon name='lightning' />
        Edit
      </Link>
          <Link to= '#!' className = 'card__view' onClick={()=> deleteProduct(product._id, product.images.public_id)}>
        <Icon name='eye'  />
        Delete
      </Link>
    </Card.Content>
    
    </>
     
     : <>
     
     
       <Card.Content extra className = 'extra'>
      <Link to = '#~' className = 'card__basket' onClick = {()=> addCart(product)}>
        <Icon name='lightning' />
        Buy
      </Link>
          <Link to={ `/detail/${product._id}`} className = 'card__view'>
        <Icon name='eye' />
        View
      </Link>
    </Card.Content>
     </>}
    </div>
  )
}

export default BtnRender
