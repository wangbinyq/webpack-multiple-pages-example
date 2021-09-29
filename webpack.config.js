const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")

var pages = ['a', 'b']

module.exports = {
  mode: 'production',
  entry: pages.reduce((e, p) => ({...e, [p]: `./src/${p}.ts`}), {}),
  output: {
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
  module: {

    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-typescript",
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(
      {
        filename: '[name].[contenthash:8].css'
      }
    ),
    ...pages.map(p => new HtmlWebpackPlugin({
      inject: false,
      template: `./src/${p}.html`,
      filename: `${p}.html`,
      scriptLoading: 'blocking',
      chunks: [p]
    }))
  ],
  resolve: {
    extensions: ['.ts', 'tsx', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}