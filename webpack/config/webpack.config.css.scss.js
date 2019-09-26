module.exports = env => {
    return {
        /**
         * Загрузчик scss-файлов
         * https://webpack.js.org/loaders/sass-loader
         */
        loader: 'sass-loader',

        /**
         * Настройки для scss-файлов
         * https://github.com/sass/node-sass/blob/master/README.md#options
         */
        options: {

            /**
             * Использовать source map
             * https://github.com/sass/node-sass/blob/master/README.md#sourcemap
             */
            sourceMap: !!env.development,

            /**
             * Формат выходных файлов
             * https://github.com/sass/node-sass/blob/master/README.md#outputstyle
             */
            outputStyle: 'compressed'
        }
    };
};