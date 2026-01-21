// jest.config.cjs
module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],

  moduleNameMapper: {
    '^@ajaisgtickets/common$': '<rootDir>/src/index.ts',
  },

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
