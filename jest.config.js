module.exports = {
  preset: "@testing-library/react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: [
    "/node_modules/(?!(@react-native|react-native)/).*/",
  ],
};
