module.exports = env => {
    return {
        /**
         * Postcss + cssnano
         * https://github.com/postcss/postcss-loader
         * https://webpack.js.org/loaders/postcss-loader
         */
        loader: 'postcss-loader',

        options: {
            sourceMap: !!env.development,
            plugins: [
                require('cssnano')({
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                })
            ],
        }
    };
};
