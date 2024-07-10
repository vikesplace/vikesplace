module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/testSetup/setupTests.js'],
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/testSetup/styleMock.js',
    }
}