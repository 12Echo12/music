const path = require('path');
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getStyleLoaders = (pre) => {
    return [
        "style-loader",
        "css-loader",
        {
            loader: 'post-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env",  // 能解决大多数样式兼容性问题
                    ],
                },
            },
        },
        pre,
    ].filter(Boolean);
};

module.exports = {
    // 入口文件（相对路径）是运行时的相对路径，运行时还是在根目录下运行的（so不用改）
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'static/js/[name].js',
        // path: undefined, // 生产模式下没有输出，so可以不写路径
        clean: true,
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename:"static/media/[hash:10][ext][query]", 
    },
    // 加载器
    module: {
        rules: [
            // 处理 css
            {
                test: /\.css$/,
                use: getStyleLoaders(),
            },
            {
                test: /\.less$/,
                use: getStyleLoaders("less-loader")
            },
            {
                test: /\.s|ac|ss$/,
                use: getStyleLoaders("sass-loader")
            },
            {
                test: /\.styl$/,
                use: getStyleLoaders("stylus-loader")
            },
            // 处理图片
            {
                test: /\.(jpe?g|png|gif|webp|svg)/,
                type: "asset",   // 用 webpack 内置的“asset”处理   
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,  // 小于 10kb 转 base64
                    }
                }
            },
            // 处理其他资源
            {
                test: /\.(woff2?|ttf)/,
                type: "asset/resource",  // "asset/resource" 不会转 base64
            },
            // 处理 js eslint(plugin)
            {
                test: /.\jsx?$/,
                include: path.resolve(__dirname, "../src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    // 给 js 设置自动热更新（激活 js 的HMR功能！！！）
                    plugins:["react-refresh/babel"]
                }
            }
        ],
    },
    // 插件
    plugins: [
        // 还要单独写一个 eslint 文件 ，写 eslint 要干什么
        new EslintWebpackPlugin({
            // 要处理的文件
            context: path.resolve(__dirname, '../src'),
            exclude: "node_modules",
            cache: true,
            cacheLocation:path.resolve(__dirname,"../node_modules/.cache/.eslintcache"),
        }),
        new HtmlWebpackPlugin({
            // 要处理的文件
            template:path.resolve(__dirname,"../public/index.html"),
        }),
        // 给 js 设置自动热更新（激活 js 的HMR功能！！！）
        new ReactRefreshWebpackPlugin(),

    ],
    // 模式
    mode: "development",
    // 调试
    devtool: "cheap-module-source-map",
    // 打包不打包到一个文件中，进行代码分割！！
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        // 防止代码分割产生缓存失效
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}.js`,
        },
    },
    // webpack 解析模块加载选项
    resolve: {
        // 自动补全文件扩展名
        extensions:[".jsx",".js",".json"],
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,// 解决前端路由刷新 404 问题
    }
};