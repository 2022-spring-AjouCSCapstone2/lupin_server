import redis from 'redis';

export const redisClient = redis.createClient(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
);

redisClient.on('error', (err) => {
    console.log('Redis error : ' + err);
});
