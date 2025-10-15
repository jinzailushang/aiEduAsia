# 🚀 快速开始指南

## 最快的方式：使用 Supabase（5 分钟）

### 1️⃣ 创建 Supabase 账号和项目（2 分钟）

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project" → 使用 GitHub 登录
3. 点击 "New project"
4. 填写：
   - Name: `ai-edu-asia`
   - Password: 设置密码（记住它！）
   - Region: `Singapore`
   - Plan: `Free`
5. 点击 "Create new project"（等待 1-2 分钟）

### 2️⃣ 获取数据库连接（1 分钟）

1. 项目创建完成后，点击左侧 "Project Settings"（齿轮图标）
2. 点击 "Database"
3. 找到 "Connection string" → 选择 "URI"
4. 复制连接字符串

### 3️⃣ 配置环境变量（1 分钟）

打开 \`ai-edu-asia/.env.local\`，更新：

\`\`\`env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"
\`\`\`

将 \`YOUR_PASSWORD\` 替换为你在步骤 1 中设置的密码。

### 4️⃣ 初始化数据库（1 分钟）

在终端运行：

\`\`\`bash
cd ai-edu-asia

# 推送数据库 Schema
npm run db:push

# 导入种子数据（3 门课程 + 测试数据）
npm run db:seed
\`\`\`

### 5️⃣ 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 🎉

---

## 验证配置

### 查看数据库

\`\`\`bash
npm run db:studio
\`\`\`

应该看到：
- ✅ 3 个用户
- ✅ 3 门课程（Python、JavaScript、全栈开发）
- ✅ 6 个标签
- ✅ 2 条购买记录
- ✅ 2 条学习进度
- ✅ 2 条评价

### 检查类型

\`\`\`bash
npm run type-check
\`\`\`

应该显示：无错误 ✅

---

## 故障排查

### 问题 1：连接失败

**错误信息**: "Can't reach database server"

**解决方案**:
1. 检查 Supabase 项目是否正在运行
2. 检查 \`DATABASE_URL\` 是否正确
3. 检查密码是否正确（注意特殊字符需要 URL 编码）

### 问题 2：密码包含特殊字符

如果密码包含特殊字符（如 @、#、$），需要 URL 编码：

\`\`\`
@ → %40
# → %23
$ → %24
\`\`\`

例如：密码 \`pass@123\` → \`pass%40123\`

### 问题 3：Docker 未安装

如果你没有 Docker，直接使用 Supabase（推荐）或安装 PostgreSQL。

---

## 下一步

数据库配置完成后，你可以：

1. ✅ 查看首页：[http://localhost:3000](http://localhost:3000)
2. ✅ 查看数据库：\`npm run db:studio\`
3. ✅ 继续开发：执行任务 3（认证系统）

---

## 需要帮助？

如果遇到问题，请告诉我：
1. 错误信息是什么？
2. 你使用的是哪种配置方式？
3. 你的操作系统是什么？

我会帮你解决！
