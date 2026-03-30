const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    size: String,
    price: Number,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending',
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    default: 'cash on delivery',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);