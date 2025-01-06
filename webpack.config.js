const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
    },

    module:{
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader']},
            { test: /\.ts$/, use: 'ts-loader' },
            {
                test: /\.glb$/,
                type: 'asset/resource',
                generator: {
                  filename: 'models/[name][ext][query]',
                },
            },
          ]
    },

    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' ,favicon:'./src/public/imgs/tag.ico'}),
        new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src/Experience/public/draco'), 
                to: path.resolve(__dirname, 'dist/draco'),
              },
            ],
          }),
    ],
};