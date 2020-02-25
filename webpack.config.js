const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),
  stylesDir: path.join(__dirname, './src/css'),
  varFile: path.join(__dirname, './src/css/variables.less'),
  mainLessFile: path.join(__dirname, './src/css/index.less'),
  themeVariables: ['@primary-color', 
    '@info-color', 
    '@warning-color', 
    '@primary-color',
    '@info-color',
    '@warning-color',
    '@highlight-color',
    '@body-background',
    '@component-background',
    '@heading-color',
    '@text-color',
    '@text-color-secondary',
    '@border-color-base',
    '@border-color-split',
    '@layout-body-background',
    '@layout-header-background',
    '@layout-sider-background',
    '@layout-trigger-background',
    '@layout-trigger-color',
    '@disabled-color',
    '@background-color-light',
    '@background-color-base',
    '@item-active-bg',
    '@item-hover-bg',
    '@btn-default-bg',
    '@input-bg',
    '@popover-bg',
    '@menu-dark-submenu-bg',
    '@table-header-bg',
    '@table-row-hover-bg',
    '@table-selected-row-bg',
    '@table-expanded-row-bg',
    '@tag-default-bg',
    '@collapse-header-bg',
    '@card-head-color',
    '@card-head-background',
    '@card-actions-background',
    '@card-background',
    '@input-bg',
  ],
  indexFileName: 'app.html',
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/App.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
            javascriptEnabled: true
          }
        }, 
      ]},
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader",'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/app.html',
      chunks : ['app'],
      filename: 'app.html'
    }),
    new AntDesignThemePlugin(options)
  ]
}