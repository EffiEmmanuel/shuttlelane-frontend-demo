const { override } = require("customize-cra");

module.exports = override((config) => {
  // Find the rule handling CSS files
  const cssRule = config.module.rules.find((rule) =>
    String(rule.test).includes("css")
  );

  // Add style-loader and css-loader to the rule
  cssRule.use.push(
    { loader: require.resolve("style-loader") },
    { loader: require.resolve("css-loader") }
  );

  return config;
});
