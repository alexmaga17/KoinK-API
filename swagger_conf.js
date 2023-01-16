const options = {
    swaggerDefinition: {
        info: {
            description: 'KoinK API Documentation',
            title: 'KoinK API',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "Bearer Token",
            }
        }
        
    },
    basedir: __dirname,
    files: ['./routes/**/*routes.js', './models/**/*model.js']
};

module.exports = options; 