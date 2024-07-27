import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.on('error', (err) => console.log('Redis Client Error', err));

const connectClient = async () => {
  await client.connect();
  console.log('Connected to Redis');
};

connectClient().catch(console.error);

export default client;
