module.exports = env => {
    return {
        /**
         * Загрузчик css-файлов
         * https://webpack.js.org/loaders/css-loader
         */
        loader: 'css-loader',

        /**
         * Настройки для css-файлов
         * https://webpack.js.org/loaders/css-loader#options
         */
        options: {

            /**
             * Использовать source map
             * https://webpack.js.org/loaders/css-loader#sourcemap
             */
            sourceMap: !!env.development,

            /**
             * Преобразование url
             * https://webpack.js.org/loaders/css-loader#url
             */
            url: false
        }
    };
};