const express = require('express');

const router = express.Router();
// eslint-disable-next-line
const { mongoose } = require('../db/mongoose');
const { Product } = require('../models/modelProduct');

router.post('/create', (req, res) => {
  const product = new Product({
    name: req.body.name,
    minimum_order: req.body.minimum_order,
    unit_measure: req.body.unit_measure,
    conditions: req.body.conditions,
    stock: req.body.stock,
    image: req.body.image,
    created_date: new Date(),
    updated_date: new Date(),
    amounts: req.body.amounts,
  });

  product.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/list', (req, res) => {
  // try {
  //   const product = await Product.find();
  //   res.status(200).send({ data: product });
  // } catch (e) {
  //   res.status(400).send(e);
  // }
  Product.find().then((product) => {
    res.send({
      data: product,
      length: product.length,
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

router.post('/delete', (req, res) => {
  // eslint-disable-next-line
  Product.findOneAndDelete({ _id: req.body._id }, (err, todo) => {
    // As always, handle any potential errors:
    if (todo === null) return res.status(400).send(err);
    const response = {
      message: 'Product deleted successfully',
      // eslint-disable-next-line
      _id: todo._id,
    };
    return res.status(200).send(response);
  });
});

router.post('/detail', (req, res) => {
  // eslint-disable-next-line
  Product.findById(req.body._id, (err, product) => {
    // As always, handle any potential errors:
    if (product === null) return res.status(400).send(err);
    const response = {
      message: 'Product detail',
      data: product,
    };
    return res.status(200).send(response);
  });
});

router.post('/update', (req, res) => {
  // eslint-disable-next-line
  Product.findOneAndUpdate({ _id: req.body._id },
    {
      name: req.body.name,
      minimum_order: req.body.minimum_order,
      unit_measure: req.body.unit_measure,
      conditions: req.body.conditions,
      stock: req.body.stock,
      image: req.body.image,
      updated_date: new Date(),
      amounts: req.body.amounts,
    }, (err, product) => {
      // As always, handle any potential errors:
      if (product === null) return res.status(400).send(err);
      const response = {
        message: 'Product updated successfully',
        // eslint-disable-next-line
        _id: product._id,
      };
      return res.status(200).send(response);
    });
});


module.exports = router;
