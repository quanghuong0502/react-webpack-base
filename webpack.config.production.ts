import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
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

  mode: 'production',

  output: {
    path: getPath('./dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'swc-loader'
      },

      ...createStyleRules({ isProduction: true }),

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    new HtmlWebpackPlugin({
      title: 'Code Editor',
      template: getPath('./src/index.html')
    }),

    new Dotenv(),

    new BundleAnalyzerPlugin()
  ],

  resolve: {
    extensions: extensionsToResolve,

    plugins: [
      new TsconfigPathsPlugin({
        extensions: extensionsToResolve
      })
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },

    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
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
  },

  stats: {
    children: true
  }
};

export default configuration;
