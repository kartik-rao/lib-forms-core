var path = require('path');
const env = process.env.NODE_ENV;

module.exports = {
    mode: env,
    entry: {main: path.join(__dirname, 'src/index.ts')},
    target: 'web',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: { loader: 'awesome-typescript-loader' },
                exclude: /\/node_modules\//
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.css'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    devServer: {
        compress: true,
        contentBase: path.join(__dirname, "dist/"),
        port: 8080
    },
    optimization: {
        minimize: true
    }
};