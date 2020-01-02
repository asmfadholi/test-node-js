const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerProduct = require('./routes/routerProduct');
const routerOrder = require('./routes/routerOrder');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/product', routerProduct);
app.use('/order', routerOrder);

// app.listen(3000, () => {
//   console.log('Started on port 3000');
// });

module.exports = { app };
