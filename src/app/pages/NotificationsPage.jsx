import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { BellRing, Bell, AlertTriangle, ShoppingBag, ShieldCheck, ShieldAlert, CheckCheck, Trash2, Clock3, Inbox, MailOpen } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { EmptyState } from '../components/shared/EmptyState.jsx'
import {
  deleteNotification,
  fetchNotificationsForUser,
  markAllNotificationsRead,
  markNotificationRead,
  subscribeToNotificationUpdates,
} from '../lib/mockNotifications.js'

const typeMeta = {
  stock: {
    icon: AlertTriangle,
    accent: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300',
    label: 'نفاد المخزون',
  },
  order: {
    icon: ShoppingBag,
    accent: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300',
    label: 'طلبات جديدة',
  },
  platform: {
    icon: BellRing,
    accent: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300',
    label: 'تحديثات المنصة',
  },
  admin: {
    icon: ShieldAlert,
    accent: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
    label: 'إشعار إداري',
  },
}

function formatRelativeTime(isoDate) {
  const date = new Date(isoDate)
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const absoluteSeconds = Math.abs(diffSeconds)

  const units = [
    { limit: 60, seconds: 1, label: 'ثانية' },
    { limit: 3600, seconds: 60, label: 'دقيقة' },
    { limit: 86400, seconds: 3600, label: 'ساعة' },
    { limit: 2592000, seconds: 86400, label: 'يوم' },
  ]

  const selected = units.find(unit => absoluteSeconds < unit.limit) || { seconds: 2592000, label: 'شهر' }
  const value = Math.max(1, Math.round(absoluteSeconds / selected.seconds))
  return diffSeconds > 0 ? `خلال ${value} ${selected.label}` : `منذ ${value} ${selected.label}`
}

export function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionId, setActionId] = useState('')
  const userId = user?.id || ''

  const unreadCount = useMemo(() => notifications.filter(notification => !notification.is_read).length, [notifications])

  const loadNotifications = () => {
    if (!userId) {
      setNotifications([])
      setLoading(false)
      return
    }

    setLoading(true)
    // لاحقاً: هنا يُستبدل استدعاء الموك التالي باستدعاء Supabase الحقيقي:
    // const { data, error } = await supabase
    //   .from('notifications')
    //   .select('id, user_id, type, title, message, is_read, created_at')
    //   .eq('user_id', userId)
    //   .order('created_at', { ascending: false })
    // if (error) throw error
    // setNotifications(data ?? [])
    setNotifications(fetchNotificationsForUser(userId))
    setLoading(false)
  }

  useEffect(() => {
    loadNotifications()
    return subscribeToNotificationUpdates(loadNotifications)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const handleMarkRead = notificationId => {
    setActionId(notificationId)
    markNotificationRead(userId, notificationId)
    loadNotifications()
    setActionId('')
  }

  const handleDelete = notificationId => {
    setActionId(notificationId)
    deleteNotification(userId, notificationId)
    loadNotifications()
    setActionId('')
  }

  const handleMarkAllRead = () => {
    setActionId('all')
    markAllNotificationsRead(userId)
    loadNotifications()
    setActionId('')
  }

  if (!userId) {
    return (
      <div className="space-y-6 font-[Cairo]">
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">الإشعارات</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إشعارات المتجر</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تظهر هنا إشعاراتك الشخصية فقط.</p>
        </div>

        <EmptyState
          icon={Bell}
          title="سجّل دخولك أولاً"
          description="الإشعارات مرتبطة بالمستخدم المسجل فقط. بعد الدخول ستظهر إشعارات نفاد المخزون والطلبات والتحديثات الإدارية هنا."
          action={
            <Link to="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl">
              <MailOpen className="w-4 h-4" />
              تسجيل الدخول
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
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold mb-1">الإشعارات</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">مركز الإشعارات</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تابع نفاد المخزون، الطلبات الجديدة، وتحديثات المنصة من هنا.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
            <Bell className="w-4 h-4" />
            <span>{unreadCount} غير مقروء</span>
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || actionId === 'all'}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
          >
            <CheckCheck className="w-4 h-4" />
            تحديد الكل كمقروء
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">ملاحظات سريعة</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">يمكنك تحديد المقروء أو حذف الإشعارات بسهولة.</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-4 text-sm text-gray-600 dark:text-gray-300 leading-7">
            <p>• إشعارات المخزون المنخفض تساعدك على إعادة الطلب في الوقت المناسب.</p>
            <p>• إشعارات الطلبات الجديدة تظهر فور ورود أي طلب جديد إلى متجرك.</p>
            <p>• إشعارات الإدارة والتنبيهات العامة تظهر في نفس القائمة بترتيب زمني.</p>
          </div>

          <div className="rounded-2xl border border-dashed border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/60 dark:bg-emerald-900/10 p-4 text-sm text-emerald-800 dark:text-emerald-200">
            <p className="font-medium mb-1">تبديل Supabase لاحقًا</p>
            <p className="leading-7">
              استبدل دالة <span className="font-semibold">fetchNotificationsForUser</span> في <span className="font-semibold">src/app/lib/mockNotifications.js</span>{' '}
              باستدعاء <span className="font-semibold">supabase.from('notifications').select(...)</span>، ثم اترك نفس الواجهة كما هي.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center text-gray-500 dark:text-gray-400">
              جاري تحميل الإشعارات...
            </div>
          ) : notifications.length === 0 ? (
            <EmptyState
              icon={BellRing}
              title="لا توجد إشعارات حالياً"
              description="عندما تصل إشعارات جديدة ستظهر هنا، مرتبة من الأحدث إلى الأقدم."
            />
          ) : (
            notifications.map(notification => {
              const meta = typeMeta[notification.type] || typeMeta.platform
              const Icon = meta.icon
              return (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-gray-900 rounded-2xl border p-5 transition-all ${notification.is_read ? 'border-gray-100 dark:border-gray-800' : 'border-emerald-200 dark:border-emerald-900/50 shadow-sm shadow-emerald-100/40 dark:shadow-none'}`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4 min-w-0">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${meta.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="text-base font-bold text-gray-900 dark:text-white">{notification.title}</h3>
                          {!notification.is_read && (
                            <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 text-xs font-semibold">
                              غير مقروء
                            </span>
                          )}
                          <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium">
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-7">{notification.message}</p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="w-3.5 h-3.5" />
                            {formatRelativeTime(notification.created_at)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {notification.is_read ? 'مقروء' : 'يحتاج مراجعة'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkRead(notification.id)}
                          disabled={actionId === notification.id}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-60"
                        >
                          <CheckCheck className="w-4 h-4" />
                          تحديد كمقروء
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        disabled={actionId === notification.id}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-60"
                      >
                        <Trash2 className="w-4 h-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Supabase SQL notes for later integration:
        create table public.notifications (
          id uuid primary key default gen_random_uuid(),
          user_id uuid not null references auth.users(id) on delete cascade,
          type text not null check (type in ('stock','order','platform','admin')),
          title text not null,
          message text not null,
          is_read boolean not null default false,
          created_at timestamptz not null default now()
        );

        alter table public.notifications enable row level security;

        create policy "users can read own notifications"
        on public.notifications
        for select
        using (auth.uid() = user_id);

        create policy "users can update own notifications"
        on public.notifications
        for update
        using (auth.uid() = user_id)
        with check (auth.uid() = user_id);

        create policy "users can delete own notifications"
        on public.notifications
        for delete
        using (auth.uid() = user_id);
      */}
    </div>
  )
}
