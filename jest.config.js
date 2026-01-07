module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    '**/*.html',
    '!node_modules/**',
    '!coverage/**',
    '!tests/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  transform: {},
  moduleFileExtensions: ['js', 'html']
};
