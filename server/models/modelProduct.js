const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  minimum_order: {
    type: Number,
    required: true,
  },
  unit_measure: {
    type: String,
    required: true,
    trim: true,
  },
  conditions: {
    type: Array,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  image: {
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
  amounts: [
    {
      price: {
        type: Number,
        required: true,
      },
      limit_minimum: {
        type: Number,
        required: true,
      },
      limit_maximum: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = { Product };
