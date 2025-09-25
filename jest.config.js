// NEW - Jest Configuration
module.exports = {
  projects: [
    '<rootDir>/apps/web',
    '<rootDir>/apps/backend',
    '<rootDir>/apps/mobile',
    '<rootDir>/packages/ui',
    '<rootDir>/packages/utils'
  ],
  collectCoverageFrom: [
    'apps/**/*.{js,jsx,ts,tsx}',
    'packages/**/*.{js,jsx,ts,tsx}',
    '!**/*.config.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};