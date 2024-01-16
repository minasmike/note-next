const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Other webpack configuration options...
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
