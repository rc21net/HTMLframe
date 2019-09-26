const path = require('path');
const entry = require('../entries/webpack.entry-js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
    return {
        /**
         * Режим сборки
         * https://webpack.js.org/concepts/#mode
         */
        mode: env.development ? 'development' : 'production',

        /**
         * Настройка генерации source map
         * https://webpack.js.org/configuration/devtool
         */
        devtool: !!env.development && 'source-map',

        /**
         * Список бандлов, с указанием что в них входит.
         * Вынесено в отдельный файл webpack.entry-{...}.js,
         * при желании его также можно разбить на несколько.
         * https://webpack.js.org/configuration/entry-context#entry
         */
        entry: entry,

        /**
         * Настройки записи скомпилированных файлов
         * https://webpack.js.org/concepts/output
         */
        output: {
            /**
             * Путь до директории с скомпилированными файлами
             * https://webpack.js.org/configuration/output#outputpath
             * (относительно директории с конфигом webpack)
             */
            path: path.join(__dirname, '../../dist'),

            /**
             * Путь до директории с скомпилированными файлами,
             * который будет использоваться для расчета путей в исходниках
             * (например, для картинок)
             * https://webpack.js.org/configuration/output#outputpublicpath
             */
            publicPath: path.join(__dirname, '/'),

            /**
             * Маска для имен скомпилированных файлов
             * https://webpack.js.org/configuration/output#outputfilename
             */
            filename: '[name].js'
        },

        module: {
            rules: [
                /**
                 * https://webpack.js.org/loaders/babel-loader/
                 */
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },

                /**
                 * https://stackoverflow.com/questions/48579518/how-to-import-jquery-in-webpack?rq=1
                 */
                {
                    test: /jquery\.min\.js$/,
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                }
            ],
        },

        /**
         * Внешние библиотеки, которые webpack'у не стоит пытаться включить в бандл
         * https://webpack.js.org/configuration/externals
         */
        externals: {
            $: 'jQuery',
            jquery: 'jQuery'
        },

        optimization: {
            minimizer: [new UglifyJsPlugin(
                {
                    /**
                     * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#sourcemap
                     */
                    sourceMap: !!env.development,

                    /**
                     * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#cache
                     */
                    //cache: true,

                    /**
                     * https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#parallel
                     */
                    parallel: true,

                    /**
                     * https://github.com/mishoo/UglifyJS2#minify-options
                     */
                    uglifyOptions: {
                        output: {
                            comments: false
                        }
                    }
                }
            )]
        }
    };
};
