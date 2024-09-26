// swagger.js

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
                url: 'http://localhost:3005/', // Base URL for the API
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
