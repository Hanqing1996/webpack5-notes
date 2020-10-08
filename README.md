#### webpack-cli
webpack 的命令行工具

#### 编译 js
参考[这里](https://github.com/Hanqing1996/webpack-ts-demo/tree/master/summary#%E8%AE%A9-webpack-%E8%83%BD%E7%BC%96%E8%AF%91-js)

```
./node_modules/.bin/webpack
```
相当于
```
npx webpack
```

#### mode 为 production 时，webpack 会自动做 tree-shaking
[什么是 Tree-shaking](https://github.com/Hanqing1996/react-wheels/tree/master/summary#tree-shaking) 
* src/index/js
```
import pig from "./pig";
import bear from "./bear";

console.log(pig.name);
```
* dist/main.js
```
(()=>{"use strict";console.log("pig")})();
```
除此之外，入口文件中没有被用到的函数，也会在编译时被忽略


#### 啥是 Devtool
* Source map

[JavaScript Source Map 详解-阮一峰](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

> 简单说，Source map 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。
* [Devtool](https://webpack.js.org/configuration/devtool/)
> 用于控制 Source map 如何生成

#### 【面试】如何回答A和B的区别
1. A是什么，B是什么
2. A的优缺点，B的优缺点

#### build 多个入口文件
```
entry: {
    app: './src/app.js',
    home: './src/home.js'
}
```
build（./node_modules/.bin/webpack） 后
```
dist--
    |-app.js
    |-home.js
```


#### 【web性能优化】提取公共依赖
不懂下面的意思[就戳这里,9:00开始](https://xiedaimala.com/tasks/c4500d29-cc52-49fb-ae1b-af6a58baaa95/video_tutorials/46c8eed3-53f3-4b59-a85d-b6952b67887a)
```
// a.html=>a.js(lqx)
// b.html=>b.js(lqx)

// ------

// a.html=>lqx.js&a.js
// b.html=>lqx.js&b.js
```

![00kmqA.png](https://s1.ax1x.com/2020/10/08/00kmqA.png)

![00klPf.png](https://s1.ax1x.com/2020/10/08/00klPf.png)


在入口文件 a.js 和 b.js 中，引用了非入口文件 lqx.js 导出的长字符串。在不做优化的情况下，webpack5 编译后的 a.js 和 b.js 会直接含有该长字符串。

这样就会有一个问题。假如 a.html 引用了 a.js,b.html引用了 b.js。那么 b.js 要去请求下载一遍 a.js 已包含的字符串。

能不能避免这个问题呢？有一个前提要满足
-编译后的 a.js 和 b.js 中，使用的是由 lqx.js 导出的变量（即引用），即含有 import 语句
那么只有 lqx.js 被下载时要请求一次字符串资源。a.js 和 b.js 只是使用了由 lqx.js 导出的变量，不必通过网络请求字符串资源。

* 解决方法:配置 webpack.config.js 的 optimization，使 a.js 和 b.js 被优化
```
optimization: {
    splitChunks: {
        minSize: 1,  // 超过1字节的文件就要优化
        chunks(chunk){
            return !['lqx'].includes(chunk.name) // 只要文件名不是 lqx，就要优化
        },
        name:'commons' // 公共依赖文件名
    }
}
```



#### splitChunks.chunks

[官方文档](https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks)
```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      // include entry files
      chunks: 'initial'
    }
  }
};
```
* async 
只优化异步加载的文件
* all
优化所有文件


#### 如果有一个入口文件有箭头函数，如何将其转译为更低版本的 js，以兼容IE11
* 解决方法：配置 [babel-loader](https://webpack.docschina.org/loaders/babel-loader/)
```
yarn add -D babel-loader @babel/core @babel/preset-env webpack
```
```
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
```





