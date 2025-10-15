'use client'

import { AuthProvider, useAuth } from '@/lib/auth/auth-context'
import { LoginDialog } from '@/components/auth/login-dialog'
import { useState } from 'react'

function AuthTestPage() {
  const { user, loading, signOut } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">认证系统测试</h1>
          
          {user ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2">✅ 已登录</h2>
                <div className="space-y-2 text-sm text-green-700">
                  <p><strong>用户 ID:</strong> {user.id}</p>
                  <p><strong>邮箱:</strong> {user.email}</p>
                  <p><strong>姓名:</strong> {user.user_metadata?.name || '未设置'}</p>
                  <p><strong>登录时间:</strong> {new Date(user.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                退出登录
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ 未登录</h2>
                <p className="text-sm text-yellow-700">
                  请点击下方按钮测试登录功能
                </p>
              </div>
              
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                测试登录
              </button>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">配置状态</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <strong>Supabase URL:</strong> {' '}
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                  <span className="text-green-600">✅ 已配置</span>
                ) : (
                  <span className="text-red-600">❌ 未配置</span>
                )}
              </p>
              <p>
                <strong>Supabase Key:</strong> {' '}
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
                  <span className="text-green-600">✅ 已配置</span>
                ) : (
                  <span className="text-red-600">❌ 未配置</span>
                )}
              </p>
            </div>
          </div>

          {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">📝 配置说明</h3>
              <p className="text-sm text-blue-700 mb-2">
                要启用完整的认证功能，请按照以下步骤配置 Supabase：
              </p>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>查看 <code>SUPABASE_SETUP.md</code> 文件</li>
                <li>创建 Supabase 项目</li>
                <li>配置 <code>.env.local</code> 文件</li>
                <li>重启开发服务器</li>
              </ol>
            </div>
          )}
        </div>
      </div>

      <LoginDialog
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        mode="login"
      />
    </div>
  )
}

export default function AuthTest() {
  return (
    <AuthProvider>
      <AuthTestPage />
    </AuthProvider>
  )
}