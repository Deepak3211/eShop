import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import userRouter from './routes/authRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import media from './routes/upload.js';
import fileUpload from 'express-fileupload';
// Initialize the app
const app = express();

// PORT
const PORT = process.env.PORT || 5050;

// Database Connection
connectDB();

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

// Listen

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})