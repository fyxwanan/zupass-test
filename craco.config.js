const path = require("path");
const { CracoAliasPlugin } = require("react-app-rewire-alias");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require("webpack");


module.exports = {
    // webpack 配置
    webpack: {
        entry: './src/index.ts', // 注意这里原来是 './src/index.js'，需要改成 ts 结尾！
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.ProvidePlugin({
                process: 'process/browser.js'
            })
        ],
        resolve: {
            alias: {
                process: require.resolve("process/browser.js")
            },
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                "process": require.resolve("process/browser.js"),
                "buffer": require.resolve("buffer/")
            }
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        // devServer: (devServerConfig) => {
        //     devServerConfig.port = 6000;  // 设置端口号
        //     return devServerConfig;
        // }
    },
    // 配置别名
    plugins: [
        // 配置内容
    ],
};