import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import media from './routes/upload.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'../client/build','index.html'));
  })
}

// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})