import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({

 user_id: { type: String, required: true },
 name: { type: String, required: true },
 email: { type: String, required: true },
 paymentId: { type: String, required: true },
 order_id: { type: Object, required: true },
 address: {  type: Array,
    default: [],required: true },
 cart: { type: Array, default: [] },
 status: {type: Boolean, default: false},

},{timestamps: true});

export default mongoose.model('Payment', paymentSchema);


