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