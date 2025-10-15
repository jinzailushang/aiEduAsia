import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始种子数据...')

  // 清空现有数据（开发环境）
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️  清空现有数据...')
    await prisma.review.deleteMany()
    await prisma.progress.deleteMany()
    await prisma.courseTag.deleteMany()
    await prisma.purchase.deleteMany()
    await prisma.chapter.deleteMany()
    await prisma.course.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.user.deleteMany()
  }

  // 创建标签
  console.log('📌 创建标签...')
  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'Python',
        slug: 'python',
        description: 'Python 编程语言',
        color: '#3776AB',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'JavaScript',
        slug: 'javascript',
        description: 'JavaScript 编程语言',
        color: '#F7DF1E',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'TypeScript',
        slug: 'typescript',
        description: 'TypeScript 编程语言',
        color: '#3178C6',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'React',
        slug: 'react',
        description: 'React 前端框架',
        color: '#61DAFB',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Next.js 全栈框架',
        color: '#000000',
      },
    }),
    prisma.tag.create({
      data: {
        name: '全栈开发',
        slug: 'fullstack',
        description: '全栈开发',
        color: '#FF6B6B',
      },
    }),
  ])

  console.log(`✅ 创建了 ${tags.length} 个标签`)

  // 创建管理员用户
  console.log('👤 创建用户...')
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ai-edu.asia',
      name: '管理员',
      role: 'ADMIN',
    },
  })

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: '张三',
      role: 'USER',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: '李四',
      role: 'USER',
    },
  })

  console.log(`✅ 创建了 3 个用户`)

  // 创建课程
  console.log('📚 创建课程...')

  // 课程 1: Python 基础入门
  const pythonCourse = await prisma.course.create({
    data: {
      slug: 'python-basics',
      title: 'Python 基础入门',
      subtitle: '从零开始学习 Python 编程',
      description: '本课程适合零基础学员，通过实战项目学习 Python 编程基础知识。',
      content: `
# Python 基础入门

## 课程简介
本课程将带你从零开始学习 Python 编程，掌握编程基础知识。

## 学习目标
- 掌握 Python 基本语法
- 理解面向对象编程
- 能够编写简单的 Python 程序

## 适合人群
- 编程零基础学员
- 想要学习 Python 的初学者
      `,
      price: 99,
      originalPrice: 199,
      level: 'BEGINNER',
      duration: 720, // 12 小时
      status: 'PUBLISHED',
      published: true,
      publishedAt: new Date(),
      studentsCount: 156,
      rating: 4.8,
      reviewCount: 23,
      viewCount: 1234,
      metaTitle: 'Python 基础入门 - AI 编程教育',
      metaDescription: '从零开始学习 Python，掌握编程基础',
      metaKeywords: 'Python, 编程入门, 零基础',
      createdBy: admin.id,
      tags: {
        create: [{ tagId: tags[0].id }], // Python
      },
      chapters: {
        create: [
          {
            title: '第 1 章：Python 简介',
            description: '了解 Python 的历史和应用',
            content: 'Python 是一门简单易学的编程语言...',
            duration: 1800, // 30 分钟
            order: 1,
            isFree: true,
            isPreview: true,
          },
          {
            title: '第 2 章：变量和数据类型',
            description: '学习 Python 的基本数据类型',
            content: 'Python 有多种数据类型：整数、浮点数、字符串...',
            duration: 2400, // 40 分钟
            order: 2,
            isFree: true,
          },
          {
            title: '第 3 章：控制流',
            description: '学习条件语句和循环',
            content: 'if 语句、for 循环、while 循环...',
            duration: 3600, // 60 分钟
            order: 3,
          },
          {
            title: '第 4 章：函数',
            description: '学习如何定义和使用函数',
            content: '函数是可重用的代码块...',
            duration: 3600, // 60 分钟
            order: 4,
          },
        ],
      },
    },
  })

  // 课程 2: JavaScript 进阶
  const jsCourse = await prisma.course.create({
    data: {
      slug: 'javascript-advanced',
      title: 'JavaScript 进阶',
      subtitle: '深入理解 JavaScript 核心概念',
      description: '深入学习 JavaScript 的高级特性，包括闭包、原型链、异步编程等。',
      content: `
# JavaScript 进阶

## 课程简介
深入理解 JavaScript 核心概念和高级特性。

## 学习目标
- 掌握 JavaScript 高级特性
- 理解闭包和原型链
- 掌握异步编程

## 适合人群
- 有 JavaScript 基础的开发者
- 想要深入学习 JS 的学员
      `,
      price: 199,
      originalPrice: 299,
      level: 'INTERMEDIATE',
      duration: 1200, // 20 小时
      status: 'PUBLISHED',
      published: true,
      publishedAt: new Date(),
      studentsCount: 89,
      rating: 4.9,
      reviewCount: 15,
      viewCount: 567,
      metaTitle: 'JavaScript 进阶 - AI 编程教育',
      metaDescription: '深入理解 JavaScript 核心概念和高级特性',
      metaKeywords: 'JavaScript, 进阶, 闭包, 异步编程',
      createdBy: admin.id,
      tags: {
        create: [{ tagId: tags[1].id }], // JavaScript
      },
      chapters: {
        create: [
          {
            title: '第 1 章：作用域和闭包',
            description: '深入理解 JavaScript 作用域',
            content: '作用域链、闭包的原理和应用...',
            duration: 3600, // 60 分钟
            order: 1,
            isFree: true,
            isPreview: true,
          },
          {
            title: '第 2 章：原型和继承',
            description: '理解 JavaScript 的原型链',
            content: '原型对象、原型链、继承...',
            duration: 3600, // 60 分钟
            order: 2,
          },
          {
            title: '第 3 章：异步编程',
            description: '掌握 Promise 和 async/await',
            content: '回调函数、Promise、async/await...',
            duration: 4800, // 80 分钟
            order: 3,
          },
        ],
      },
    },
  })

  // 课程 3: 全栈开发实战
  await prisma.course.create({
    data: {
      slug: 'fullstack-development',
      title: '全栈开发实战',
      subtitle: '使用 Next.js 构建完整的 Web 应用',
      description: '从前端到后端，学习如何使用 Next.js、React、TypeScript 构建现代化的全栈应用。',
      content: `
# 全栈开发实战

## 课程简介
使用 Next.js 构建完整的 Web 应用，从前端到后端。

## 学习目标
- 掌握 Next.js 全栈开发
- 学习 React 和 TypeScript
- 构建完整的 Web 应用

## 适合人群
- 有前端基础的开发者
- 想要学习全栈开发的学员
      `,
      price: 299,
      originalPrice: 499,
      level: 'ADVANCED',
      duration: 1800, // 30 小时
      status: 'PUBLISHED',
      published: true,
      publishedAt: new Date(),
      studentsCount: 45,
      rating: 5.0,
      reviewCount: 8,
      viewCount: 234,
      metaTitle: '全栈开发实战 - AI 编程教育',
      metaDescription: '使用 Next.js 构建完整的 Web 应用',
      metaKeywords: 'Next.js, React, TypeScript, 全栈开发',
      createdBy: admin.id,
      tags: {
        create: [
          { tagId: tags[2].id }, // TypeScript
          { tagId: tags[3].id }, // React
          { tagId: tags[4].id }, // Next.js
          { tagId: tags[5].id }, // 全栈开发
        ],
      },
      chapters: {
        create: [
          {
            title: '第 1 章：Next.js 基础',
            description: '了解 Next.js 的核心概念',
            content: 'App Router、Server Components...',
            duration: 3600, // 60 分钟
            order: 1,
            isFree: true,
            isPreview: true,
          },
          {
            title: '第 2 章：数据库设计',
            description: '使用 Prisma 设计数据库',
            content: 'Prisma Schema、数据模型...',
            duration: 4800, // 80 分钟
            order: 2,
          },
          {
            title: '第 3 章：API 开发',
            description: '构建 RESTful API',
            content: 'Route Handlers、API 设计...',
            duration: 5400, // 90 分钟
            order: 3,
          },
        ],
      },
    },
  })

  console.log(`✅ 创建了 3 门课程`)

  // 创建购买记录
  console.log('💳 创建购买记录...')
  await prisma.purchase.create({
    data: {
      userId: user1.id,
      courseId: pythonCourse.id,
      amount: 99,
      stripePaymentId: 'pi_test_123456',
      status: 'COMPLETED',
    },
  })

  await prisma.purchase.create({
    data: {
      userId: user2.id,
      courseId: jsCourse.id,
      amount: 199,
      stripePaymentId: 'pi_test_789012',
      status: 'COMPLETED',
    },
  })

  console.log(`✅ 创建了 2 条购买记录`)

  // 创建学习进度
  console.log('📊 创建学习进度...')
  const pythonChapters = await prisma.chapter.findMany({
    where: { courseId: pythonCourse.id },
    orderBy: { order: 'asc' },
  })

  await prisma.progress.create({
    data: {
      userId: user1.id,
      chapterId: pythonChapters[0].id,
      completed: true,
      currentTime: pythonChapters[0].duration,
      completedAt: new Date(),
    },
  })

  await prisma.progress.create({
    data: {
      userId: user1.id,
      chapterId: pythonChapters[1].id,
      completed: false,
      currentTime: 1200, // 20 分钟
    },
  })

  console.log(`✅ 创建了 2 条学习进度`)

  // 创建评价
  console.log('⭐ 创建评价...')
  await prisma.review.create({
    data: {
      userId: user1.id,
      courseId: pythonCourse.id,
      rating: 5,
      title: '非常好的入门课程',
      content: '讲解清晰，案例丰富，非常适合初学者！',
      status: 'APPROVED',
    },
  })

  await prisma.review.create({
    data: {
      userId: user2.id,
      courseId: jsCourse.id,
      rating: 5,
      title: '深入浅出',
      content: '对 JavaScript 的理解更深入了，强烈推荐！',
      status: 'APPROVED',
    },
  })

  console.log(`✅ 创建了 2 条评价`)

  console.log('✨ 种子数据创建完成！')
}

main()
  .catch((e) => {
    console.error('❌ 种子数据创建失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
