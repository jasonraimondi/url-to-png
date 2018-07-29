'use strict';

const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';

const projectRoot = path.resolve(__dirname, '../');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [
      ['@babel/preset-env']
    ],
    compact: false
  }
};

const plugins = [
];

module.exports = {
  target: 'node',
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'eval-cheap-module-source-map' : false,
  context: projectRoot,
  entry: {
    'main': './src/main.ts',
  },
  output: {
    path: projectRoot + '/dist',
    filename: devMode ? '[name].package.js' : '[name].[hash].package.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {loader: 'ts-loader'}
        ]
      }
    ]
  },
  plugins
};
