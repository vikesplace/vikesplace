module.exports = {
    collectCoverageFrom: [
        'src/**/*.{js,jsx}', 
        '!**/testSetup/**',
        '!**/logos/**',
        '!**/utils/**',
        '!src/index.js'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/testSetup/setupTests.js'],
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/testSetup/styleMock.js',
        "\\.(png)$": '<rootDir>/src/testSetup/fileMock.js',
    },
    coverageReporters: ['html'],
    coverageDirectory: './coverage',
    setupFiles: ['dotenv/config']
}