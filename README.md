# FastCat

FastCat 是使用 Tarui v2 + react + rust 开发的桌面 Among Us 模组管理器  

使用[GPLv3](/LICENSE)协议开源  

QQ群:[837094490](https://qm.qq.com/q/xgRhQ9pzhg)   

## Dev

提示:本项目包含子模块,请使用`git clone git@github.com:Next-Fast/FastCat.git --recursive`命令克隆仓库  

### 预先准备

1.安装[NodeJs](https://nodejs.org/)  

2.安装[Rust](https://www.rust-lang.org/tools/install)   

3.安装[PNPM](https://pnpm.io/installation), 使用 `npm install pnpm -g`  

4.国内请使用镜像源,使用 `pnpm config set registry https://registry.npmmirror.com`  

5.启动IDE和终端,推荐使用 [VS Code](https://code.visualstudio.com/)  

6.执行`pnpm i` 或 `pnpm install` 安装依赖  

### Web UI 开发

~~~ bash
# Web 调试
pnpm dev

# Web 构建
pnpm build
~~~

### 桌面开发

~~~ bash
# 桌面调试
pnpm tauri:dev

# 桌面构建
pnpm tauri:build
~~~

# 参考
> 新手在学习ing    

- [Clash NyanPasu](https://github.com/libnyanpasu/clash-nyanpasu)   
- [Gale](https://github.com/Kesomannen/gale)   
- [NextNapCatUI](https://github.com/bietiaop/NextNapCatWebUI)
