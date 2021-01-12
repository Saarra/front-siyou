const path = require('path');
const glob = require('glob');
//console.log('using custom build');
module.exports = {

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            includePaths: glob.sync('./node_modules').map((d) => path.join(__dirname, d)),
                        },
                    }
                ]
            }
        ]
    }
};