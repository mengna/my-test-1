const redis = require('redis');

const redisClient = redis.createClient();

function countAPICalls(req, res, next) {
    const url = req.originalUrl;
    redisClient.incr(url);
    next();
}

module.exports = countAPICalls;
