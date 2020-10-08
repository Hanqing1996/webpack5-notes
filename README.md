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



