import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Lock, Eye, EyeOff, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const submit = async e => {
    e.preventDefault()
    setError('')
    const ok = await login(form.email, form.password)
    if (!ok) {
      setError('لم يتم العثور على حساب بهذا البريد. تأكد من البيانات أو أنشئ حساباً جديداً')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 font-[Cairo]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مرحباً بعودتك</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">سجّل دخولك للمتابعة</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <input
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 pr-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 text-gray-400" />
                <button type="button" onClick={() => setShow(!show)} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400">
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'تسجيل الدخول'}
            </button>
            {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            ليس لديك حساب؟ <Link to="/register" className="text-emerald-600">أنشئ حساب</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
