import 'reflect-metadata';
import express from 'express';
import appealRoutes from './routes/appeals';
import { swaggerSpec } from './config/swagger';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/appeals', appealRoutes);

app.use(errorHandler);

export default app;