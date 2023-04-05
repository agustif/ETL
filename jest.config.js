module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testRegex: '\\.test\\.(ts|tsx)$', // or '\\.test\\.tsx$' if you're using TypeScript
}