import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const folder = '/logs';

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.File({ filename: `error.log`, level: 'error' }), new winston.transports.File({ filename: `combined.log`, level: 'info' })],
});

const buildLogger = (service: string): { log: Function; error: Function } => {
  return {
    log: (message: string) => logger.log('info', { message, service }),
    error: (message: string) => logger.error('error', { message, service }),
  };
};

export default buildLogger;
