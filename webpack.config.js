// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const productionConfig = merge([
//   {
//     output: {
//       // Tweak this to match your GitHub project name
//       publicPath: '/webpack-demo/',
//     },
//   },
// ]);

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    // contentBase: path.resolve(__dirname, './dist'),
    // contentBase: path.join(__dirname, './dist'),
    open: true,
    compress: true,
    // stats: 'errors-only',
    hot: true,
    port: 8080,
  },
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    // publicPath: "/webpak-linux/",
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'index.html', // название выходного файла
    }),
    new CleanWebpackPlugin(),
    // применять изменения только при горячей перезагрузке
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // изображения
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // шрифты и SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      // CSS, PostCSS, Sass плагин loader обрабатываeт результат css и создают отдельный файл
      {
        test: /\.(scss|css)$/,
        use: [
          //   'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
