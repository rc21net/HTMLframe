const path = require('path');

module.exports = env => {
    return {
        contentBase: './dist',
        port: 3000,
        open: true,
        publicPath: '/',
        watchContentBase: true
    };
};
