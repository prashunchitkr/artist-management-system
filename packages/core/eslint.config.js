module.export = {
  env: {
    node: true,
    es2024: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
