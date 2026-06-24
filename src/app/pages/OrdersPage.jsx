import { useState } from 'react'
import { ShoppingBag, Search, Eye, MessageCircle } from 'lucide-react'
import { mockOrders } from '../data/mockData.js'
import { EmptyState } from '../components/shared/EmptyState.jsx'

const statusMap = {
  pending: { label: 'معلق', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  processing: { label: 'قيد التنفيذ', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  shipped: { label: 'تم الشحن', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
  delivered: { label: 'تم التسليم', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
  cancelled: { label: 'ملغي', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
}

export function OrdersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filtered = mockOrders.filter(o => {
    const matchSearch = o.customerName.includes(search) || o.id.includes(search)
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const whatsappContact = (phone, orderId) => {
    const msg = `مرحباً، بخصوص طلبك رقم ${orderId}...`
    window.open(`https://wa.me/966${phone.slice(1)}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="space-y-6 font-[Cairo]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الطلبات</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockOrders.length} طلب إجمالاً</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو رقم الطلب..."
              className="w-full pr-10 pl-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">كل الحالات</option>
            {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="لا توجد طلبات" description="لم يتم العثور على طلبات تطابق بحثك" />
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {['رقم الطلب', 'العميل', 'الهاتف', 'المبلغ', 'التاريخ', 'الحالة', 'إجراءات'].map(h => (
                    <th key={h} className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{order.customerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400" dir="ltr">{order.phone}</td>
                    <td className="px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">{order.total} ر.س</td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${statusMap[order.status]?.color}`}>
                        {statusMap[order.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedOrder(order)} className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => whatsappContact(order.phone, order.id)}
                          className="p-2 rounded-lg text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order detail modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <h3 className="text-gray-900 dark:text-white mb-4">تفاصيل طلب {selectedOrder.id}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">العميل</span>
                <span className="text-gray-900 dark:text-white">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">الهاتف</span>
                <span dir="ltr" className="text-gray-900 dark:text-white">{selectedOrder.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">العنوان</span>
                <span className="text-gray-900 dark:text-white text-left max-w-xs">{selectedOrder.address}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                <p className="text-gray-600 dark:text-gray-400 mb-2">المنتجات</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{item.productName} × {item.quantity} ({item.size})</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{item.price * item.quantity} ر.س</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold border-t border-gray-100 dark:border-gray-800 pt-3">
                <span className="text-gray-900 dark:text-white">الإجمالي</span>
                <span className="text-emerald-600 dark:text-emerald-400">{selectedOrder.total} ر.س</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setSelectedOrder(null)} className="flex-1 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                إغلاق
              </button>
              <button
                onClick={() => whatsappContact(selectedOrder.phone, selectedOrder.id)}
                className="flex-1 py-2 bg-green-500 text-white rounded-xl text-sm hover:bg-green-600 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> تواصل عبر واتساب
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
