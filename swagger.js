const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Get the server URL and port dynamically from environment variables
const serverUrl = process.env.SERVER_URL || 'http://localhost';
const serverPort = process.env.PORT || 3005;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'My API', // Title of the API
            version: '1.0.0', // Version of the API
            description: 'API documentation', // Description
        },
        servers: [
            {
                url: `${serverUrl}:${serverPort}/`, // Dynamically set the base URL for the API
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your API docs (adjust as needed)
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
