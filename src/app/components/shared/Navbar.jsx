import { Bell, Shirt, Moon, Sun, ShoppingCart, Menu, X, LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useTheme } from '../../contexts/ThemeContext.jsx'
import { useCart } from '../../contexts/CartContext.jsx'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { getUnreadNotificationsCount, subscribeToNotificationUpdates } from '../../lib/mockNotifications.js'

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { totalItems } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const isShopPage = location.pathname.startsWith('/shop/')
  const showNavLinks = !isShopPage || isAuthenticated
  const showMobileMenu = showNavLinks

  useEffect(() => {
    const refresh = () => setUnreadNotifications(getUnreadNotificationsCount(user?.id || ''))
    refresh()
    return subscribeToNotificationUpdates(refresh)
  }, [user?.id])

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Shirt className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">مَظهر</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {showNavLinks ? (
            <>
              <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">الرئيسية</Link>
              <Link to={`/shop/${user?.storeSlug || 'mazhar-store'}`} className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">المتجر</Link>
              <Link to="/local" className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">رفع محلي</Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">لوحة التحكم</Link>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-400 dark:text-gray-500">تصفح الضيف</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400">
            <Bell className="w-5 h-5" />
            {isAuthenticated && unreadNotifications > 0 && (
              <span className="absolute -top-1 -left-1 min-w-5 h-5 px-1 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-emerald-700 dark:text-emerald-300 text-sm font-bold">
                {user?.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" /> : user?.name?.[0]}
              </div>
              <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500 transition-colors">خروج</button>
            </div>
          ) : (
            !isShopPage && (
              <Link to="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700 transition-colors">
                <LogIn className="w-4 h-4" />
                <span>دخول</span>
              </Link>
            )
          )}
          {showMobileMenu && (
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-3">
          {showNavLinks && (
            <>
              <Link to="/" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
              <Link to={`/shop/${user?.storeSlug || 'mazhar-store'}`} className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>المتجر</Link>
              <Link to="/local" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>رفع محلي</Link>
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className="block text-gray-700 dark:text-gray-300 py-2" onClick={() => setMenuOpen(false)}>لوحة التحكم</Link>
                  <button onClick={() => { logout(); setMenuOpen(false); }} className="block text-red-500 py-2">تسجيل الخروج</button>
                </>
              )}
            </>
          )}
          {!showNavLinks && isAuthenticated && (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="block text-red-500 py-2">تسجيل الخروج</button>
          )}
          {!showNavLinks && !isAuthenticated && (
            <p className="text-sm text-gray-500 dark:text-gray-400">تصفح المنتج فقط</p>
          )}
        </div>
      )}
    </nav>
  )
}
