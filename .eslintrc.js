const configs = require("@alexseitsinger/eslint-config")

module.exports = {
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      ...configs.javascriptReact,
    },
    {
      files: ["*.ts", "*.tsx"],
      ...configs.typescriptReact,
    },
    {
      files: ["package.json"],
      ...configs.jsonPackage,
    },
    {
      files: ["*.md"],
      ...configs.markdownTypescriptReact,
    },
  ],
}
