// src/models/Order.ts
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  status: { type: String, default: 'Pending' },
  paymentId: { type: String },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;