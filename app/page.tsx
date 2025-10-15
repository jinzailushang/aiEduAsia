'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getFeaturedCourses, siteStats } from '@/lib/data/mock-data'
import { LoginDialog } from '@/components/auth/login-dialog'
import { AuthProvider, useAuth } from '@/lib/auth/auth-context'

function HomePage() {
  const featuredCourses = getFeaturedCourses(3)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login')
  const { user, signOut, loading } = useAuth()

  const handleLoginClick = () => {
    setLoginMode('login')
    setShowLoginDialog(true)
  }

  const handleSignupClick = () => {
    setLoginMode('signup')
    setShowLoginDialog(true)
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-bold text-gray-900">AI 编程教育</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
              课程
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              关于
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">欢迎，{user.user_metadata?.name || user.email}</span>
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  我的学习
                </Link>
                <button
                  onClick={signOut}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  退出
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  登录
                </button>
                <button 
                  onClick={handleSignupClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  开始学习
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
            AI 驱动的
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              编程学习之旅
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            高质量编程课程，AI 智能辅导，让你的学习效率提升 10 倍
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105 font-medium text-lg"
            >
              浏览课程
            </Link>
            <Link 
              href="/demo" 
              className="px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all border-2 border-gray-200 font-medium text-lg"
            >
              观看演示
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-gray-900">{siteStats.totalStudents.toLocaleString()}+</div>
              <div className="text-sm text-gray-600 mt-1">学习者</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">{siteStats.totalCourses}+</div>
              <div className="text-sm text-gray-600 mt-1">精品课程</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">{Math.round(siteStats.averageRating * 20)}%</div>
              <div className="text-sm text-gray-600 mt-1">好评率</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">精选课程</h2>
            <p className="mt-4 text-lg text-gray-600">从零基础到进阶，总有适合你的课程</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => {
              const levelColors = {
                BEGINNER: { bg: 'from-blue-500 to-blue-600', badge: 'bg-blue-100 text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' },
                INTERMEDIATE: { bg: 'from-purple-500 to-purple-600', badge: 'bg-purple-100 text-purple-700', button: 'bg-purple-600 hover:bg-purple-700' },
                ADVANCED: { bg: 'from-green-500 to-green-600', badge: 'bg-green-100 text-green-700', button: 'bg-green-600 hover:bg-green-700' }
              }
              const colors = levelColors[course.level]
              const levelText = {
                BEGINNER: '初级',
                INTERMEDIATE: '中级', 
                ADVANCED: '高级'
              }

              return (
                <div key={course.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className={`h-48 bg-gradient-to-br ${colors.bg}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 ${colors.badge} rounded-full text-sm font-medium`}>
                        {levelText[course.level]}
                      </span>
                      <span className="text-sm text-gray-500">{Math.round(course.duration / 60)} 小时</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.subtitle}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">¥{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">¥{course.originalPrice}</span>
                        )}
                      </div>
                      <Link 
                        href={`/courses/${course.slug}`}
                        className={`px-4 py-2 ${colors.button} text-white rounded-lg transition-colors`}
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/courses" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              查看全部课程
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">为什么选择我们</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">极速加载</h3>
              <p className="text-gray-600">页面加载 &lt; 1.2s，流畅的学习体验</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI 辅导</h3>
              <p className="text-gray-600">智能答疑，个性化学习路径推荐</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">超值价格</h3>
              <p className="text-gray-600">高质量课程，亲民价格，物超所值</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            准备好开始学习了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            加入 1000+ 学习者，开启你的编程之旅
          </p>
          {user ? (
            <Link 
              href="/dashboard" 
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all hover:scale-105 font-medium text-lg"
            >
              进入学习中心
            </Link>
          ) : (
            <button 
              onClick={handleSignupClick}
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all hover:scale-105 font-medium text-lg"
            >
              免费注册
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
                <span className="text-xl font-bold text-white">AI 编程教育</span>
              </div>
              <p className="text-sm">
                AI 驱动的编程教育平台，让学习更高效
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">课程</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/courses" className="hover:text-white transition-colors">全部课程</Link></li>
                <li><Link href="/courses?level=beginner" className="hover:text-white transition-colors">初级课程</Link></li>
                <li><Link href="/courses?level=advanced" className="hover:text-white transition-colors">高级课程</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">关于</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">博客</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">法律</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">服务条款</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 AI 编程教育. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 登录/注册弹窗 */}
      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        mode={loginMode}
      />
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  )
}
