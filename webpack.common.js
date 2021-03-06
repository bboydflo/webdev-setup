const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const config = require("./package.json");
const parts = require("./webpack.parts");

const PATHS = {
  src: path.join(__dirname, "src"),
  context: path.resolve(__dirname, "src"),
  nodeModules: path.join(__dirname, "node_modules")
};

exports.paths = PATHS;

exports.commonConfig = (mode, options) => {
  let publicPath = "/";
  if (options && options.deploy) {
    publicPath = `/${config.name}/`;
  }
  return merge([
    parts.loadJS({ mode, include: PATHS.src, exclude: /node_modules/ }),
    parts.loadFonts({ mode }),
    parts.loadImages({
      mode,
      options: {
        limit: 15000,
        name: "images/[name].[ext]"
      }
    }),
    {
      mode,
      stats: mode === "production" ? { warnings: false } : "minimal",
      output: {
        publicPath
      },
      resolve: {
        modules: ["node_modules", PATHS.context],
        extensions: ["*", ".js", ".jsx", ".json", ".css"]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.EnvironmentPlugin(Object.keys(process.env)),
        // new webpack.DefinePlugin(new webpack.EnvironmentPlugin(Object.keys(process.env))),
        new HtmlWebpackPlugin({
          title: "web-dev setup",
          template: "src/index.html"
        })
      ]
    }
  ]);
};
