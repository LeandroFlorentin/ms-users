import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { configDocumentation } from '&/config';
import paths from './routes';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Microservicio de usuarios',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      },
    ],
    paths: { ...paths },
  },

  apis: ['../../interfaces/routes/index.ts', '../../interfaces/routes/index.js'],
};

const openapiSpecification = swaggerJsdoc(options);

const implementaDocumentation = (app: any, port: number) => {
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  console.log(`Ver documentación en: ${configDocumentation.URL_BASE}${port}/documentation`);
};

export default implementaDocumentation;
