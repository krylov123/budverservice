var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var inProduction = (process.env.NODE_ENV === 'production');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        '/dist/app': [
            //'react-datepicker/dist/react-datepicker.css',
            //path.resolve(__dirname, "./resources/assets/sass/prepodavateli_plugin/index.scss"),
            path.resolve(__dirname, "./resources/jsx/index.jsx"),
            'react-dom',
            'react'
        ]
    },
    output: {
        path: path.resolve(__dirname, './public/'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {url: false, filename: '[name].[hash].[ext]'}
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {url: false, filename: '[name].[hash].[ext]'}
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.png|je?pg|gif|svg|eot|ttf|woff|woff2$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]'
                }
            },
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, './node_modules'),
                loader: "babel-loader"
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, 'public'),
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin('[name].[hash].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        //Кастомный плагин, генерит manifest.js
        function () {
            this.plugin('done', stats => {
                require('fs').writeFileSync(
                    path.join(__dirname, 'public/manifest.json'),
                    (function(manifestJson){
                        console.log(manifestJson);
                        //Берем данные из webpack stats и расшиваем все объекты на отдельные записи, добавляя расширения
                        var outputJson = {};
                        for (var key in manifestJson) {
                            if (manifestJson.hasOwnProperty(key)) {
                                if(manifestJson[key] instanceof Array){
                                    for (var i = 0; i < manifestJson[key].length; i++) {
                                        if(/.jsx?$/i.test(manifestJson[key][i])){
                                            outputJson[key+'.js'] = manifestJson[key][i];
                                        }
                                        if(/.css$/i.test(manifestJson[key][i])) outputJson[key+'.css'] = manifestJson[key][i];
                                    }
                                }else{
                                    if(/.jsx?$/i.test(manifestJson[key])){
                                        outputJson[key+'.js'] = manifestJson[key];
                                    }
                                    if(/.css$/i.test(manifestJson[key])) outputJson[key+'.css'] = manifestJson[key];
                                }
                            }
                        }
                        return JSON.stringify(outputJson);
                    })(stats.toJson().assetsByChunkName)

                )
            });
        }
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
};


if (inProduction === 'production') {
    module.exports.optimization.minimize = true
}