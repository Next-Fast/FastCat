# FastCat

FastCat 开源使用Tarui v2 + react + rust 开发的桌面Among Us模组管理器  

QQ群:[837094490](https://qm.qq.com/q/xgRhQ9pzhg)  

## Dev

### 预先准备

1.安装[NodeJs](https://nodejs.org/)  

2.安装 [Yarn](https://yarnpkg.com/)  

~~~ bash
npm install -g yarn
~~~

3.安装 [Rust](https://www.rust-lang.org/tools/install)  

4.进入项目目录,打开控制台  

5.执行`yarn` 或 `yarn install` 安装依赖  

### Web UI 开发

~~~ bash
# Web 调试
yarn dev

# Web 构建
yarn build
~~~

### 桌面开发

~~~ bash
# 桌面调试
yarn tauri:dev

# 桌面构建
yarn tauri:build
~~~
