const Spriter = require('scss-sprite');

const options = {
    outputDir: "dist/images/",
    outputDirForCss: "/images/",
    inputPath: "sprites/",
    sassPath: "scss/_sprite.scss",
    svgMode: "view",
    svgLayout: "diagonal"
};

const spriter = new Spriter(options);
spriter.Run();
