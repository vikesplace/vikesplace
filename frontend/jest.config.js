module.exports = {
    collectCoverageFrom: ['src/**/*.{js,jsx}', "!**/src/index.js"],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/testSetup/setupTests.js'],
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/testSetup/styleMock.js',
        "\\.(png)$": '<rootDir>/src/testSetup/fileMock.js',
    },
    collectCoverageFrom: ["./src/**"],
    coverageReporters: ['html'],
    coverageDirectory: './coverage',
    setupFiles: ['dotenv/config']
}