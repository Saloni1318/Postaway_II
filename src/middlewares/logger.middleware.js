import winston from 'winston';


export const logger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{service : 'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});

export const errorLogger = winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{service : 'error-logging'},
    transports:[
        new winston.transports.File({filename:'errors.txt'})
    ]
});

export const loggerMiddleware = async (req, res, next)=>{
    // 1. Log request body.
    if(req.url.includes('signin') || req.url.includes('signup')){
        const logData = `TimeStamp: ${new Date().toString()} req URL: ${req.url} - ${JSON.stringify(req.body)}`; // converting req.body obect to string format
        // await log(logData);
        logger.info(logData);
    }
    next();
}