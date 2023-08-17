module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",
    },
    testEnvironment: 'jsdom',
    "setupFilesAfterEnv": ["<rootDir>/src/components/register/RegisterForm.test.tsx"]
  };


  /*
  globals: {
      "ts-jest": {
        transformerConfig: {
          transformIgnorePatterns: [
            "<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)",
            "jest-runner",
          ],
        },
      },
    },
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/.maestro/",
      "@react-native",
    ],
    testEnvironment: "react-native",
    setupFiles: ["<rootDir>/test/setup.ts"],
    setupFilesAfterEnv: ["<rootDir>/jest-setup-after-env.js"], 
    */