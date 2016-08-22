var connect = require('connect'),
    serveStatic = require('serve-static'),
    gulp = require('gulp'),
    args = process.argv.slice(2);

connect().use(serveStatic(__dirname+'/dist')).listen(3000,function(){console.log('Up on port 3000');});
