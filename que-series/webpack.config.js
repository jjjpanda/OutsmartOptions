const path = require('path')

module.exports = {
mode: 'production',
entry: {
  app: './index.js',
},
output: {
  filename: 'index.js',
  path: path.resolve(__dirname, 'src')
},
resolve: {
  extensions: ['.js']
},
module: {
    rules: [
      {
        test: /\.js$/,  
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
        
      }
    ]
}
}