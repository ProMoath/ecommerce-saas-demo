import { Link } from 'react-router'
import { Shirt, Home, Search } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'

export function NotFoundPage() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 font-[Cairo]" dir="rtl">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Shirt className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="text-7xl font-black text-emerald-600 dark:text-emerald-400 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">الصفحة غير موجودة</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          يبدو أن الصفحة التي تبحث عنها لم تعد موجودة أو تم نقلها.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>الصفحة الرئيسية</span>
          </Link>
          <Link
            to={`/shop/${user?.storeSlug || 'mazhar-store'}`}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>تصفّح المتجر</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
 
