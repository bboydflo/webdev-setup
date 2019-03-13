const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const parts = require("./webpack.parts");

const PATHS = {
  src: path.join(__dirname, "src"),
  context: path.resolve(__dirname, "src"),
  nodeModules: path.join(__dirname, "node_modules")
};

exports.paths = PATHS;

exports.commonConfig = merge([
  parts.loadJS({ include: PATHS.src, exclude: /node_modules/ }),
  parts.loadCSS(),
  parts.loadFonts(),
  {
    // output: {
    //   filename: "[name].[hash].[ext]",
    //   // path: path.resolve(__dirname, "dist")
    //   path: path.resolve(__dirname, "..", "dist")
    // },
    resolve: {
      modules: ["node_modules", PATHS.context],
      extensions: [".js", ".jsx", ".json", ".css"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "web-dev setup"
      })
    ]
  }
]);
