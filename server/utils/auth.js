import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// hashing the password
export const hashPassword = (password) => {
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

export const comparePassword = (password, hashedpassword) => {
  return bcrypt.compare(password, hashedpassword);
}

// Create accessToken
export const createAccessToken =  (user) => {
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '10m'})

}

// Create RefreshToken
export const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
}