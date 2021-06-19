import { createAccessToken,createRefreshToken} from '../utils/auth.js';

const sendToken = (user, statusCode, res) => {

   // Jsonwebtoken for authentication
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    // Cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/v1/refresh_token',
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000),
   
   
    })


    res.status(statusCode).json({
      success: true,
      message: "Success",
      accessToken,
    })
    
}
export default sendToken;