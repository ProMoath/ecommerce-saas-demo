import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../contexts/AuthContext.jsx'
import { ArrowUpRight, PackageCheck, PlusCircle, ShoppingBag, ShoppingCart, Users, DollarSign, Sparkles, AlertTriangle, Truck, Star } from 'lucide-react'
import { StatCard } from '../components/shared/StatCard.jsx'
import { mockProducts, mockOrders, mockStats } from '../data/mockData.js'

const statusClass = {
  delivered: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300',
  processing: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  shipped: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  pending: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
}

const statusLabel = {
  delivered: 'تم التسليم',
  processing: 'قيد التنفيذ',
  shipped: 'تم الشحن',
  pending: 'معلق',
}

export function DashboardPage() {
  const [range, setRange] = useState('30d')
  const { user } = useAuth()

  const stats = useMemo(() => [
    { title: 'المنتجات', value: mockStats.totalProducts, icon: ShoppingBag, color: 'emerald' },
    { title: 'الطلبات اليوم', value: mockStats.todayOrders, icon: ShoppingCart, color: 'blue' },
    { title: 'الزوار', value: mockStats.visitors, icon: Users, color: 'purple' },
    { title: 'الإيرادات', value: `${mockStats.revenue} ر.س`, icon: DollarSign, color: 'orange' },
  ], [])

  const lowStock = mockProducts.filter(product => product.stock < 10).length
  const bestSelling = mockProducts.slice(0, 3)
  const maximumOrders = Math.max(...mockStats.chartData.map(item => item.orders))

  return (
    <div className="space-y-6 font-[Cairo]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">لوحة تحكم مَظهر</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">نظرة عامة على متجرك</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تابع أداء المتجر، أضف منتجات جديدة، واستعد لأفضل الطلبات.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={range}
            onChange={e => setRange(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200"
          >
            <option value="7d">7 أيام</option>
            <option value="30d">30 يوم</option>
            <option value="90d">3 أشهر</option>
          </select>
          <Link to="/dashboard/products/new" className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            <PlusCircle className="w-4 h-4" />
            <span>إضافة منتج</span>
          </Link>
          <Link to={`/shop/${user?.storeSlug || 'mazhar-store'}`} className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-600 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
            <span>عرض المتجر</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(item => (
          <StatCard key={item.title} title={item.title} value={item.value} icon={item.icon} color={item.color} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">الطلب الشهري</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">الطلبات في آخر {range === '7d' ? '7 أيام' : range === '30d' ? '30 يوم' : '3 أشهر'}</p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>أداء قوي</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 items-end h-52">
            {mockStats.chartData.map(item => (
              <div key={item.day} className="flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40 rounded-2xl bg-gray-50 dark:bg-gray-800 p-1">
                  <div
                    className="w-full rounded-xl bg-gradient-to-t from-emerald-500 to-teal-400"
                    style={{ height: `${(item.orders / maximumOrders) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">تنبيه المخزون</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">منتجات تحتاج إعادة التعبئة</p>
              </div>
            </div>
            <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{lowStock}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">منتج مقبل على النفاد</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">إجراءات سريعة</h2>
            <div className="space-y-3">
              <Link to="/dashboard/products/new" className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                <span>إضافة منتج جديد</span>
                <PlusCircle className="w-4 h-4" />
              </Link>
              <Link to="/dashboard/orders" className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <span>مراجعة الطلبات</span>
                <ShoppingCart className="w-4 h-4" />
              </Link>
              <Link to="/dashboard/settings" className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <span>تعديل إعدادات المتجر</span>
                <PackageCheck className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">آخر الطلبات</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">مخرجات حديثة من عملائك</p>
            </div>
            <Truck className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="space-y-3">
            {mockOrders.map(order => (
              <div key={order.id} className="flex flex-col gap-3 rounded-xl border border-gray-100 dark:border-gray-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{order.id}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerName} • {order.total} ر.س</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass[order.status]}`}>{statusLabel[order.status]}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{order.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">أفضل المنتجات</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">أكثر المنتجات تفاعلًا</p>
            </div>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>

          <div className="space-y-3">
            {bestSelling.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 px-3 py-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">{index + 1}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{product.category} • {product.stock} وحدة في المخزون</p>
                </div>
                <p className="font-bold text-emerald-600 dark:text-emerald-400">{product.discountPrice ?? product.price} ر.س</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
