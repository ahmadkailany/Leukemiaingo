const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Points to your Next.js app root
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  // Handle module aliases from tsconfig
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  // Test file patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  // Collect coverage from these files
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/layout.tsx',
    '!src/app/globals.css',
  ],
  // Don't transform node_modules (except some ESM packages)
  transformIgnorePatterns: [
    '/node_modules/(?!(react-icons)/)',
  ],
};

module.exports = createJestConfig(config);
