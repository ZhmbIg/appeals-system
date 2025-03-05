import { DataSource } from 'typeorm';
import { Appeal } from './entity/Appeal.entity';

const isTest = process.env.NODE_ENV === 'test';

export const AppDataSource = new DataSource({
  type: isTest ? 'sqlite' : 'postgres',
  database: isTest ? ':memory:' : process.env.DB_DATABASE || 'appeals',
  host: isTest ? undefined : process.env.DB_HOST || 'localhost',
  port: isTest ? undefined : process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: isTest ? undefined : process.env.DB_USERNAME || 'postgres',
  password: isTest ? undefined : process.env.DB_PASSWORD || 'postgres',
  entities: [Appeal],
  synchronize: true,
  dropSchema: isTest,
});