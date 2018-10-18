const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const redis = require('redis');

let app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/my_test', { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('mongoDB is connected!');
});

const redisClient = redis.createClient();
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on("error", (err) => {
    console.log("Error " + err);
});

// log
app.use(morgan('dev'));


require('./src/routers')(app);


// handle error
app.use((req, res, next) => {
    let error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;