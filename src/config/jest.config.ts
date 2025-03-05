import type { Config } from '@jest/types';
import { resolve } from 'path';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  rootDir: resolve(__dirname, '../../'),
  globals: {
    'ts-jest': {
      tsconfig: resolve(__dirname, '../../tsconfig.json')
    }
  }
};

export default config;