import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.File({ filename: `error.log`, level: 'error' }), new winston.transports.File({ filename: `combined.log`, level: 'info' })],
});

const buildLogger = (service: string): { log: (message: string) => void; error: (message: string) => void } => {
  return {
    log: (message: string) => logger.log('info', { message, service }),
    error: (message: string) => logger.error('error', { message, service }),
  };
};

export default buildLogger;
