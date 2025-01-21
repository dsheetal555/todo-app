const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'My To-Do API Description',
    },
    servers: [
        {
            url: "http://localhost:8080/",
            description: "Local server"
        },
        {
            url: "<your live url here>",
            description: "Live server"
        },
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;