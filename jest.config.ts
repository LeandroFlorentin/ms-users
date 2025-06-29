import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  moduleNameMapper: {
    '^&/(.*)$': '<rootDir>/$1',
  },
  preset: 'ts-jest',
  setupFiles: ['./jest.env.ts'],
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  roots: ['./tests'],
};

export default config;
