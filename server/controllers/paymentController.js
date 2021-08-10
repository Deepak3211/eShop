import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User.js';
import Product from "../models/Product.js";
import Payment from "../models/Payment.js";

// @Get all Payments => /api/v1/payments

export const getPayments = async (req, res) => {

  try {
    const payments = await Payment.find();
    res.status(200).json(payments)
    
  } catch (error) {
    return res.status(500).json({message: error.message});
    
  }

}



export const createOrder = async (req, res) => {
  try {
   
  const { amount, currency } = req.body;
  const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
  });
  const options = {
   amount: amount,
   currency: currency,
   receipt: 'receipt_order_01'
  
  }
   const order = await instance.orders.create(options);
  //  console.log(order);
  if(!order) return res.status(400).json('There is no order')
 res.json(order)
} catch (error) {
    return res.status(500).json({message: error.message});
 
}

}

//  Order success

export const orderSuccess = async (req, res) => {
 try {
  const user = await User.findById(req.user.id);
    // console.log(user);
   if (!user) return res.status(400).json({ message: 'User does not exist' });
   const {amount,
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
    
            razorpaySignature,
            cart,
            address
   } = req.body;
   
  //  console.log(req.body)
   
   const { _id, name, email } = user;
   const { phone, pincode, addressLine, city, state } = address;
   cart.filter(item => {
   return soldProducts(item._id,item.quantity,item.sold)
   
   }

   )
   
   const payment = await Payment.create({
     user_id: _id, name, email, paymentId: razorpayPaymentId, order_id: razorpayOrderId, cart, address
   })
 
  const hash = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET);

        hash.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = hash.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
   
        res.status(200).json({
            msg: `Your payment of ₹${amount} is successfully completed 😃 `,
            // orderId: razorpayOrderId,
            // paymentId: razorpayPaymentId,
        });
} catch (error) {
    return res.status(500).json({message: error.message});
 
}

}

const soldProducts = async (id, quantity, previousSold) => {
  await Product.findOneAndUpdate({ _id: id }, {
    sold: quantity + previousSold


})
}