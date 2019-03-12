module.exports = api => {
  const plugins = ["@babel/plugin-syntax-dynamic-import"];
  if (api.env("production")) {
    plugins.unshift("react-hot-loader/babel");
  }
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "usage"
        }
      ],
      "@babel/preset-react"
    ],
    plugins
  };
};
