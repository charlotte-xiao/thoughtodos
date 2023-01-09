// eslint-disable-next-line no-undef
module.exports = {
  // tsc 转译
  preset: "ts-jest",
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
    "<rootDir>/src/service/**/*.{tsx,ts}",
    "<rootDir>/src/utils/**/*.{tsx,ts}",
  ],
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "node_modules/axios/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
};
