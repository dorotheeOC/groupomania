const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const comRoutes = require('./routes/comment');
const imgRoutes = require('./routes/image');

const path = require('path');
global.__basedir = __dirname;

const app = express();
app.use(express.urlencoded({ extended: true }));
const db = require("./models");
db.sequelize.sync();
require("./config/adminConfig");

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api', comRoutes)
app.use('/api', imgRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;

