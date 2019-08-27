var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDevelopment = env == 'development';

module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, 'src/app.tsx'),
        style: path.join(__dirname, 'src/app.css')
    },
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
                test: /src\/app\.css$|node_modules\/antd\/*\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: process.env.NODE_ENV === 'development',
                      }
                    },
                    'css-loader',
                  ]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
        alias: { mobx: __dirname + "/node_modules/mobx/lib/mobx.es6.js" }
    },
    output: {
        filename: '[name].bundle.js', /* Independent Entry Bundle */
        chunkFilename: '[name].chunk.js', /* Code splitting generated bundles */
        path: path.join(__dirname, 'dist')
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // "antd" : "antd",
        'moment': 'moment'
    },
    serve: {
        compress: true,
        hot: true,
        contentBase: [[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]],
        port: 8080
    },
    plugins: [
        // Ignore all locale files of moment.js
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CheckerPlugin(),
        new MiniCssExtractPlugin({
            filename:"main.css",
            filename: '[name].css',
            chunkFilename: '[name].[id].chunk.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'public/template.html',
            filename: "index.html"
        })
        , new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    // import file path containing node_modules
                    test: /node_modules/
                }
            }
        }
    }
};

