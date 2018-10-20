const redis = require('redis');

const redisClient = redis.createClient(6379, 'redis');

function countAPICalls(req, res, next) {
    const url = req.originalUrl;
    redisClient.incr(url);
    next();
}

module.exports = countAPICalls;
