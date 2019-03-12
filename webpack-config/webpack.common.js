const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const parts = require("./webpack.parts");

module.exports = mode => {
  return merge([
    parts.loadJS({ exclude: /node_modules/ }),
    parts.loadCSS(),
    parts.loadSCSS({ mode }),
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
};
