const merge = require("webpack-merge");
const webpack = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

const parts = require("./webpack-config/webpack.parts");
const { paths, commonConfig } = require("./webpack-config/webpack.common");

// development server port
const devPort = process.env.PORT || 9000;

const developmentConfig = merge([
  {
    devtool: "eval-source-map",
    devServer: {
      contentBase: "./dist",
      overlay: true,
      port: devPort
    },
    plugins: [
      // Ignore node_modules so CPU usage with poll watching drops significantly.
      // not sure is necessary when dev server doesn't use polling
      // https://survivejs.com/webpack/developing/webpack-dev-server/#polling-instead-of-watching-files
      new webpack.WatchIgnorePlugin([paths.nodeModules]),
      new ErrorOverlayPlugin(),
      new OpenBrowserPlugin({ url: `http://localhost:${devPort}` })
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
  })
  // parts.purifyCSS({
  //   paths: glob.sync(`${paths.src}/**/*`, { nodir: true })
  // })
]);

module.exports = (mode, options) => {
  if (mode === "development") {
    return merge(developmentConfig, commonConfig(mode), { mode });
  }

  return merge(productionConfig, commonConfig(mode, options), { mode });
};
