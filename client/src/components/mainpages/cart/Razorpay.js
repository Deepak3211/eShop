import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../../../GlobalState";
import './cart.css';
import logo from './eShopp.png'
const Razorpay = ({total,addToCart, address1}) => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [prodName, setProdName] = useState('');
  const [userInfo, setUserInfo] = state.userAPI.userInfo;


  useEffect(() => {
  cart.forEach(product => product ? setProdName(product.title): '')
  }, [cart])
  

  useEffect(() => {

const loadScripts =  (src) => {
return new Promise((resolve, reject) => {
const script = document.createElement('script');
script.src = src;
script.onload = () => {
resolve(true);
}
script.onerror = () => reject()
document.body.appendChild(script);
});
}
const res =  loadScripts(
"https://checkout.razorpay.com/v1/checkout.js"
);
if (!res) {
alert("Razorpay sdk failed to load ")
return;
}
}, [])
const data = {
amount: total * 100,
currency:'INR'
}
  // console.log(data);
const displayRazorpay = async () => {
  const result = await axios.post('api/v1/payment/order', data, {
  headers: {Authorization: token}
  });
if (!result) {
alert("Server error")
return;
}
// console.log('result', result)
const {  id: order_id, currency } = result.data;

const options = {
key: process.env.REACT_APP_KEY,
amount: total,
currency: currency,
name: 'eShop',
description: prodName,
image: logo,
order_id: order_id,
  handler: async (response) => {
  // console.log('response',response)
    const data = {
amount: total ,
orderCreationId: order_id,
razorpayPaymentId: response.razorpay_payment_id,
razorpayOrderId: response.razorpay_order_id,
razorpaySignature: response.razorpay_signature,
cart,
address: address1




};
    const result = await axios.post('/api/v1/payment/success', data, {
  headers: {Authorization: token}
    
    })
// alert(result.data.msg)
// console.log(result.data.msg,'ress');
  setCart([])
  addToCart([])
toast.dark(result.data.msg, {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,

})
},
prefill: {
name: userInfo.name,
email: userInfo.email,
contact: address1.phone,
},
notes: {
  address: cart.forEach(product => <>{ product.title}</>)
}
,
theme: {
"color": "#75096b"
},

}
const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
return (
<div className="app">
   
  <button className='btn' onClick={displayRazorpay}disabled = {!address1.phone ||!address1.city || !address1.State || !address1.pincode || !address1.addressLine}>Pay ₹ {total === 0 ? '' : total}</button>
  
  </div>
 )
}

export default Razorpay



