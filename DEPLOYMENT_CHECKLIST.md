# 🚀 部署检查清单

## 部署前准备

- [ ] 代码已提交到 GitHub
- [ ] 所有测试通过
- [ ] 环境变量已配置
- [ ] 数据库已设置
- [ ] 构建成功（运行 `npm run build`）

## Vercel 部署

- [ ] 注册 Vercel 账号
- [ ] 连接 GitHub 仓库
- [ ] 配置项目设置
- [ ] 添加环境变量
- [ ] 首次部署成功

## 域名配置

- [ ] 在 Vercel 添加域名 `ai-edu.asia`
- [ ] 在 Vercel 添加域名 `www.ai-edu.asia`
- [ ] 在域名注册商配置 DNS
- [ ] 等待 DNS 生效（24-48小时）
- [ ] 验证 HTTPS 证书

## 数据库配置（可选）

- [ ] 创建 Supabase 项目
- [ ] 获取数据库连接字符串
- [ ] 在 Vercel 添加 DATABASE_URL
- [ ] 运行 `npx prisma db push`
- [ ] 运行 `npx prisma db seed`

## 上线后检查

- [ ] 访问 https://ai-edu.asia
- [ ] 检查所有页面正常
- [ ] 检查所有链接工作
- [ ] 检查移动端显示
- [ ] 检查加载速度
- [ ] 设置监控（Vercel Analytics）

## 成本确认

- [ ] Vercel：$0/月 ✅
- [ ] Supabase：$0/月 ✅
- [ ] 域名：$15/年 ✅
- [ ] **总计：$1.25/月**

## 备份方案

- [ ] 定期备份数据库
- [ ] 代码推送到 GitHub
- [ ] 导出 Vercel 配置

## 监控和维护

- [ ] 设置 Vercel Analytics
- [ ] 设置错误监控
- [ ] 定期检查性能
- [ ] 定期更新依赖

---

## 🎉 部署完成！

访问：https://ai-edu.asia

如有问题，查看：
- Vercel 文档：https://vercel.com/docs
- Next.js 文档：https://nextjs.org/docs
- Supabase 文档：https://supabase.com/docs
