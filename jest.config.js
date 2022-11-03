// eslint-disable-next-line no-undef
module.exports = {
    // 自动清除 Mock
    clearMocks: true,
    // 覆盖率
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    // 覆盖路径
    collectCoverageFrom: [
        "<rootDir>/src/component/**/*.{tsx,ts}",
        "<rootDir>/src/pages/**/*.{tsx,ts}",
    ],
};
