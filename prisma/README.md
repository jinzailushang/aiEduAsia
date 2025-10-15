# 数据库设计文档

## 概述

本项目使用 **PostgreSQL** 数据库（通过 Supabase 托管）和 **Prisma ORM** 进行数据管理。

## 数据模型

### 核心实体

1. **User（用户）**
   - 用户基本信息
   - 角色管理（ADMIN、USER、GUEST）
   - 审计字段（创建时间、更新时间、最后登录时间）

2. **Course（课程）**
   - 课程基本信息（标题、描述、价格等）
   - 课程状态管理（DRAFT、REVIEW、PUBLISHED、ARCHIVED）
   - 统计数据（学生数、评分、浏览量等）
   - SEO 优化字段

3. **Chapter（章节）**
   - 章节内容
   - 视频 URL
   - 访问控制（免费、预览）

4. **Purchase（购买记录）**
   - 支付信息
   - Stripe 集成
   - 退款管理

5. **Progress（学习进度）**
   - 章节完成状态
   - 视频观看进度

6. **Tag（标签）**
   - 课程分类标签
   - 统计数据

7. **Review（评价）**
   - 用户评分和评论
   - 审核状态

## 数据库命令

### 1. 生成 Prisma Client

\`\`\`bash
npm run db:generate
\`\`\`

### 2. 推送 Schema 到数据库（开发环境）

\`\`\`bash
npm run db:push
\`\`\`

### 3. 创建迁移（生产环境）

\`\`\`bash
npm run db:migrate
\`\`\`

### 4. 运行种子数据

\`\`\`bash
npm run db:seed
\`\`\`

### 5. 打开 Prisma Studio（数据库 GUI）

\`\`\`bash
npm run db:studio
\`\`\`

## 环境变量配置

在 \`.env.local\` 文件中配置数据库连接：

\`\`\`env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
\`\`\`

### Supabase 配置

1. 登录 [Supabase](https://supabase.com)
2. 创建新项目
3. 在项目设置中找到数据库连接字符串
4. 复制 "Connection string" 并替换 \`DATABASE_URL\`

格式：
\`\`\`
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
\`\`\`

## 种子数据

种子数据包含：

- **3 个用户**
  - 1 个管理员（admin@ai-edu.asia）
  - 2 个普通用户

- **3 门课程**
  - Python 基础入门（初级）
  - JavaScript 进阶（中级）
  - 全栈开发实战（高级）

- **6 个标签**
  - Python、JavaScript、TypeScript、React、Next.js、全栈开发

- **2 条购买记录**
- **2 条学习进度**
- **2 条评价**

## 数据库关系图

\`\`\`
User (用户)
  ├── Purchase (购买记录) → Course (课程)
  ├── Progress (学习进度) → Chapter (章节)
  └── Review (评价) → Course (课程)

Course (课程)
  ├── Chapter (章节)
  ├── CourseTag (课程标签) → Tag (标签)
  ├── Purchase (购买记录)
  └── Review (评价)
\`\`\`

## 索引优化

为了提升查询性能，我们在以下字段上创建了索引：

- User: email, role
- Course: slug, status, level, rating, createdAt
- Chapter: courseId + order
- Purchase: userId, courseId, status, createdAt
- Progress: userId, completed
- Tag: slug
- Review: courseId + status, rating

## 数据完整性

### 级联删除

- 删除课程时，自动删除相关的章节、标签关联、评价
- 删除章节时，自动删除相关的学习进度

### 唯一约束

- User.email: 邮箱唯一
- Course.slug: 课程 slug 唯一
- Purchase: 用户 + 课程唯一（防止重复购买）
- Progress: 用户 + 章节唯一
- Review: 用户 + 课程唯一（每个用户只能评价一次）

## 使用示例

### 查询课程列表

\`\`\`typescript
import { prisma } from '@/lib/prisma'

const courses = await prisma.course.findMany({
  where: {
    published: true,
    status: 'PUBLISHED',
  },
  include: {
    tags: {
      include: {
        tag: true,
      },
    },
    _count: {
      select: {
        purchases: true,
        reviews: true,
      },
    },
  },
  orderBy: {
    createdAt: 'desc',
  },
})
\`\`\`

### 创建购买记录

\`\`\`typescript
const purchase = await prisma.purchase.create({
  data: {
    userId: 'user_id',
    courseId: 'course_id',
    amount: 99,
    stripePaymentId: 'pi_xxx',
    status: 'COMPLETED',
  },
})
\`\`\`

### 更新学习进度

\`\`\`typescript
const progress = await prisma.progress.upsert({
  where: {
    userId_chapterId: {
      userId: 'user_id',
      chapterId: 'chapter_id',
    },
  },
  update: {
    currentTime: 1200,
    completed: false,
  },
  create: {
    userId: 'user_id',
    chapterId: 'chapter_id',
    currentTime: 1200,
    completed: false,
  },
})
\`\`\`

## 性能优化建议

1. **使用 select 只查询需要的字段**
   \`\`\`typescript
   const courses = await prisma.course.findMany({
     select: {
       id: true,
       title: true,
       price: true,
     },
   })
   \`\`\`

2. **使用 include 预加载关联数据**
   \`\`\`typescript
   const course = await prisma.course.findUnique({
     where: { id: 'xxx' },
     include: {
       chapters: true,
       tags: { include: { tag: true } },
     },
   })
   \`\`\`

3. **使用事务处理复杂操作**
   \`\`\`typescript
   await prisma.$transaction([
     prisma.purchase.create({ data: purchaseData }),
     prisma.course.update({
       where: { id: courseId },
       data: { studentsCount: { increment: 1 } },
     }),
   ])
   \`\`\`

4. **使用连接池**
   - Prisma 自动管理连接池
   - 默认连接池大小：`num_physical_cpus * 2 + 1`

## 备份策略

- **Supabase 自动备份**：每日自动备份，保留 7 天（免费版）
- **手动备份**：使用 `pg_dump` 导出数据
- **迁移历史**：所有迁移文件保存在 `prisma/migrations/` 目录

## 故障排查

### 连接失败

1. 检查 \`DATABASE_URL\` 是否正确
2. 检查网络连接
3. 检查 Supabase 项目状态

### 迁移失败

1. 检查 Schema 语法
2. 查看错误日志
3. 回滚到上一个迁移：\`npx prisma migrate resolve --rolled-back [migration_name]\`

### 性能问题

1. 使用 Prisma Studio 查看数据
2. 检查查询是否使用了索引
3. 使用 \`prisma.$queryRaw\` 执行原生 SQL 查询

## 下一步

1. 配置 Supabase 数据库
2. 运行 \`npm run db:push\` 创建表
3. 运行 \`npm run db:seed\` 导入种子数据
4. 开始开发！
