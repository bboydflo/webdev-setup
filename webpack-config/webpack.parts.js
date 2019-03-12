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

exports.loadSCSS = ({ include, exclude } = {}) => ({
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
});

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
