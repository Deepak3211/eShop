import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = (req, res, next) => {

  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(500).json({
      message: 'Login first to access the resource'
    })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ message: 'Verification failed' });
      req.user = user;
      next();
  });
  

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}


export const authAdmin = async (req, res, next) => {
  
  try {
    // Get user information be id
    const user = await User.findOne({
      _id: req.user.id
    });
    if (user.role === 0) return res.status(400).json({ message: 'Admin resource access denied ' });

    next();
      
    
    
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
