import path from 'path';

module.exports = {
    entry: path.join(__dirname,'src/js/main.js'),
    output: {
        filename: 'script.js',
        path: path.join(__dirname,'js/es6/') 
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};