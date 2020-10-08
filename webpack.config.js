module.exports = {
    mode: "production",
    entry: {
        a: './src/a.js',
        b: './src/b.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options: {
                        presets:[`@babel/preset-env`]
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            minSize: 1,
            chunks(chunk){
                return !['lqx'].includes(chunk.name)
            },
            name:'commons'
        }
    }
}