import mongoose from "mongoose";
const { Schema } = mongoose;


const productSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Please mention the Product'],
    maxlength: [30, 'Product name can\'t exceed 30 characters'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please write description of the prodcut'],
    maxlength: [300, 'Description can\'t exceed 300 characters'],
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 32,
    trim: true,
  },
  category: {

    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  stock: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    contentType: String
  }
  
  
  

}, { timestamps: true });

export default mongoose.model('Product', productSchema);


