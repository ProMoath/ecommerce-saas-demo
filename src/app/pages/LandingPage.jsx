import { Ruler, Sparkles, User, ThumbsUp, ArrowLeft, CheckCircle, Star } from 'lucide-react'
import { Link } from 'react-router'
import { Footer } from '../components/shared/Footer.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'

const features = [
  {
    icon: Ruler,
    title: 'غرفة قياس ذكية',
    desc: 'أدخل مقاساتك مرة واحدة ونجد لك المقاس المناسب في أي منتج.',
    color: 'emerald',
  },
  {
    icon: Sparkles,
    title: 'تنسيق الأزياء',
    desc: 'نقترح عليك أطقماً متكاملة بناءً على ما تحبه وميزانيتك.',
    color: 'purple',
  },
  {
    icon: User,
    title: 'موديل افتراضي',
    desc: 'شاهد كيف سيبدو المنتج عليك حسب شكل جسمك ولون بشرتك.',
    color: 'blue',
  },
  {
    icon: ThumbsUp,
    title: 'تصويت الأصدقاء',
    desc: 'شارك ما أعجبك مع أصدقائك واجمع آراءهم قبل الشراء.',
    color: 'pink',
  },
]

const colorMap = {
  emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
  pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
}

const steps = [
  { num: '01', title: 'أنشئ متجرك', desc: 'سجّل حسابك وخصّص متجرك في دقائق.' },
  { num: '02', title: 'أضف منتجاتك', desc: 'ارفع صور منتجاتك وأضف جدول المقاسات والتفاصيل.' },
  { num: '03', title: 'شارك المتجر', desc: 'احصل على رابط متجرك وشاركه مع عملائك.' },
  { num: '04', title: 'استقبل الطلبات', desc: 'تصلك الطلبات مباشرة عبر واتساب وتتابع المبيعات.' },
]

const reviews = [
  { name: 'نورة السعيدي', role: 'صاحبة متجر أزياء', text: 'منصة مظهر غيّرت طريقة بيعي للملابس! ميزة القياس الذكية أنقذت عملائي من مشكلة المقاسات.', rating: 5 },
  { name: 'محمد الغامدي', role: 'مصمم أزياء', text: 'الواجهة سهلة جداً وإضافة المنتجات بسيطة. أنصح بها لكل من يريد متجراً احترافياً.', rating: 5 },
  { name: 'ريم الأحمد', role: 'متسوقة', text: 'ميزة الموديل الافتراضي رائعة! ساعدتني في اختيار المقاس الصحيح أول مرة.', rating: 5 },
]

export function LandingPage() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-[Cairo]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>الذكاء الاصطناعي في خدمة موضتك</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            متجر ملابسك{' '}
            <span className="text-emerald-600 dark:text-emerald-400">الذكي</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            جرّب الملابس افتراضياً، اكتشف مقاسك المناسب، ونسّق أطقمك بسهولة تامة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all hover:scale-105 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
            >
              <span className="font-medium">أنشئ متجرك مجاناً</span>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              to={`/shop/${user?.storeSlug || 'mazhar-store'}`}
              className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <span>تصفّح المتجر التجريبي</span>
            </Link>
          </div>

          {/* Hero image */}
          <div className="mt-16 relative">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 max-w-4xl mx-auto">
              <img
                src="https://images.unsplash.com/photo-1777458300190-10caf494efe1?w=1200&q=80"
                alt="متجر مظهر"
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-3 -right-3 md:right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 dark:text-white">مقاس M</p>
                <p className="text-xs text-gray-500">مناسب لك ✓</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">مميزات لا مثيل لها</h2>
          <p className="text-gray-500 dark:text-gray-400">كل ما تحتاجه لتجربة تسوق استثنائية</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorMap[f.color]}`}>
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">كيف يعمل؟</h2>
            <p className="text-gray-500 dark:text-gray-400">4 خطوات بسيطة لإطلاق متجرك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800" style={{ left: '-50%', width: '100%', zIndex: 0 }} />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{s.num}</span>
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">ماذا يقول عملاؤنا؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="flex gap-1 mb-4">
                {Array(r.rating).fill(0).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">"{r.text}"</p>
              <div>
                <p className="font-medium text-gray-900 dark:text-white text-sm">{r.name}</p>
                <p className="text-xs text-gray-400">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ابدأ رحلتك مع مَظهر اليوم</h2>
          <p className="text-emerald-100 mb-8">مجاني تماماً، لا حاجة لبطاقة ائتمانية</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all font-medium shadow-lg"
          >
            <span>أنشئ متجرك الآن</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
