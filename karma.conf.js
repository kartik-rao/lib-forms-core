// Karma configuration
// Generated on Mon Feb 12 2018 13:30:49 GMT+1100 (AEDT)
var path = require('path');
require('jasmine-core').DEFAULT_TIMEOUT_INTERVAL = 2000;
const tsImportPluginFactory = require('ts-import-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
var webpack = require('webpack');

module.exports = function (config) {
  config.set({    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-webpack',  'karma-mocha-reporter', 'karma-chrome-launcher', 'karma-sourcemap-loader', 'karma-coverage-istanbul-reporter'],
    // list of files / patterns to load in the browser
    autoWatch: true,
    files: [
        { pattern: "test/index.ts", watched: false, served: true, included: true }
    ],
    // list of files / patterns to exclude
    exclude: [
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.ts': ['webpack', 'sourcemap']
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // Manually add 'coverage-istanbul' for coverage,
    // otherwise we get duplicate console.log output
    reporters: ['mocha'],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    client: {
      captureConsole: true
    },
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    browserConsoleLogOptions: {
      level:  "warn"
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true,
      debug: false
    },
    useIframe: false,
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage'),
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      }
    },
    webpack: {
      mode: 'development',
      output: {
        pathinfo: false
      },
      entry: path.join(__dirname, '/test/index.ts'),
      resolve: {
        modules: [
          'node_modules'
        ],
        extensions: ['.ts', '.tsx', '.js']
      },
      devtool: 'source-map',
      module: {
        rules: [
            { test: /(\.woff|\.woff2)$/, loader: 'url?name=font/[name].[ext]&limit=10240&mimetype=application/font-woff' },
            { test: /\.ttf$|\.eot$|\.css$|\.png$|\.ico$|\.jpg$/, loader: 'ignore-loader' },
            {
                test: /\.tsx?$/,
                use: { loader: 'awesome-typescript-loader',
                options : {
                    useCache: true,
                    transpileOnly: true,
                    declaration: true,
                    reportFiles: [
                      'src/**/*.ts?'
                    ],
                    getCustomTransformers: () => ({
                      before: [ tsImportPluginFactory( {
                          libraryDirectory: 'es',
                          style: 'css'
                        }) ]
                    }),
                }
              },
              exclude: /node_modules/
            },
            {
              test: /\.ts$/,
              exclude: /(node_modules|spec\.*\.ts$)/,
              loader: 'istanbul-instrumenter-loader',
              enforce: 'post',
              options: {
                esModules: true
              }
            }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
        __API_HOST__  : JSON.stringify('dev-api.forms.li'),
        __ASSET_PATH__: JSON.stringify("/"),
        __ENV__       : JSON.stringify("development"),
        __DEBUG__     : JSON.stringify(true),
        __VERSION__   : JSON.stringify(require("./package.json").version),
        __HOSTNAME__  : JSON.stringify("localhost"),
        })
        , new HardSourceWebpackPlugin()
      ]
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    }
  })
}