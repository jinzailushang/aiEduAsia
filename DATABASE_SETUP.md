# 数据库配置指南

## 方式 1：使用 Supabase（推荐，免费）

### 步骤 1：创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 账号登录
4. 点击 "New project"
5. 填写项目信息：
   - Name: `ai-edu-asia`
   - Database Password: 设置一个强密码（记住它！）
   - Region: 选择 `Singapore` 或 `Hong Kong`（离中国近）
   - Pricing Plan: 选择 `Free`
6. 点击 "Create new project"（等待 1-2 分钟）

### 步骤 2：获取数据库连接字符串

1. 项目创建完成后，点击左侧菜单的 "Project Settings"（齿轮图标）
2. 点击 "Database"
3. 找到 "Connection string" 部分
4. 选择 "URI" 标签
5. 复制连接字符串，格式类似：
   \`\`\`
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   \`\`\`
6. 将 `[YOUR-PASSWORD]` 替换为你在步骤 1 中设置的密码

### 步骤 3：配置环境变量

1. 打开 \`ai-edu-asia/.env.local\` 文件
2. 更新 \`DATABASE_URL\`：
   \`\`\`env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres"
   \`\`\`

### 步骤 4：推送数据库 Schema

在终端运行：

\`\`\`bash
cd ai-edu-asia
npm run db:push
\`\`\`

### 步骤 5：导入种子数据

\`\`\`bash
npm run db:seed
\`\`\`

### 步骤 6：查看数据

\`\`\`bash
npm run db:studio
\`\`\`

或者在 Supabase 控制台：
1. 点击左侧菜单的 "Table Editor"
2. 查看所有表和数据

---

## 方式 2：使用 Docker（本地开发）

### 前提条件

安装 Docker Desktop：
- macOS: [https://docs.docker.com/desktop/install/mac-install/](https://docs.docker.com/desktop/install/mac-install/)
- Windows: [https://docs.docker.com/desktop/install/windows-install/](https://docs.docker.com/desktop/install/windows-install/)

### 步骤 1：启动 PostgreSQL

\`\`\`bash
cd ai-edu-asia
docker compose up -d
\`\`\`

### 步骤 2：验证数据库运行

\`\`\`bash
docker compose ps
\`\`\`

应该看到：
\`\`\`
NAME                IMAGE                COMMAND                  SERVICE    CREATED         STATUS         PORTS
ai-edu-postgres     postgres:15-alpine   "docker-entrypoint.s…"   postgres   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp
\`\`\`

### 步骤 3：推送数据库 Schema

\`\`\`bash
npm run db:push
\`\`\`

### 步骤 4：导入种子数据

\`\`\`bash
npm run db:seed
\`\`\`

### 步骤 5：查看数据

\`\`\`bash
npm run db:studio
\`\`\`

### 停止数据库

\`\`\`bash
docker compose down
\`\`\`

### 删除数据库（重新开始）

\`\`\`bash
docker compose down -v
\`\`\`

---

## 方式 3：使用本地 PostgreSQL

### 前提条件

安装 PostgreSQL：
- macOS: \`brew install postgresql@15\`
- Windows: [https://www.postgresql.org/download/windows/](https://www.postgresql.org/download/windows/)

### 步骤 1：启动 PostgreSQL

\`\`\`bash
# macOS
brew services start postgresql@15

# 或手动启动
pg_ctl -D /usr/local/var/postgres start
\`\`\`

### 步骤 2：创建数据库

\`\`\`bash
createdb ai_edu_asia
\`\`\`

### 步骤 3：配置环境变量

\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ai_edu_asia?schema=public"
\`\`\`

### 步骤 4：推送 Schema 和种子数据

\`\`\`bash
npm run db:push
npm run db:seed
\`\`\`

---

## 验证配置

运行以下命令验证数据库配置是否成功：

\`\`\`bash
# 查看数据库表
npm run db:studio
\`\`\`

应该看到以下表：
- users
- courses
- chapters
- purchases
- progress
- tags
- course_tags
- reviews

---

## 常见问题

### Q: 连接失败 "Connection refused"

**A:** 检查数据库是否正在运行：
- Supabase: 检查项目状态
- Docker: 运行 \`docker compose ps\`
- 本地: 运行 \`pg_isready\`

### Q: 密码错误

**A:** 检查 \`.env.local\` 中的密码是否正确

### Q: 端口被占用

**A:** 修改 \`docker-compose.yml\` 中的端口：
\`\`\`yaml
ports:
  - '5433:5432'  # 使用 5433 而不是 5432
\`\`\`

然后更新 \`DATABASE_URL\`:
\`\`\`env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/ai_edu_asia?schema=public"
\`\`\`

### Q: 种子数据导入失败

**A:** 先清空数据库：
\`\`\`bash
npx prisma migrate reset
\`\`\`

---

## 推荐配置

**开发环境**: Docker 或本地 PostgreSQL
**生产环境**: Supabase

---

## 下一步

配置完成后，运行：

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看网站！
