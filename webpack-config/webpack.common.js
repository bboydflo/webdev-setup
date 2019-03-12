const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const parts = require("./webpack.parts");

const PATHS = {
  src: path.join(__dirname, "src"),
  nodeModules: path.join(__dirname, "node_modules")
};

exports.paths = PATHS;

exports.commonConfig = merge([
  parts.loadJS({ include: PATHS.src, exclude: /node_modules/ }),
  parts.loadCSS(),
  parts.loadFonts(),
  {
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "src")],
      extensions: [".js", ".jsx", ".json", ".css"]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "web-dev setup"
      })
    ]
  }
]);
