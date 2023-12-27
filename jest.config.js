/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  coveragePathIgnorePatterns: [
    'src/main.tsx',
    'src/config.tsx',
    'src/services/storage.tsx',
    'src/store/store.tsx',
    'src/pages/*.ts',
    'src/services/images.ts',
    'src/entities/*.ts',
    'src/types/*.tsx',
  ],
};
