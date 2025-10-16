# AI 编程教育平台 (ai-edu.asia)

一个 AI 驱动的编程教育平台，采用 Serverless 架构，实现极简、高性能、低成本、极致体验。

## 技术栈

- **前端框架**: Next.js 14+ (App Router)
- **UI 框架**: React 18+
- **类型系统**: TypeScript 5+
- **样式方案**: Tailwind CSS 4+
- **数据库**: Supabase (PostgreSQL) + Prisma ORM
- **认证**: Supabase Auth
- **支付**: Stripe
- **存储**: Cloudflare R2
- **部署**: Vercel
- **分析**: Google Analytics 4 + 百度统计

## 开发

### 环境要求

- Node.js 18.18.0+
- npm 8.5.0+

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 环境变量

复制 \`.env.example\` 到 \`.env.local\` 并填写相应的值：

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 运行开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 代码质量检查

\`\`\`bash
# ESLint 检查
npm run lint

# ESLint 自动修复
npm run lint:fix

# TypeScript 类型检查
npm run type-check

# Prettier 格式化
npm run format

# Prettier 检查
npm run format:check
\`\`\`

### 构建生产版本

\`\`\`bash
npm run build
\`\`\`

### 运行生产版本

\`\`\`bash
npm run start
\`\`\`

## 项目结构

\`\`\`
ai-edu-asia/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # 营销页面
│   ├── (course)/          # 课程页面
│   ├── (learning)/        # 学习页面
│   ├── (dashboard)/       # 用户中心
│   ├── (admin)/           # 管理后台
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── ui/               # 基础 UI 组件
│   ├── features/         # 功能组件
│   └── layout/           # 布局组件
├── lib/                  # 业务逻辑
│   ├── services/         # 服务层
│   ├── repositories/     # 数据访问层
│   ├── utils/            # 工具函数
│   ├── hooks/            # 自定义 Hooks
│   └── types/            # TypeScript 类型
├── config/               # 配置文件
├── prisma/               # Prisma Schema
└── public/               # 静态资源
\`\`\`

## 核心设计原则

1. **极简架构**: 单一技术栈，最小化依赖
2. **极高质量**: Clean Code，80%+ 测试覆盖率
3. **极低成本**: 月度成本 < $15
4. **极致体验**: LCP < 1.2s，PageSpeed 95+

## 部署

项目使用 Vercel 自动部署：

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

## 文档


## License

MIT
