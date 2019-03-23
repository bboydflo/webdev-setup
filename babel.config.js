module.exports = api => {
  const plugins = [
    // allows lazy loading of modules and code splitting
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
  ];
  
  // inject react-hot-loader babel plugin in development only
  if (api.env("development")) {
    plugins.unshift("react-hot-loader/babel")
  }

  const presets = [
    ["@babel/preset-env"],
    [
      "@babel/preset-react",
      {
        // Given webpack supports ES2015 modules out of the box, we can tell
        // Babel to skip processing them: https://survivejs.com/webpack/loading/javascript/
        modules: false,

        // useBuiltIns: "entry"
        useBuiltIns: "usage"
      }
    ]
  ];

  return {
    presets,
    plugins
  };
};
