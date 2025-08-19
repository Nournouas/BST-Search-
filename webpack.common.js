import HtmlWebpackPlugin from "html-webpack-plugin";

export const entry = "./src/index.js";
export const module = {
  rules: [
    {
      test: /\.html$/,
      use: ["html-loader"],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
  ],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
  }),
];
export const resolve = {
  extensions: [".js"],
};
