#!/bin/bash

echo "🚀 开始部署 AI-EDU.ASIA..."

# 1. 检查环境
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

# 2. 安装依赖
echo "📦 安装依赖..."
npm install

# 3. 生成 Prisma 客户端
echo "🔧 生成 Prisma 客户端..."
npm run db:generate

# 4. 构建项目
echo "🏗️  构建项目..."
npm run build

# 5. 测试构建
echo "✅ 测试构建..."
if [ -d ".next" ]; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败"
    exit 1
fi

echo "🎉 准备就绪！现在可以部署到 Vercel"
echo ""
echo "下一步："
echo "1. 访问 https://vercel.com"
echo "2. 导入 GitHub 仓库"
echo "3. 配置域名 ai-edu.asia"
echo ""
echo "或使用 CLI："
echo "  npm i -g vercel"
echo "  vercel --prod"
