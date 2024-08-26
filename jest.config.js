module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"], // Adjust if necessary
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy", // Handle CSS imports if needed
  },
};
