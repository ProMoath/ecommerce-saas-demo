import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, Search, ShieldCheck, Sparkles, Store, Truck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { mockProducts } from '../data/mockData.js'
import { ProductCard } from '../components/shared/ProductCard.jsx'

export function ShopPage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const storeTitle = user?.storeSlug === slug ? user?.name || 'متجر مَظهر' : `${slug || 'المتجر'}`
  const storeSubtitle = user?.bio || 'اكتشف تشكيلات ناعمة، عروض مُميّزة، ومقاسات مناسبة لكل قطعة مع تجربة تسوق أسرع وأكثر بريقًا.'
  const categories = ['all', ...new Set(mockProducts.map(product => product.category))]

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesQuery = !query || product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'all' || product.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category])

  return (
    <div className="space-y-8 font-[Cairo]">
      <section className="relative overflow-hidden rounded-[32px] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.12),_transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="relative overflow-hidden rounded-[32px] border border-white/20 shadow-[0_30px_80px_rgba(15,23,42,0.28)] bg-white/10 backdrop-blur-xl">
            {user?.banner ? (
              <div className="relative h-[24rem] sm:h-[26rem] overflow-hidden">
                <img src={user.banner} alt="Store banner" className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-slate-950/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_28%)]" />
              </div>
            ) : (
              <div className="relative h-[24rem] sm:h-[26rem] bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-600">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_28%)]" />
              </div>
            )}

            <div className="absolute inset-x-0 inset-y-0 flex items-end">
              <div className="w-full px-4 sm:px-6 pb-5 sm:pb-6 lg:pb-8">
                <div className="rounded-[28px] border border-white/20 bg-white/12 backdrop-blur-2xl shadow-2xl shadow-black/20 p-4 sm:p-5 lg:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 min-w-0">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-[28px] bg-white/95 overflow-hidden shadow-xl ring-1 ring-white/30 flex items-center justify-center shrink-0">
                        {user?.logo ? (
                          <img src={user.logo} alt="Store logo" className="w-full h-full object-cover" />
                        ) : (
                          <Store className="w-10 h-10 text-emerald-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/90 text-xs sm:text-sm mb-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-300" />
                          <span>{slug || 'متجر مَظهر'}</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-sm">{storeTitle}</h1>
                        <p className="mt-3 max-w-3xl text-sm sm:text-base text-white/82 leading-7">{storeSubtitle}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:justify-end">
                      {user?.storeSlug === slug && (
                        <Link to="/dashboard/products/new" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-emerald-700 font-semibold shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5">
                          إضافة منتج
                          <ArrowLeft className="w-4 h-4" />
                        </Link>
                      )}
                      <Link to="/vote/1" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 bg-white/10 text-white/95 backdrop-blur-sm transition-colors hover:bg-white/15">
                        شارك رأيك
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Store, label: 'منتجات حصرية', value: mockProducts.length },
                { icon: Truck, label: 'توصيل سريع', value: '24-48h' },
                { icon: ShieldCheck, label: 'دفع آمن', value: '100%' },
              ].map((item, index) => (
                <div key={index} className="rounded-3xl border border-white/15 bg-white/10 backdrop-blur-xl p-4 sm:p-5 shadow-lg shadow-black/10">
                  <div className="flex items-center justify-between mb-3">
                    <item.icon className="w-5 h-5 text-white/90" />
                    <span className="w-10 h-1 rounded-full bg-white/20" />
                  </div>
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="text-sm text-emerald-50/90 mt-1">{item.label}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">تصفّح حسب الفئة</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(item => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === item ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
              >
                {item === 'all' ? 'الكل' : item}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">ابحث عن منتج</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">ابحث بالاسم أو الفئة</p>
            </div>
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="مثال: قميص أو فساتين"
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">المنتجات المتاحة</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{filteredProducts.length} منتج يطابق معاييرك</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} storeSlug={slug} />
          ))}
        </div>
      </section>
    </div>
  )
}
