module.exports = api => {
  api.cache(true);

  // allows lazy loading of modules and code splitting
  const plugins = ["@babel/plugin-syntax-dynamic-import"];

  // inject react-hot-loader babel plugin in development only
  if (api.env("development")) {
    plugins.unshift("react-hot-loader/babel");
  }

  const presets = [
    [
      "@babel/preset-env",
      {
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
