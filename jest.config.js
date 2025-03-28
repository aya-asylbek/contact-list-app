module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/client/src/$1'
    },
    testPathIgnorePatterns: ['/node_modules/', '/client/node_modules/']
  };