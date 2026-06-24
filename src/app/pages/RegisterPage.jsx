import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Shirt, Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const { register, loading } = useAuth()
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'الاسم مطلوب'
    if (!form.email) e.email = 'البريد الإلكتروني مطلوب'
    if (form.password.length < 6) e.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    if (form.password !== form.confirm) e.confirm = 'كلمتا المرور غير متطابقتين'
    return e
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setAuthError('')
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    const ok = await register(form.name, form.email, form.password)
    if (!ok) {
      setErrors({ email: 'هذا البريد مسجل بالفعل' })
      setAuthError('يرجى استخدام بريد إلكتروني مختلف أو تسجيل الدخول')
      return
    }
    navigate('/dashboard')
  }

  const inputClass = field =>
    `w-full px-4 py-3 pr-11 border ${errors[field] ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'} rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white dark:focus:bg-gray-700 transition-all`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 font-[Cairo]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900 dark:text-white">مَظهر</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">أنشئ حسابك</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">ابدأ رحلتك مع متجرك الذكي مجاناً</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
          {/* Google */}
          <button className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>التسجيل عبر Google</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-sm text-gray-400">أو</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">الاسم الكامل</label>
              <div className="relative">
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="أحمد محمد"
                  className={inputClass('name')}
                />
                <User className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="example@email.com"
                  className={inputClass('email')}
                  dir="ltr"
                />
                <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className={`${inputClass('password')} pl-11`}
                  dir="ltr"
                />
                <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <input
                  type="password"
                  value={form.confirm}
                  onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                  placeholder="••••••••"
                  className={inputClass('confirm')}
                  dir="ltr"
                />
                <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
              </div>
              {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>إنشاء الحساب</span>
                </>
              )}
            </button>
            {authError && <p className="text-sm text-red-500 mt-3">{authError}</p>}
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">سجّل دخولك</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
