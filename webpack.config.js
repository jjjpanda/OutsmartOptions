const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    home: './src/home/index.js',
    calc: './src/calc/index.js',
    help: './src/help/index.js',
    watch: './src/watch/index.js',
    login: './src/login/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true,
            modifyVars: {
              "@primary-color": "#a496b3"
            }
          }
        }]},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader",'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
       }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks : ['home'],
      filename: 'home.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks : ['calc'],
      filename: 'calc.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks : ['login'],
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks : ['watch'],
      filename: 'watch.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks : ['help'],
      filename: 'help.html'
    })
  ]
}