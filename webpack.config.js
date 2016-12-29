var webpack = require('webpack');
module.exports = {
    entry: [
    //   'webpack/hot/only-dev-server',
      "./src/table/app.js"
    ],
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot','babel-loader?presets[]=react,presets[]=es2015'] },
            { test: /\.css$/, loader: 'style!css'}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    plugins: [
    //   new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};