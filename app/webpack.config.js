const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    earthquake: "./src/earthquake/index.js",
    invader: "./src/invader/index.js"
  },

  output: {
    filename: "[name]/main.bundle.js",
    path: path.resolve(__dirname, "../public")
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "earthquake/index.html"
    }),
    new HtmlWebpackPlugin({
      filename: "invader/index.html"
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: { presets: ["env"] }
        }
      }
    ]
  }
};
