import { useEffect, useState } from 'react'
import { ImagePlus, Save, UploadCloud, Trash2, Globe } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

const LOCAL_KEY = 'mazhar-local'

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export function LocalPage() {
  const { user, updateProfile, isAuthenticated } = useAuth()
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || 'متجر محلي',
    email: user?.email || 'local@mazhar.sa',
    storeSlug: user?.storeSlug || 'mazhar-store',
    phone: user?.phone || '0501234567',
    bio: user?.bio || 'هذا إعداد محلي للتجربة داخل المتصفح.',
    logo: user?.logo || '',
    banner: user?.banner || '',
    avatar: user?.avatar || '',
    localOnly: true,
  })

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY)
    if (stored) {
      try {
        setForm(JSON.parse(stored))
      } catch {
        // ignore invalid data
      }
    }
  }, [])

  const saveLocal = () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(form))
    setStatus('تم حفظ الإعدادات محليًا بنجاح')
  }

  const applyAll = async () => {
    if (!isAuthenticated) {
      setStatus('سجّل الدخول أولاً لتطبيق هذه التغييرات على جميع المستخدمين')
      return
    }

    setSaving(true)
    setStatus('جارٍ التطبيق على الجميع...')
    await updateProfile({
      name: form.name,
      email: form.email,
      storeSlug: form.storeSlug,
      phone: form.phone,
      bio: form.bio,
      logo: form.logo,
      banner: form.banner,
      avatar: form.avatar,
    })
    setSaving(false)
    setStatus('تم تطبيق التغييرات على جميع المستخدمين بنجاح')
  }

  const clearLocal = () => {
    localStorage.removeItem(LOCAL_KEY)
    setForm({
      name: user?.name || 'متجر محلي',
      email: user?.email || 'local@mazhar.sa',
      storeSlug: user?.storeSlug || 'mazhar-store',
      phone: user?.phone || '0501234567',
      bio: user?.bio || 'هذا إعداد محلي للتجربة داخل المتصفح.',
      logo: user?.logo || '',
      banner: user?.banner || '',
      avatar: user?.avatar || '',
      localOnly: true,
    })
    setStatus('تم مسح الإعدادات المحلية')
  }

  const handleFileChange = async (field, file) => {
    if (!file) return
    const url = await readFileAsDataUrl(file)
    setForm(prev => ({ ...prev, [field]: url }))
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors'

  return (
    <div className="space-y-6 font-[Cairo]">
      <div>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">الرفع المحلي</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">صفحة الإعدادات المحلية</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ارفع الصور وأضف الإعدادات ثم احفظها في المتصفح أو طبقها على جميع المستخدمين.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">اسم المتجر</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">البريد الإلكتروني</label>
              <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">رابط المتجر</label>
              <input value={form.storeSlug} onChange={e => setForm(p => ({ ...p, storeSlug: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">رقم التواصل</label>
              <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputClass} dir="ltr" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">وصف المتجر</label>
            <textarea rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} className={`${inputClass} resize-none`} />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">صورة الحساب</label>
              <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-28 flex items-center justify-center">
                {form.avatar ? <img src={form.avatar} alt="avatar" className="object-cover w-full h-full" /> : <span className="text-gray-500">لم يتم رفع صورة</span>}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                <ImagePlus className="w-4 h-4" /> رفع صورة
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange('avatar', e.target.files?.[0])} />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">شعار المتجر</label>
              <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-28 flex items-center justify-center">
                {form.logo ? <img src={form.logo} alt="logo" className="object-cover w-full h-full" /> : <span className="text-gray-500">لم يتم رفع شعار</span>}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                <ImagePlus className="w-4 h-4" /> رفع الشعار
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange('logo', e.target.files?.[0])} />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 dark:text-gray-400">بانر المتجر</label>
              <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800 h-28 flex items-center justify-center">
                {form.banner ? <img src={form.banner} alt="banner" className="object-cover w-full h-full" /> : <span className="text-gray-500">لم يتم رفع بنر</span>}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
                <ImagePlus className="w-4 h-4" /> رفع البانر
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange('banner', e.target.files?.[0])} />
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              id="localOnly"
              type="checkbox"
              checked={form.localOnly}
              onChange={e => setForm(p => ({ ...p, localOnly: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-emerald-600"
            />
            <label htmlFor="localOnly" className="text-sm text-gray-700 dark:text-gray-300">حفظ الإعدادات محليًا فقط</label>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={saveLocal} className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
              <UploadCloud className="w-4 h-4" />
              حفظ محلي
            </button>
            <button onClick={applyAll} disabled={saving} className="inline-flex items-center gap-2 px-5 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-60">
              <Globe className="w-4 h-4" />
              تطبيق على الجميع
            </button>
            <button onClick={clearLocal} className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Trash2 className="w-4 h-4" />
              مسح المحلي
            </button>
          </div>

          {status && <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-3">{status}</p>}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <ImagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">ملاحظة مهمة</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">يمكن حفظ التغييرات هنا بشكل محلي داخل المتصفح أو تطبيقها على جميع الحسابات في التطبيق.</p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden bg-gray-50 dark:bg-gray-950 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">المسار المحلي: <span className="font-semibold text-gray-900 dark:text-white">{LOCAL_KEY}</span></p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">يمكنك استخدام هذه الصفحة عندما تريد تجربة إعداد جديد محليًا قبل تطبيقه على جميع المستخدمين.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
