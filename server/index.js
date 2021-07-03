const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();
const   connectDB  = require('./config/db');
const userRouter = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const media = require('./routes/upload');
const fileUpload = require('express-fileupload');
const path = require('path');


// Initialize the app
const app = express();



// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))


// Routes 

app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', media);
app.use('/api/v1', paymentRouter);

// Database Connection
connectDB();


// PORT
const PORT = process.env.PORT || 5050;

if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, '../client/build')))  
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
  })
}

// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})