const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = mongoose.model('Order', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
  location: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  others: {
    type: String,
    required: true,
    trim: true,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { Order };
