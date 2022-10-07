export default {
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./setup-tests.ts"],
  // moduleNameMapper: {
  //     "^@config/(.*)$": "<rootDir>/src/config/$1",
  //     "^@branch/(.*)$": "<rootDir>/src/branch/$1",
  //     "^@common/(.*)$": "<rootDir>/src/common/$1",
  //     "^@employee/(.*)$": "<rootDir>/src/employee/$1",
  //     "^@customer/(.*)$": "<rootDir>/src/customer/$1",
  //     "^@account/(.*)$": "<rootDir>/src/account/$1",
  // },
};
