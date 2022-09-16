const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinizerPlugin = require("css-minimizer-webpack-plugin")

function getStyleLoader(pre) {
    return [
        // 执行顺序，从右到左（从下到上）
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
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
}


module.exports = {
    // 入口文件（相对路径）是运行时的相对路径，运行时还是在根目录下运行的（so不用改）
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'static/js/main.js',
        path: path.resolve(__dirname, '../dist'), // 绝对路径
        clean:true,
    },
    // 加载器
    module: {
        rules: [
            // loader的配置
            {
                test: /\.css$/, // 只检测 .css 文件
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                use: getStyleLoader("less-loader"),
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader("sass-loader"),
            },
            {
                test: /\.styl$/,
                use: getStyleLoader("stylus-loader"),
            },
        ],
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin({
            filename:'static/css/main.css'
        }),
        new CssMinizerPlugin()
    ],
    // 模式
    mode:"production",
};

