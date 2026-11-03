import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Desafio Trainee Spacecom',
            version: '1.0.0',
            description: 'API para identificação de encontros, como forma de realizar o desafio prático da Spacecom.'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],

    },
    apis: [
        './src/presentation/controllers/**/*.ts',
        './src/presentation/routes/**/*.ts'
    ]
};

export const swaggerDocument = swaggerJsdoc(options);