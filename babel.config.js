module.exports = api => {
  api.cache(true);

  // allows lazy loading of modules and code splitting
  const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import"
  ];

  // inject react-hot-loader babel plugin in development only
  if (api.env("development")) {
    plugins.unshift("react-hot-loader/babel");
  }

  const presets = [
    [
      "@babel/preset-env",
      {
        // Given webpack supports ES2015 modules out of the box, we can tell
        // Babel to skip processing them: https://survivejs.com/webpack/loading/javascript/
        modules: false,

        // useBuiltIns: "entry"
        useBuiltIns: "usage"
      }
    ],
    "@babel/preset-react"
  ];

  return {
    presets,
    plugins
  };
};
