module.exports = {
    mode: "production",
    entry: {
        a: './src/a.js',
        b: './src/b.js'
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