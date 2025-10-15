// 课程难度
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const

export type CourseLevel = typeof COURSE_LEVELS[keyof typeof COURSE_LEVELS]

// 课程状态
export const COURSE_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export type CourseStatus = typeof COURSE_STATUS[keyof typeof COURSE_STATUS]

// 购买状态
export const PURCHASE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  REFUNDED: 'refunded',
  FAILED: 'failed',
} as const

export type PurchaseStatus = typeof PURCHASE_STATUS[keyof typeof PURCHASE_STATUS]

// 用户角色
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

// 分页
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// 缓存时间（秒）
export const CACHE_TTL = {
  SHORT: 60, // 1 分钟
  MEDIUM: 3600, // 1 小时
  LONG: 86400, // 1 天
  WEEK: 604800, // 1 周
} as const
