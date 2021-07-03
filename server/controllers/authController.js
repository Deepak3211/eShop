
const User = require('../models/User');
const { hashPassword, comparePassword, createAccessToken, createRefreshToken } = require('../utils/auth');
const jwt = require('jsonwebtoken');
const sendToken = require('../utils/jwtToken');
const Payment = require('../models/Payment');
// Register User => /api/v1/register
exports.registerUser = async (req, res, next) => {
  
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      })
    };
    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password should be at least 6 characters long'
      })

    }
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      })
    }
    // Hashing the password

    const hashedPassword = await hashPassword(password);

    // register user
    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword });


    // Jsonwebtoken for authentication
    sendToken(user, 201, res);


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

// Login User => /api/v1/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found with this email"
      })
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // If login success create accessToken and refreshToken

     // Jsonwebtoken for authentication
    sendToken(user, 200, res);

    
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Logout User => /api/v1/logout
exports.logoutUser = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      path: '/api/v1/refresh_token',
       expires: new Date(Date.now()),
      
    })
    return res.status(200).json({message: 'Successfully logout'})
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get User Info => /api/v1/getUserInfo
exports.getUserInfo = async (req, res) => {
  // res.json(req.user)
  try {
    const user = await User.findById(req.user.id);
    // console.log(user);
    if (!user) return res.status(400).json({ message: 'User does not exist' })
    res.json(user);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Get accessToken => /api/v1/refresh_token

exports.getAccessToken = (req, res) => {

     try {
            const rf_token = req.cookies.refreshToken;
            if(!rf_token) return res.status(400).json({message: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({message: "Verification failed"})

                const accessToken = createAccessToken({id: user.id})

              res.status(200).json({ accessToken });
            })

        } catch (err) {
       return res.status(500).json({ msg: err.message });
        }
 

  
} 


exports.createCategory = async (req, res) => {
  try {
    res.json({message: "admin here"})
    
  } catch (error) {
       return res.status(500).json({ msg: error.message });
    
  }
}



exports.addCart = async (req, res) => {

 try {
  const user = await User.findById(req.user.id);
  if(!user) return res.status(400).json({message: 'User does not exist'})
  await User.findOneAndUpdate({ _id: req.user.id }, {
  cart: req.body.cart
  
  })
  return res.status(200).json({message: 'Added to cart'})
  
 } catch (error) {
   return res.status(500).json({ msg: error.message });
  
 }

}

exports.history = async (req, res) => {

try {
  const history = await Payment.find({user_id: req.user.id});

  res.status(200).json(history);
} catch (error) {
   return res.status(500).json({ msg: error.message });
  
}
}