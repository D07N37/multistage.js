const path = require('path');

module.exports = {
    entry: './src/core.js',
    output: {
        library: 'Multistage',
        path: path.resolve(__dirname, 'dist'),
        filename: 'multistage.min.js',
        libraryExport: 'default',
    },
    mode: 'production'
};