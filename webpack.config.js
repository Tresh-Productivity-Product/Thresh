const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: '/client/index.js', //react landing page
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /.(css|scss)$/,
        include: path.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, //image loader for logo
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html', //template that webpack builds base html off
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', //redirects requests to 3000 from 8080 if in dev
        pathRewrite: { '^/api': '' }, //do not call localhost:3000 directly, so make all fetch reqs to /api first
        changeOrigin: true,
      },
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    // devtool: 'eval-source-map'
  },
};
