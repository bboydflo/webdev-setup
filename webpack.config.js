const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

const commonConfig = require("./webpack-config/webpack.common");

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
  }
]);

const productionConfig = merge([
  {
    devtool: "source-map"
  }
]);

module.exports = mode => {
  if (mode === "development") {
    // return merge(commonConfig, developmentConfig, { mode });
    return merge(developmentConfig, commonConfig, { mode });
  }
  // return merge(commonConfig, productionConfig, { mode });
  return merge(productionConfig, commonConfig, { mode });
};
