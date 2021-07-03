const mongoose  = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;


const userSchema = new Schema({

  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Your name can\'t exceed 30 characters'],
    trim: true
  },
  
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    select: false, //don't display the password of the user
  },
  userInfo: {
    type: String,
    trim : true
  },
  role: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Array,
    default: []
  }

}, { timestamps: true });

module.exports =  mongoose.model('User', userSchema);


