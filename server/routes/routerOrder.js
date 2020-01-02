const express = require('express');

const router = express.Router();
// eslint-disable-next-line
const { mongoose } = require('../db/mongoose');
const { Order } = require('../models/modelOrder');
const { Product } = require('../models/modelProduct');

router.post('/create', async (req, res) => {
  try {
    const order = new Order({
      name: req.body.name,
      phone: req.body.phone,
      location: req.body.location,
      email: req.body.email,
      products: req.body.products,
      others: req.body.others,
      created_date: new Date(),
      updated_date: new Date(),
    });
    const save = await order.save();
    res.send(save);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/list', async (req, res) => {
  try {
    const listOrder = await Order.find().sort({ created_date: -1 });
    res.status(200).send({ data: listOrder, length: listOrder.length });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/delete', async (req, res) => {
  try {
    // eslint-disable-next-line
    const orderDelete = await Order.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({ message: 'Order deleted successfully', data: orderDelete });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/detail', async (req, res) => {
  try {
    // eslint-disable-next-line
    const detailOrder = await Order.findById(req.body._id);
    const mapProduct = detailOrder.products.map(val => ({
      // eslint-disable-next-line
        _id: val._id,
      quantity: val.quantity,
    }));
    const mapDetailOrder = {
      // eslint-disable-next-line
      _id: detailOrder._id,
      name: detailOrder.name,
      phone: detailOrder.phone,
      location: detailOrder.location,
      email: detailOrder.email,
      others: detailOrder.others,
      products: mapProduct,
    };

    // eslint-disable-next-line
    const allIds = detailOrder.products.map(val => val._id);
    const productDetail = await Product.find({ _id: { $in: allIds } });

    productDetail.forEach((val, index) => {
      mapDetailOrder.products[index].name = val.name;
      mapDetailOrder.products[index].unit_measure = val.unit_measure;
      mapDetailOrder.products[index].minimum_order = val.minimum_order;
      mapDetailOrder.products[index].amounts = val.amounts;
    });

    res.status(200).send({ data: mapDetailOrder });
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.post('/update', (req, res) => {
//   Product.findOneAndUpdate({ _id: req.body._id },
//     {
//       name: req.body.name,
//       minimum_order: req.body.minimum_order,
//       unit_measure: req.body.unit_measure,
//       conditions: req.body.conditions,
//       stock: req.body.stock,
//       image: req.body.image,
//       updated_date: new Date(),
//       amounts: req.body.amounts,
//     }, (err, product) => {
//       // As always, handle any potential errors:
//       if (product === null) return res.status(400).send(err);
//       const response = {
//         message: 'Product updated successfully',
//         _id: product._id,
//       };
//       return res.status(200).send(response);
//     });
// });


module.exports = router;
