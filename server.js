const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

require('dotenv').config({path: __dirname + '/.env'});

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer().array())

require('./routes/routes')(app);

app.listen(PORT);