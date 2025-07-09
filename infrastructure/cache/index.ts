import Redis from 'ioredis';
import { cacheCfg } from '&/config';

const { RD_HOST, RD_PASSWORD, RD_PORT } = cacheCfg;

const cache = new Redis({
  host: RD_HOST,
  password: RD_PASSWORD,
  port: RD_PORT,
});

export default cache;
