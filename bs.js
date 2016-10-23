var browserSync = require("browser-sync").create();

browserSync.init({
    files: ["src"],
    server: {
        baseDir: "src",
        routes: {
            "/bower_components": "bower_components"
        }
    }
});
