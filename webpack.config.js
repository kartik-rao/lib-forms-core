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
const isLocalServer = process.argv[1].indexOf('dev-server') > -1;
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    mode: env,
    entry: {
        main: path.join(__dirname, isLocalServer ? 'src/app-local.tsx' :'src/app.tsx')
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
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'node_modules/antd')
                ],
                use: [{loader: MiniCssExtractPlugin.loader},
                    'css-loader'
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
        path: path.join(__dirname, 'dist'),
        library: 'Forms',
        publicPath: isLocalServer ? '/' : ASSET_PATH
    },
    watchOptions: {
        ignored: ['node_modules', 'dist', 'lib']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "antd" : "antd",
        'moment': 'moment'
    },
    devServer: {
        inline : true,
        compress: true,
        hot: true,
        port: 8080
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            __API_HOST__  : JSON.stringify(env == 'development' ? 'dev-api.forms.li' : env == 'staging' ? 'dev-api.forms.li' : 'api.forms.li'),
            __ASSET_PATH__: JSON.stringify(ASSET_PATH),
            __ENV__       : JSON.stringify(env),
            __DEBUG__     : JSON.stringify(isDevelopment ? true : false),
            __VERSION__   : JSON.stringify(require("./package.json").version),
            __HOSTNAME__  : JSON.stringify(process.env.APP_HOST ? process.env.APP_HOST : "localhost")
        }),
        new CheckerPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[id].chunk.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'public/template.html',
            filename: "index.html"
        })
        // , new BundleAnalyzerPlugin()
    ],
    optimization: {
        runtimeChunk: isDevelopment,
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
                    test: /node_modules/,
                    priority: 20
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
};

