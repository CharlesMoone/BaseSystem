# Base System

开发语言：React Koa2

项目人员：xuhf@knownsec.com

## 前提说明

```bash
git clone git@github.com:CharlesMoone/BaseSystem.git
cd BaseSystem
npm install
```


窗口1:

```bash
./node_modules/webpack/bin/webpack.js --watch
```

窗口2:

```bash
npm start
```

## 打包流程

```bash
npm run build
vim .env
(修改localhost => 0.0.0.0)
npm run server
```