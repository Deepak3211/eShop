import { useContext, useEffect, useState } from "react"
import { GlobalState } from "../../../GlobalState"
import './cart.css';
import {  Icon, Button, Image } from 'semantic-ui-react';

import Razorpay from "./Razorpay";
import axios from "axios";
import Address from "./Address";
const Cart = () => {
 const state = useContext(GlobalState);
 const [cart, setCart] = state.userAPI.cart;
 const [token] = state.token;
 const [total, setTotal] = useState(0);
 console.log(state)
   const [address1, setAddress1] = useState({
  
    phone: '',
    pincode: '',
    addressLine: '',
    city: '',
    State: '',
  })
  console.log(address1)

 const handleChange = (e) => {
    setAddress1({...address1,[e.target.name]: e.target.value})
  } 
  
  
 useEffect(() => {
  const getTotal = ()=> {
  
   const total = cart.reduce((prev, item) => {
   
    return prev + (item.price * item.quantity)
   }

    , 0)
   setTotal(total);

  }
  getTotal();
 
 
 },[cart])
 
  const addToCart = async (cart) => {
  
    await axios.patch('/api/v1/addcart', { cart }, {
      headers: {Authorization: token}
    
    })
  }
 const increment = (id) => {
 
  cart.forEach(item => {
  
   if (item._id === id) {
   item.quantity +=1 }

  })
   setCart([...cart])
   addToCart(cart)
 }
 
 const decrement = (id) => {
  cart.forEach(item => {
  
   if (item._id === id) {
   item.quantity === 1 ? item.quantity = 1: item.quantity -= 1
   }
  })
  setCart([...cart])
   addToCart(cart)
  
 }
 
 const removeProduct = (id) => {
  if (window.confirm('Do you want to remove this product from the cart ?')) {
   cart.forEach((item, index) => {
    if (item._id === id) {
    cart.splice(index,1)
    }
   
   })
    setCart([...cart])
   addToCart(cart)
    
  }
 }
 
 
 
 
 if (cart.length === 0) return <h2 className="cart__empty">Cart Empty</h2>
 

 
 
 return (
   <div className="cart">
   {cart.map(product => (
   
    <div className="detail__cart" key = {product._id}>
    
     <Image className = "img"src={product.images.url} />
     <div className="box__details">
      <h2>{product.title}</h2>
      <h3> ₹ {product.price * product.quantity }</h3>
      <p>{product.description}</p>
      
      <div className="amount">
      <Button onClick={()=> decrement(product._id)}> - </Button>

       <span className = 'quantity'>{ product.quantity} </span>

      <Button onClick={()=> increment(product._id)}>+ </Button>
       
      </div>
     
     </div>
     <div className="delete">
     <Icon  onClick={()=>removeProduct(product._id)} size="large" name='delete' />
    </div>
     </div>

   
)
   )}
   <div className="total">
       <h3>Total: ₹ {total}</h3>
     <Address address1 = {address1} setAddress1 = {address1} handleChange = {handleChange}/>
       
    <Razorpay total={total} addToCart = {addToCart} address1 = {address1}/>
   </div>
  </div>
    
  )
}

export default Cart
