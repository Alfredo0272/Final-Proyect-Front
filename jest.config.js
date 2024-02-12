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
    'src/services/local.storage.ts',
    'src/services/images.ts',
    'src/store/store.tsx',
    'src/pages/*.ts',
    'src/models/*.ts',
    'src/types/*.ts',
  ],
};
