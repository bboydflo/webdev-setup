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
                loader: "fast-sass-loader",
                options: {
                  // includePaths: [ ... ]
                }
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
