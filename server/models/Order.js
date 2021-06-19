import mongoose from "mongoose";
const { Schema } = mongoose;

 const productCartSchema = new Schema({

  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: String,
  count: Number,
  price: Number,
})
export default mongoose.model("ProductCart", productCartSchema);



const orderSchema = new Schema({

  products: [productCartSchema], // inside the cart products
  transaction_id: {},
  amount: { type: Number },
  address: String,
  updated: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"

  }
  
  
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

