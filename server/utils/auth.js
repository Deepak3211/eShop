const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken');
// hashing the password
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        
        if (err) {
          reject (err);
        }
        resolve(hash);
      })
    })
  })
}


// Comparing the password

exports.comparePassword = (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
}

// Create accessToken
exports.createAccessToken =  (user) => {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10m'})

}

// Create RefreshToken
exports.createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}