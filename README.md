# Operation System - 新运营系统

开发语言：React Koa2

项目人员：xuhf@knownsec.com

## 前提说明

db: 10.0.8.184:27000

```bash
git clone https://gitlab.intra.knownsec.com/xuhf/OperationSystem.git
cd OperationSystem
npm install
```

新增 .env 文件

```
HOST_IP=localhost
HOST_PORT=12580
DB_HOST=10.0.8.184
DB_PORT=27000
DB_SOURCE=operation
AUTH_SOURCE=admin
NODE_ENV=production
```

新增 ./server/utils/secret.js

```javascript
export const secret = 'xuhf@knownSec.CoM';
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

## 管理模块

- [x] 用户列表 (done 2018.03.07)
- [x] 控制用户是否可以登录、调整用户角色 (done 2018.03.07)
- [x] 新增用户 (done 2018.03.12)
- [x] 编辑用户 (done 2018.03.12)
- [x] 重置密码 (done 2018.03.13)
- [x] 删除用户 (done 2018.03.14)
- [x] 角色列表 (done 2018.03.09)
- [x] 新增角色 (done 2018.03.09)
- [x] 编辑角色 (done 2018.03.09)
- [ ] 模块列表
- [ ] 新增模块
- [ ] 编辑模块
- [ ] 删除模块

## 其他更新

- [x] 重构导航栏模块 (done 2018.03.14)
- [x] 重构按需加载 (done 2018.04.02) 现在按需加载按照二级菜单进行加载
- [x] 重构管理模块 (done 2018.03.14)
- [x] 重构权限管理 (done 2018.03.30)
- [x] 重构身份认证 (done 2018.03.30)