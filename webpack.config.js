const path = require('path');

module.exports = {
    // 入口文件（相对路径）
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'static/js/main.js',
        path: path.resolve(__dirname, 'dist'),
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