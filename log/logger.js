// logger.js
const winston = require('winston');
const userAgent = require('useragent'); // Import useragent package

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }), // Error logs
        new winston.transports.File({ filename: 'log/combined.log' }), // All logs
        new winston.transports.Console() // Console logging
    ],
});

// Middleware to log requests
const requestLogger = (req, res, next) => {
    const { method, url, headers } = req;
    const device = headers['user-agent']; // Capture device information
    const clientIp = req.ip || req.connection.remoteAddress; // Get client IP address

    // Parse user agent for OS and browser information
    const parsedUserAgent = userAgent.parse(device);
    const os = parsedUserAgent.os; // Operating system
    const browser = parsedUserAgent.toAgent(); // Browser information

    logger.info(`Request: ${method} ${url}, OS: ${os}, Browser: ${browser}, IP: ${clientIp}`);
    next();
};

// Middleware to log responses
const responseLogger = (req, res, next) => {
    const oldSend = res.send;
    res.send = function (body) {
        logger.info(`Response: ${res.statusCode}, URL: ${req.url}`);
        oldSend.call(this, body);
    };
    next();
};

module.exports = { requestLogger, responseLogger, logger };
