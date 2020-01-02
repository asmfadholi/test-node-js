const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/.env` });
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_KEY_URI, { useNewUrlParser: true });

module.exports = { mongoose };
