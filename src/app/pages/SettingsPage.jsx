import { useEffect, useRef, useState } from 'react'
import { BellRing, ImagePlus, Save, ShieldCheck, Store, Truck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function SettingsPage() {
  const { user, updateProfile } = useAuth()
  const avatarRef = useRef(null)
  const logoRef = useRef(null)
  const bannerRef = useRef(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    storeSlug: user?.storeSlug || 'mazhar-store',
    phone: '0501234567',
    bio: 'متجر ملابس ذكي يوفر تجربة تسوق احترافية مع أدوات عرض ذكية.',
    logo: user?.logo || '',
    banner: user?.banner || '',
    avatar: user?.avatar || '',
  })

  const [prefs, setPrefs] = useState({
    notifications: true,
    lowStockAlerts: true,
    syncOffers: false,
  })

  useEffect(() => {
    if (!user) return
    // load persisted preferences from localStorage if present
    const storedPrefs = localStorage.getItem('mazhar-settings')
    if (storedPrefs) {
      try { setPrefs(JSON.parse(storedPrefs)) } catch (e) { /* ignore */ }
    }

    setForm({
      name: user.name || '',
      email: user.email || '',
      storeSlug: user.storeSlug || 'mazhar-store',
      phone: user.phone || '0501234567',
      bio: user.bio || 'متجر ملابس ذكي يوفر تجربة تسوق احترافية مع أدوات عرض ذكية.',
      logo: user.logo || '',
      banner: user.banner || '',
      avatar: user.avatar || '',
    })
  }, [user])

  // Auto-sync preferences to localStorage when prefs change and syncOffers enabled
  useEffect(() => {
    try {
      // always persist so the UI reflects latest prefs; if syncOffers enabled show status
      localStorage.setItem('mazhar-settings', JSON.stringify(prefs))
      if (prefs.syncOffers) {
        setStatus('تم المزامنة تلقائياً')
      }
    } catch (e) {
      // ignore
    }
  }, [prefs])

  const handleSave = async () => {
    setSaving(true)
    setStatus('')
    await updateProfile({
      name: form.name,
      email: form.email,
      storeSlug: form.storeSlug,
      phone: form.phone,
      bio: form.bio,
      avatar: form.avatar,
      logo: form.logo,
      banner: form.banner,
    })
    try {
      localStorage.setItem('mazhar-settings', JSON.stringify(prefs))
      setStatus(`تم حفظ الإعدادات بنجاح. رابط المتجر: /shop/${form.storeSlug}`)
    } catch (e) {
      setStatus('حدث خطأ أثناء الحفظ في التخزين المحلي')
    }
    setSaving(false)
  }

  const resetDefaults = async () => {
    const defaults = {
      name: 'أحمد محمد',
      email: 'ahmed@mazhar.sa',
      storeSlug: 'mazhar-store',
      phone: '0501234567',
      bio: 'متجر ملابس ذكي يوفر تجربة تسوق احترافية مع أدوات عرض ذكية.',
      avatar: '',
      logo: '',
      banner: '',
    }
    await updateProfile(defaults)
    localStorage.removeItem('mazhar-settings')
    localStorage.setItem('mazhar-user', JSON.stringify(defaults))
    setPrefs({ notifications: true, lowStockAlerts: true, syncOffers: false })
    setForm(defaults)
    setStatus('تمت إعادة ضبط الإعدادات إلى الافتراضي')
  }

  const handleAvatarImage = e => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, avatar: url }))
    updateProfile({ avatar: url })
    setStatus('تم تحديث صورة الحساب')
  }

  const handleLogoImage = e => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, logo: url }))
    updateProfile({ logo: url })
    setStatus('تم تحديث شعار المتجر')
  }

  const handleBannerImage = e => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setForm(prev => ({ ...prev, banner: url }))
    updateProfile({ banner: url })
    setStatus('تم تحديث بانر المتجر')
  }

  const inputCls = 'w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'

  return (
    <div className="space-y-6 font-[Cairo]">
      <div>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">إعدادات الحساب</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة متجرك بالكامل</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">حدث بيانات المتجر، صورة الحساب، وتعليمات المتابعة بسهولة.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                {form.banner || user?.banner ? (
                  <img src={form.banner || user?.banner} alt="banner" className="w-full h-52 object-cover" />
                ) : (
                  <div className="w-full h-52 flex items-center justify-center text-gray-400 dark:text-gray-500">بانر المتجر</div>
                )}
              </div>
              <button onClick={() => bannerRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200">
                <ImagePlus className="w-4 h-4" />
                تغيير البنر
              </button>
              <input ref={bannerRef} type="file" accept="image/*" onChange={handleBannerImage} className="hidden" />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    {form.logo || user?.logo ? (
                      <img src={form.logo || user?.logo} alt="logo" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">شع</span>
                    )}
                  </div>
                  <button onClick={() => logoRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200">
                    <ImagePlus className="w-4 h-4" />
                    تغيير الشعار
                  </button>
                  <input ref={logoRef} type="file" accept="image/*" onChange={handleLogoImage} className="hidden" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    {form.avatar || user?.avatar ? (
                      <img src={form.avatar || user?.avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{user?.name?.[0] || 'م'}</span>
                    )}
                  </div>
                  <button onClick={() => avatarRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm text-gray-700 dark:text-gray-200">
                    <ImagePlus className="w-4 h-4" />
                    تغيير الصورة
                  </button>
                  <input ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarImage} className="hidden" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">الاسم</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">البريد الإلكتروني</label>
                <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">اسم المتجر</label>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-600" />
                  <input value={form.storeSlug} onChange={e => setForm(p => ({ ...p, storeSlug: e.target.value }))} className={inputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">رقم التواصل</label>
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">وصف المتجر</label>
              <textarea rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} className={`${inputCls} resize-none`} />
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-60">
                <Save className="w-4 h-4" />
                {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
              </button>
              <button onClick={resetDefaults} className="px-5 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200">إعادة ضبط المصنع</button>
            </div>

            {status && <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">{status}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">الأمان والخصوصية</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">تواصل موثوق وآمن مع عملائك</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>• كلمات المرور محفوظة بشكل آمن.</p>
              <p>• يمكن تحديث بيانات المتجر في أي وقت.</p>
              <p>• دعم كامل لعمليات الطلبات والردود.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">تفضيلات المتجر</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">تحكم في إشعاراتك وسير العمل</p>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-200">إشعارات الطلبات الجديدة</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                  checked={prefs.notifications}
                  onChange={e => setPrefs(p => ({ ...p, notifications: e.target.checked }))}
                />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-200">تفعيل تنبيهات المخزون المنخفض</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                  checked={prefs.lowStockAlerts}
                  onChange={e => setPrefs(p => ({ ...p, lowStockAlerts: e.target.checked }))}
                />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-200">مزامنة عروض المتجر</span>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                  checked={prefs.syncOffers}
                  onChange={e => setPrefs(p => ({ ...p, syncOffers: e.target.checked }))}
                />
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-5 h-5" />
              <h2 className="text-lg font-bold">تجربة تسليم متميزة</h2>
            </div>
            <p className="text-sm text-emerald-50 leading-relaxed">إظهار معلومات التوصيل، وأوقات الاستلام، وتعزيز ثقة العملاء داخل المتجر.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
