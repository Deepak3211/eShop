import mongoose from "mongoose";
const { Schema } = mongoose;


const productSchema = new Schema({
  product_id: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  title: {
    type: String,
    required: [true, 'Please mention the Product'],
    maxlength: [100, 'Product name can\'t exceed 30 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please write description of the prodcut'],
    maxlength: [1000, 'Description can\'t exceed 300 characters'],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  category: {

    type: String,
    required: true,
  },
  
  images: {
    type: Object,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  sold: {
    type: Number,
    default: 0,
  }
  
  
  

}, { timestamps: true });

export default mongoose.model('Product', productSchema);


