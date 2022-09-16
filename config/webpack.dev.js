const path = require('path');

module.exports = {
    // 入口文件（相对路径）是运行时的相对路径，运行时还是在根目录下运行的（so不用改）
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'static/js/main.js',
        path: undefined, // 生产模式下没有输出，so可以不写路径
        clean:true,
    },
    // 加载器
    module: {
        rules: [
            
        ],
    },
    // 插件
    plugins: {
        
    },
    // 模式
    mode:"development",
};