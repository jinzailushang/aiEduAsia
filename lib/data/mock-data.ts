// 模拟数据 - 用于开发和演示
export interface Course {
  id: string
  slug: string
  title: string
  subtitle?: string
  description: string
  thumbnail?: string
  price: number
  originalPrice?: number
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  duration: number // 分钟
  studentsCount: number
  rating: number
  reviewCount: number
  tags: string[]
  published: boolean
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
}

export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Python',
    slug: 'python',
    color: '#3776AB',
  },
  {
    id: '2',
    name: 'JavaScript',
    slug: 'javascript',
    color: '#F7DF1E',
  },
  {
    id: '3',
    name: 'TypeScript',
    slug: 'typescript',
    color: '#3178C6',
  },
  {
    id: '4',
    name: 'React',
    slug: 'react',
    color: '#61DAFB',
  },
  {
    id: '5',
    name: 'Next.js',
    slug: 'nextjs',
    color: '#000000',
  },
  {
    id: '6',
    name: '全栈开发',
    slug: 'fullstack',
    color: '#FF6B6B',
  },
]

export const mockCourses: Course[] = [
  {
    id: '1',
    slug: 'python-basics',
    title: 'Python 基础入门',
    subtitle: '从零开始学习 Python 编程',
    description: '本课程适合零基础学员，通过实战项目学习 Python 编程基础知识。掌握变量、数据类型、控制流、函数等核心概念。',
    thumbnail: '/images/courses/python-basics.jpg',
    price: 99,
    originalPrice: 199,
    level: 'BEGINNER',
    duration: 720, // 12 小时
    studentsCount: 1256,
    rating: 4.8,
    reviewCount: 234,
    tags: ['Python', '编程入门'],
    published: true,
  },
  {
    id: '2',
    slug: 'javascript-advanced',
    title: 'JavaScript 进阶',
    subtitle: '深入理解 JavaScript 核心概念',
    description: '深入学习 JavaScript 的高级特性，包括闭包、原型链、异步编程等。适合有基础的开发者进阶学习。',
    thumbnail: '/images/courses/javascript-advanced.jpg',
    price: 199,
    originalPrice: 299,
    level: 'INTERMEDIATE',
    duration: 1200, // 20 小时
    studentsCount: 892,
    rating: 4.9,
    reviewCount: 156,
    tags: ['JavaScript', '进阶'],
    published: true,
  },
  {
    id: '3',
    slug: 'fullstack-development',
    title: '全栈开发实战',
    subtitle: '使用 Next.js 构建完整的 Web 应用',
    description: '从前端到后端，学习如何使用 Next.js、React、TypeScript 构建现代化的全栈应用。包含数据库设计、API 开发、部署等。',
    thumbnail: '/images/courses/fullstack-development.jpg',
    price: 299,
    originalPrice: 499,
    level: 'ADVANCED',
    duration: 1800, // 30 小时
    studentsCount: 456,
    rating: 5.0,
    reviewCount: 89,
    tags: ['Next.js', 'React', 'TypeScript', '全栈开发'],
    published: true,
  },
  {
    id: '4',
    slug: 'react-hooks',
    title: 'React Hooks 深度解析',
    subtitle: '掌握现代 React 开发',
    description: '深入学习 React Hooks，包括 useState、useEffect、useContext、自定义 Hooks 等。通过实际项目掌握现代 React 开发模式。',
    thumbnail: '/images/courses/react-hooks.jpg',
    price: 159,
    originalPrice: 259,
    level: 'INTERMEDIATE',
    duration: 900, // 15 小时
    studentsCount: 678,
    rating: 4.7,
    reviewCount: 123,
    tags: ['React', 'Hooks'],
    published: true,
  },
  {
    id: '5',
    slug: 'typescript-fundamentals',
    title: 'TypeScript 基础与实践',
    subtitle: '类型安全的 JavaScript 开发',
    description: '学习 TypeScript 的核心概念，包括类型系统、接口、泛型等。提升代码质量和开发效率。',
    thumbnail: '/images/courses/typescript-fundamentals.jpg',
    price: 129,
    originalPrice: 199,
    level: 'BEGINNER',
    duration: 600, // 10 小时
    studentsCount: 934,
    rating: 4.6,
    reviewCount: 187,
    tags: ['TypeScript', '类型安全'],
    published: true,
  },
  {
    id: '6',
    slug: 'nodejs-api',
    title: 'Node.js API 开发',
    subtitle: '构建高性能后端服务',
    description: '学习使用 Node.js 构建 RESTful API，包括数据库操作、身份验证、错误处理等后端开发核心技能。',
    thumbnail: '/images/courses/nodejs-api.jpg',
    price: 179,
    originalPrice: 279,
    level: 'INTERMEDIATE',
    duration: 1080, // 18 小时
    studentsCount: 567,
    rating: 4.8,
    reviewCount: 98,
    tags: ['Node.js', 'API', '后端开发'],
    published: true,
  },
]

// 工具函数
export function getCoursesByLevel(level: Course['level']): Course[] {
  return mockCourses.filter(course => course.level === level && course.published)
}

export function getCoursesByTag(tag: string): Course[] {
  return mockCourses.filter(course => 
    course.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())) && course.published
  )
}

export function getFeaturedCourses(limit = 6): Course[] {
  return mockCourses
    .filter(course => course.published)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}

export function searchCourses(query: string): Course[] {
  const lowercaseQuery = query.toLowerCase()
  return mockCourses.filter(course => 
    course.published && (
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  )
}

export function getCourseBySlug(slug: string): Course | undefined {
  return mockCourses.find(course => course.slug === slug && course.published)
}

// 统计数据
export const siteStats = {
  totalStudents: mockCourses.reduce((sum, course) => sum + course.studentsCount, 0),
  totalCourses: mockCourses.filter(course => course.published).length,
  averageRating: Number((mockCourses.reduce((sum, course) => sum + course.rating, 0) / mockCourses.length).toFixed(1)),
}