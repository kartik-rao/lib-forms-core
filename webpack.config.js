var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV || 'development';

module.exports = {
    mode: env,
    entry: {main: path.join(__dirname, 'src/app.tsx'), style: path.join(__dirname, 'src/app.css')},
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'awesome-typescript-loader',
                    options : {
                        bail: true,
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPluginFactory( {
                                libraryDirectory: 'es',
                                style: 'css'
                              }) ]
                        }),
                        compilerOptions: {
                            module: 'esnext',
                            allowJs: true,
                            declaration: false,
                        }
                    }
                },
                exclude: /node_modules/
            },
            { test: /\.png$|\.eot$|\.woff$|\.ttf$/, loader: "url-loader?limit=100000" },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    allChunks: true, fallback: "style-loader", use: "css-loader"
                  }),
                include: /src\/app.css|node_modules\/antd\//
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
        alias: { mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js" }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Forms',
        libraryTarget: 'window'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "antd" : "antd",
        'moment': 'moment'
    },
    devServer: {
        compress: true,
        hot: true,
        contentBase: [[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]],
        port: 8080
    },
    plugins: [
        // Ignore all locale files of moment.js
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CheckerPlugin(),
        new HtmlWebpackPlugin({template: 'public/template.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true}),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};