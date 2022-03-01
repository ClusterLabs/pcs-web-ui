module.exports = {
  preset: "jest-playwright-preset",
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: {
    "jest-playwright": {
      contextOptions: {
        ignoreHTTPSErrors: true,
      },
      // browsers: ["firefox", "chromium", "webkit"],
    },
  },
};
