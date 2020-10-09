module.exports = {
  preset: "jest-playwright-preset",
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: {
    "jest-playwright": {
      launchOptions: {
        // headless: false,
      },
      browsers: ["firefox", "chromium", "webkit"],
    },
  },
};
