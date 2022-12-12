module.exports = {
  preset: 'react-native',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.(jsx|js)$': 'babel-jest',
    '^.+\\.(tsx|ts)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '^@env(.*)$': '<rootDir>/.env.test$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(.*)/)'],
  setupFiles: ['<rootDir>/setupJest.js'],
};
