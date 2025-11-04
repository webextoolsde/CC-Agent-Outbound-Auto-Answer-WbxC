const path = require("path");

const config = {
  mode: "production",
  entry: "./src/ccagent-out-aa",
  output: {
    path: path.resolve(__dirname, "src/build"),
    filename: "ccagent-out-aa.js",
    publicPath: "build/"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
