module.exports = {
  preset: "ts-jest",
  globalSetup: "./src/test/jest-preset.ts",
  moduleDirectories: [
    "node_modules",
    "src",
    "../app/src",
    "../dev-backend/src",
  ],
  testTimeout: 10000,
};
