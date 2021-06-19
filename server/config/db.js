import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_URL;

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Database connection established');
    
  } catch (error) {
    console.log(error.message);
  }
}
