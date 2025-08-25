import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'node:url';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { createStyleRules } from './webpack/index.ts';

const getPath = (relativePath: string): string => {
  return fileURLToPath(new URL(relativePath, import.meta.url));
};

const extensionsToResolve = ['.ts', '.tsx', '.js', '.jsx', '.json'];
const configuration: webpack.Configuration & {
  devServer?: DevServerConfiguration;
} = {
  entry: getPath('./src/index.tsx'),

  mode: 'development',

  output: {
    path: getPath('./dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'swc-loader'
      },

      ...createStyleRules({ isProduction: false }),

      {
        test: /\.(?:ico|png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Code Editor',
      template: getPath('./src/index.html')
    })
  ],

  resolve: {
    extensions: extensionsToResolve,

    plugins: [
      new TsconfigPathsPlugin({
        extensions: extensionsToResolve
      })
    ]
  },

  devServer: {
    open: true,
    port: 3000,
    host: '0.0.0.0',
    hot: 'only',
    liveReload: true,
    compress: true,
    historyApiFallback: true,
    allowedHosts: ['all'],
    client: {
      overlay: true
    }
  }
};

export default configuration;
