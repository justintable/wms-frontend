# WMS仓库管理系统 (MVP版本)

## 项目概述
WMS（Warehouse Management System）仓库管理系统是一个用于管理仓库日常运营的软件系统。本MVP版本提供基础的仓库管理功能，包括入库、出库、库存管理等核心功能。

## 技术栈
- 前端：Vue.js 3 + Vite + Element Plus
- 后端：Node.js + Express
- 数据库：MongoDB Atlas
- 部署：Vercel

## 核心功能模块
1. 基础数据管理
   - 商品管理
   - 仓库管理

2. 入库管理
   - 采购入库
   - 入库单管理

3. 出库管理
   - 销售出库
   - 出库单管理

4. 库存管理
   - 库存查询
   - 库存盘点

5. 系统管理
   - 用户管理
   - 角色权限

## 本地开发环境设置

### 前端开发
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 后端开发
```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 部署说明

### 前端部署
1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署

### 后端部署
1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量（MongoDB连接字符串等）
4. 部署

## 环境变量配置
```env
# 前端环境变量
VITE_API_URL=你的后端API地址

# 后端环境变量
MONGODB_URI=你的MongoDB连接字符串
JWT_SECRET=你的JWT密钥
```

## 项目结构
```
wms/
├── frontend/          # 前端项目
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # 后端项目
│   ├── src/
│   ├── config/
│   └── package.json
├── docs/             # 项目文档
└── README.md         # 项目说明
```

## 开发环境要求
- Node.js 16+
- npm 8+
- MongoDB Atlas账号
- Vercel账号

## 贡献指南
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 许可证
MIT License
