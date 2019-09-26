class MiniCssExtractPluginCleanup {
    apply(compiler) {
        compiler.hooks.emit.tapAsync("MiniCssExtractPluginCleanup", (compilation, callback) => {
            Object.keys(compilation.assets)
                .filter(asset => {
                    return new RegExp(/.*\.js(\.map)?$/).test(asset);
                })
                .forEach(asset => {
                    delete compilation.assets[asset];
                });

            callback();
        });
    }
}

module.exports = MiniCssExtractPluginCleanup;
