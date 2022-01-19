module.exports = {
  preset: "jest-playwright-preset",
  moduleDirectories: ["node_modules", "src"],
  testEnvironmentOptions: {
    "jest-playwright": {
      // browsers: ["firefox", "chromium", "webkit"],
    },
  },
};
