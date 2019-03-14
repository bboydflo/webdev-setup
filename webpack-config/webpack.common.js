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

exports.commonConfig = mode => {
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
        publicPath: "/"
      },
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
};
