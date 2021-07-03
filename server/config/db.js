const mongoose  = require('mongoose');


const db = process.env.MONGO_URL;

 const connectDB = async () => {
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
module.exports = connectDB;