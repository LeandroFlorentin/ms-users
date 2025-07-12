import Redis from 'ioredis';
import { cacheCfg } from '&/config';

const { RD_HOST, RD_PASSWORD, RD_PORT } = cacheCfg;

const cache = new Redis({
  host: RD_HOST,
  password: RD_PASSWORD,
  port: RD_PORT,
});

cache.on('error', (err) => {
  console.error('Error de conexión con Redis', err.message);
  process.exit(1);
});

export default cache;
