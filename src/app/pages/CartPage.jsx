import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, CreditCard, Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck } from 'lucide-react'
import { useCart } from '../contexts/CartContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import { EmptyState } from '../components/shared/EmptyState.jsx'
import { mockProducts } from '../data/mockData.js'
import { ProductCard } from '../components/shared/ProductCard.jsx'

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart()
  const { user } = useAuth()
  const [note, setNote] = useState('')
  const [promo, setPromo] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(false)

  const subtotal = totalPrice
  const shipping = subtotal >= 500 ? 0 : 40
  const discount = appliedPromo ? 50 : 0
  const total = Math.max(0, subtotal + shipping - discount)

  const handleApplyPromo = () => {
    setAppliedPromo(promo.trim().toUpperCase() === 'MAZHAR10')
  }

  if (!items || items.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">السلة</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">سلة المشتريات</h1>
        </div>
        <EmptyState
          icon={ShoppingBag}
          title="السلة فارغة"
          description="استكشف منتجات مَظهر وأضف العناصر المفضلة لديك قبل أن تُغلق الطلب."
          action={
            <Link to={`/shop/${user?.storeSlug || 'mazhar-store'}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl">
              <ArrowLeft className="w-4 h-4" />
              تصفّح المتجر
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 font-[Cairo]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">سلة المشتريات</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">تابع طلبك خطوة بخطوة</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">لديك {items.length} عنصر في السلة</p>
        </div>
        <button onClick={clearCart} className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-200 dark:border-red-900/40 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
          <Trash2 className="w-4 h-4" />
          تفريغ السلة
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="space-y-4">
          {items.map((item, index) => {
            const unitPrice = item.product.discountPrice ?? item.product.price
            return (
              <div key={`${item.product.id}-${item.size}-${index}`} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 sm:p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="w-full sm:w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">{item.product.category}</p>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{item.product.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">المقاس: {item.size}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{unitPrice * item.quantity} ر.س</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{unitPrice} ر.س للوحدة</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.size)} className="inline-flex items-center gap-2 text-sm text-red-500">
                        <Trash2 className="w-4 h-4" />
                        إزالة
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الطلب</h2>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span className="font-semibold text-gray-900 dark:text-white">{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span className="font-semibold text-gray-900 dark:text-white">{shipping === 0 ? 'مجاناً' : `${shipping} ر.س`}</span>
              </div>
              <div className="flex justify-between">
                <span>الخصم</span>
                <span className="font-semibold text-emerald-600">-{discount} ر.س</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between text-base font-bold text-gray-900 dark:text-white">
                <span>الإجمالي</span>
                <span>{total} ر.س</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">رمز الخصم</label>
              <div className="flex gap-2">
                <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="MAZHAR10" className="flex-1 px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm" />
                <button onClick={handleApplyPromo} className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium">تطبيق</button>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">ملاحظة للطلب</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="معلومات إضافية أو تفضيلات التوصيل" className="w-full px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 resize-none" />
            </div>

            <button className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              إتمام الطلب
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">توصيل سريع</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">توصيل خلال 24-48 ساعة</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">دفع آمن ومضمون</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">قد يعجبك أيضاً</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">منتجات مميزة تناسب ما في سلتك</p>
          </div>
          <Link to={`/shop/${user?.storeSlug || 'mazhar-store'}`} className="text-sm text-emerald-600 dark:text-emerald-400">عرض المزيد</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockProducts.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} storeSlug={user?.storeSlug || 'mazhar-store'} />
          ))}
        </div>
      </div>
    </div>
  )
}
