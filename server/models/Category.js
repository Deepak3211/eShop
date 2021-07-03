const  mongoose  = require('mongoose');
const { Schema } = mongoose;


const categorySchema = new Schema({

  name: {
    type: String,
    required: [true, 'Please mention the category of the prodcut'],
    maxlength: [30, 'Category name can\'t exceed 30 characters'],
    trim: true,
    unique: true
  },
  
  

}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);


