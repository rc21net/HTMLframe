const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MiniCssExtractPluginCleanup = require('../plugins/mini-css-extract-plugin-cleanup');
const entry = require('../entries/webpack.entry-css');
const scssDevConfig = require('./webpack.config.css.scss');
const postcssDevConfig = require('./webpack.config.css.postcss');
const cssLoaderDevConfig = require('./webpack.config.css.css-loader');
const devServer = require('./webpack.config.dev-server');

module.exports = env => {
    return {
        // TODO: попробовать https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
        // https://github.com/NMFR/optimize-css-assets-webpack-plugin
        //optimization: {
        //    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        //},

        /**
         * Режим сборки
         * https://webpack.js.org/concepts/mode
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
            publicPath: path.join(__dirname, '/')
        },

        /**
         * Настройки модулей
         * https://webpack.js.org/configuration/module
         */
        module: {

            /**
             * Правил для модулей
             * https://webpack.js.org/configuration/module#modulerules
             */
            rules: [
                {
                    /**
                     * Маска обрабатываемых файлов
                     * https://webpack.js.org/configuration/module#ruletest
                     */
                    test: /\.scss$/,

                    use: [
                        /**
                         * https://github.com/webpack-contrib/mini-css-extract-plugin
                         */
                        MiniCssExtractPlugin.loader,

                        cssLoaderDevConfig(env),

                        postcssDevConfig(env),

                        scssDevConfig(env)
                    ]
                },

                {
                    /**
                     * Маска обрабатываемых файлов
                     * https://webpack.js.org/configuration/module#ruletest
                     */
                    test: /\.css$/,

                    use: [
                        /**
                         * https://github.com/webpack-contrib/mini-css-extract-plugin
                         */
                        MiniCssExtractPlugin.loader,

                        cssLoaderDevConfig(env),

                        postcssDevConfig(env)
                    ]
                },
            ]
        },

        /**
         * Используемые плагины
         */
        plugins: [
            /**
             * Удаляем js и js.map, которые MiniCssExtractPlugin генерирует вместе с css
             */
            new MiniCssExtractPluginCleanup(),

            // https://github.com/webpack-contrib/mini-css-extract-plugin
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],

        devServer: devServer(env)
    };
};
