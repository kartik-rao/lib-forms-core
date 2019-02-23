var path = require('path');
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
                        useCache: true,
                        reportFiles: [
                            'src/**/*.{ts,tsx}'
                        ],
                        getCustomTransformers: () => ({
                            before: [ tsImportPluginFactory( {
                                libraryName: 'antd',
                                libraryDirectory: 'node_modules',
                                style: true
                              }) ]
                        })
                    }
                },
                exclude: /\/node_modules\//
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
        "antd" : "antd"
    },
    devServer: {
        compress: true,
        hot: true,
        contentBase: [[path.join(__dirname, 'public'), path.join(__dirname, 'assets')]],
        port: 8080
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({template: 'public/template.html', inject: false}),
        new ExtractTextPlugin({filename:"style.css", allChunks: true}),
    ],
    optimization: {
        minimize: true,
        splitChunks: { chunks: "initial", name: "vendor" }
    }
};