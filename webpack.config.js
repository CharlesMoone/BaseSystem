const path = require('path');


module.exports = {
  /**
   * emulate a full ES2015+ environment and is intended to be used in an application rather than a library/tool
   *
   * details: https://babeljs.io/docs/usage/polyfill/
   */
  entry: ['babel-polyfill', `${__dirname}/client/index.jsx`],

  output: {
    /**
     * 此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 output.path 选项指定的目录下。
     *
     * details: https://doc.webpack-china.org/configuration/output/#output-filename
     */
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    chunkFilename: '[name].[id].bundle.js',
  },

  resolve: {
    /**
     * 自动解析确定的扩展。默认值为: extensions: [".js", ".json"]
     * 能够使用户在引入模块时不带扩展
     *
     * details: https://doc.webpack-china.org/configuration/resolve/#resolve-extensions
     */
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'client/StaticFile')],
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '__[local]__[name]__[hash:base64:5]'
        }
      }],
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2?)((\?v=[0-9]\.[0-9]\.[0-9])|(\?[a-zA-Z0-9_]+))?$/,
      loader: 'url-loader',
      query: {
        name: '[path][hash].[ext]',
        limit: 10240,
      },
    }, {
      test: /\.bundle\.js$/,
      use: 'bundle-loader',
    }],
  },

  watchOptions: {
    ignored: /node_modules/,
    poll: true,
  },
};