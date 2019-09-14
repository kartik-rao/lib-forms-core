const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')

const ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOPMENT = ENV == 'development';
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = [
  {
    mode: 'development',
    target: "web",
    entry: {"config": "./src/config.ts"},
    module: {
      rules: [
          {
              test: /\.ts(x?)$/,
              use: { loader: 'awesome-typescript-loader',
                  options : {
                      reportFiles: [
                          'src/config.ts'
                      ],
                      compilerOptions: {
                          module: 'esnext',
                          declaration: true,
                          transpileOnly: true
                      }
                  }
              },
              exclude: /node_modules/
          }
      ]
  },
    output: {
      filename: "[name].js",
      path: __dirname + "/lib"
    },
    resolve: {
        extensions: ['.js','.tsx', '.css']
    },
    plugins: [
        new webpack.DefinePlugin({
            __API_HOST__  : JSON.stringify(ENV == 'development' ? 'dev-api.forms.li' : ENV == 'staging' ? 'dev-api.forms.li' : 'api.forms.li'),
            __ASSET_PATH__: JSON.stringify(ASSET_PATH),
            __ENV__       : JSON.stringify(ENV),
            __DEBUG__     : JSON.stringify(IS_DEVELOPMENT ? true : false),
            __VERSION__   : JSON.stringify(require("./package.json").version),
            __HOSTNAME__  : JSON.stringify(process.env.APP_HOST ? process.env.APP_HOST : "localhost")
        }),
        new CheckerPlugin()
    ],
    optimization: {
        runtimeChunk: true
    }
  }
];