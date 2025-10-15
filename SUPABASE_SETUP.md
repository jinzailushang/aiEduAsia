# Supabase 认证系统配置指南

## 概述

本项目使用 Supabase 作为认证和数据库服务。按照以下步骤配置 Supabase 以启用完整的认证功能。

## 步骤 1：创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 使用 GitHub 账号登录
4. 点击 "New project"
5. 填写项目信息：
   - **Name**: `ai-edu-asia`
   - **Database Password**: 设置一个强密码（记住它！）
   - **Region**: 选择 `Singapore` 或 `Hong Kong`（离中国近）
   - **Pricing Plan**: 选择 `Free`
6. 点击 "Create new project"（等待 1-2 分钟）

## 步骤 2：获取 API 密钥

1. 项目创建完成后，进入项目仪表板
2. 点击左侧菜单的 "Project Settings"（齿轮图标）
3. 点击 "API"
4. 复制以下信息：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJ...` (很长的字符串)
   - **service_role key**: `eyJ...` (很长的字符串，保密！)

## 步骤 3：配置环境变量

1. 打开 `ai-edu-asia/.env.local` 文件
2. 取消注释并更新 Supabase 配置：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## 步骤 4：配置数据库连接

更新数据库连接字符串：

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.your-project.supabase.co:5432/postgres"
```

## 步骤 5：配置认证设置

1. 在 Supabase 仪表板中，点击左侧菜单的 "Authentication"
2. 点击 "Settings"
3. 配置以下设置：

### Site URL
- **Site URL**: `http://localhost:3000` (开发环境)
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `https://your-domain.com/auth/callback` (生产环境)

### Email Templates
可以自定义邮件模板，包括：
- 确认注册邮件
- 魔法链接邮件
- 密码重置邮件

### OAuth Providers
如果要启用 OAuth 登录，需要配置：

#### Google OAuth
1. 点击 "Google" 提供商
2. 启用 Google 登录
3. 输入 Google OAuth 客户端 ID 和密钥
4. 设置重定向 URL: `https://your-project.supabase.co/auth/v1/callback`

#### GitHub OAuth
1. 点击 "GitHub" 提供商
2. 启用 GitHub 登录
3. 输入 GitHub OAuth App 客户端 ID 和密钥
4. 设置重定向 URL: `https://your-project.supabase.co/auth/v1/callback`

## 步骤 6：设置数据库 Schema

1. 在 Supabase 仪表板中，点击左侧菜单的 "SQL Editor"
2. 运行以下 SQL 来创建用户配置文件表：

```sql
-- 创建用户配置文件表
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'USER',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- 启用 RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能查看和更新自己的配置文件
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 创建函数：当新用户注册时自动创建配置文件
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 步骤 7：推送数据库 Schema

在项目根目录运行：

```bash
npm run db:push
npm run db:seed
```

## 步骤 8：安装依赖并启动项目

```bash
npm install --legacy-peer-deps
npm run dev
```

## 步骤 9：测试认证功能

1. 访问 [http://localhost:3000](http://localhost:3000)
2. 点击 "登录" 或 "开始学习" 按钮
3. 测试以下功能：
   - 邮箱注册
   - 邮箱登录
   - 魔法链接登录
   - OAuth 登录（如果配置了）

## 故障排除

### 常见问题

#### 1. "Supabase 未配置" 错误
- 检查 `.env.local` 文件中的 Supabase 环境变量是否正确设置
- 确保重启了开发服务器

#### 2. OAuth 登录失败
- 检查 OAuth 提供商的配置
- 确保重定向 URL 正确设置
- 检查客户端 ID 和密钥是否正确

#### 3. 邮件发送失败
- 检查 Supabase 项目的邮件配置
- 确保邮箱地址有效
- 检查垃圾邮件文件夹

#### 4. 数据库连接失败
- 检查数据库连接字符串是否正确
- 确保数据库密码正确
- 检查网络连接

### 获取帮助

如果遇到问题，可以：
1. 查看 Supabase 官方文档：[https://supabase.com/docs](https://supabase.com/docs)
2. 查看项目的 GitHub Issues
3. 联系开发团队

## 生产环境配置

在部署到生产环境时，需要：

1. 更新 Site URL 为生产域名
2. 添加生产环境的重定向 URL
3. 配置自定义 SMTP（可选）
4. 启用额外的安全设置
5. 配置备份策略

## 安全最佳实践

1. **永远不要**在客户端代码中暴露 `service_role` 密钥
2. 使用 Row Level Security (RLS) 保护数据
3. 定期轮换 API 密钥
4. 启用多因素认证（MFA）
5. 监控异常登录活动
6. 使用 HTTPS（生产环境必须）

---

配置完成后，你的应用将拥有完整的认证功能，包括注册、登录、OAuth、魔法链接等。