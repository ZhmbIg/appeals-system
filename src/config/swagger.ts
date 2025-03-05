import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Appeals System API',
            version: '1.0.0',
            description: 'Документация для системы работы с обращениями',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);