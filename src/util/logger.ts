import winston from 'winston';

const options: winston.LoggerOptions = {
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(options);

export default logger;
