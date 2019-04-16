const PurgeCssPlugin = require("purgecss-webpack-plugin");
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
            // use: ["style-loader", "css-loader", "fass-sass-loader"]
            use: [
              {
                // Adds CSS to the DOM by injecting a `<style>` tag
                loader: "style-loader"
              },
              {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: "css-loader"
              },
              {
                // Loader for webpack to process CSS with PostCSS
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [require("autoprefixer")];
                  }
                }
              },
              {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: "sass-loader"
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

          // use: [
          //   "style-loader",
          //   { loader: "css-loader", options: { url: false } },
          //   "sass-loader"
          // ]
          // use: ["style-loader", "css-loader", "sass-loader"]
          use: [
            {
              // Adds CSS to the DOM by injecting a `<style>` tag
              loader: "style-loader"
            },
            {
              // Interprets `@import` and `url()` like `import/require()` and will resolve them
              loader: "css-loader"
            },
            {
              // Loader for webpack to process CSS with PostCSS
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [require("autoprefixer")];
                }
              }
            },
            {
              // Loads a SASS/SCSS file and compiles it to CSS
              loader: "sass-loader"
            }
          ]
        }
      ]
    }
  };
};

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader"
        },
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
  const plugin = new ExtractCssChunks({
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
exports.loadFonts = () => ({
  module: {
    rules: [
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]"
          }
        }
      }
    ]
  }
});
