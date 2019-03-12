const path = require("path");
const glob = require("glob");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const parts = require("./webpack-config/webpack.parts");
const commonConfig = require("./webpack-config/webpack.common");

const PATHS = {
  src: path.join(__dirname, "src")
};

const developmentConfig = merge([
  {
    devtool: "eval-source-map",
    devServer: {
      contentBase: "./dist",
      overlay: true
    },
    plugins: [
      // Ignore node_modules so CPU usage with poll watching drops significantly.
      // not sure is necessary when dev server doesn't use polling
      // https://survivejs.com/webpack/developing/webpack-dev-server/#polling-instead-of-watching-files
      new webpack.WatchIgnorePlugin([path.join(__dirname, "node_modules")]),
      new ErrorOverlayPlugin()
    ]
  },
  parts.loadSCSS()
]);

const productionConfig = merge([
  {
    devtool: "source-map"
  },
  parts.extractCSS({
    use: ["css-loader", "sass-loader"]
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true })
  })
]);

module.exports = mode => {
  if (mode === "development") {
    return merge(developmentConfig, commonConfig, { mode });
  }
  return merge(productionConfig, commonConfig, { mode });
};
