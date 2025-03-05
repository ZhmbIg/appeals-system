import dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './data-source';
import app from './app';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => console.log('Database connection error:', error));