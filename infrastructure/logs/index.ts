import winston from 'winston';
const { combine, timestamp, json } = winston.format;

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.File({ filename: `error.log`, level: 'error' }), new winston.transports.File({ filename: `combined.log`, level: 'info' })],
});

const buildLogger = (service: string): { log: (content: string | object | null) => void; error: (content: string | object | null) => void } => {
  return {
    log: (content: string | object | null) => logger.log('info', { content, service }),
    error: (content: string | object | null) => logger.error('error', { content, service }),
  };
};

export default buildLogger;
