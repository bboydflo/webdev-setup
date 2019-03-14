const PurgeCssPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: ["style-loader", "css-loader"]
      }
    ]
  }
});

exports.loadSCSS = ({ mode, include, exclude } = {}) => {
  if (mode === "development") {
    return {
      module: {
        rules: [
          {
            test: /\.(scss|sass)$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "fast-sass-loader"
                // options: {
                //   // includePaths: [ ... ]
                // }
              }
            ]
          }
        ]
      }
    };
  }
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include,
          exclude,

          use: ["style-loader", "css-loader", "sass-loader"]
          // use: [
          //   "style-loader",
          //   { loader: "css-loader", options: { url: false } },
          //   "sass-loader"
          // ]
        }
      ]
    }
  };
};

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        include,
        exclude
      }
    ]
  }
});

exports.devServer = {
  devServer: {
    contentBase: "./dist",
    overlay: true
  }
};

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  // const plugin = new MiniCssExtractPlugin({
  //   filename: "css/[name].css"
  // });
  const plugin = new ExtractCssChunks({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "css/[name].css",
    chunkFilename: "[id].css",
    orderWarning: true // Disable to remove warnings about conflicting order between imports
  });

  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include,
          exclude,

          // use: [MiniCssExtractPlugin.loader].concat(use)
          use: [
            {
              loader: ExtractCssChunks.loader,
              options: {
                hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
                modules: true, // if you use cssModules, this can help.
                reloadAll: true // when desperation kicks in - this is a brute force HMR flag
              }
            }
          ].concat(use)
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurgeCssPlugin({ paths })]
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpe?g)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options
        }
      },
      {
        test: /\.svg$/,
        include,
        exclude,
        use: {
          loader: "file-loader",
          options
        }
      }
    ]
  }
});

// https://survivejs.com/webpack/loading/fonts/
exports.loadFonts = ({ mode }) => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
            outputPath: mode === "development" ? "" : "/"
            // publicPath: "/"
          }
        }
      }
    ]
  }
});
