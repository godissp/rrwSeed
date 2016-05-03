var webpack = require('webpack');
module.exports = {
    entry: {
        physicsResource:[
            "./src/resource/main.js"
        ]
    },
    output: {
        //path: '../src/main/webapp/pagesCompiled/resourceMonitor/',
        path: './dest/resourceMonitor/',
        filename: "entry/[name]_bundle.js"
    },
    module: {
        loaders: [
            {test:require.resolve('jquery'),loader: 'expose?jQuery'},//暴露jquery为全局变量的shim
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            { test: /\.css$/,exclude: /bootstrap\.min2\.css$/, loader: "style!css!" },
            {test: /\.less/,loader: 'style!css-loader!less'},
            {test: /\.(png|jpg|gif)$/, loader: 'url?limit=81920'},
            {test: /\.ejs$/, loader: 'ejs'},
            { test:  /bootstrap\.min2\.css$/, loader: "style/url!file" },//直接加载css文件
            { test: /\.json$/, loader: 'json' }
//            {test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    devtool:'source-map',
    resolve:{
        extensions:['','.js','.json']
    }
};
