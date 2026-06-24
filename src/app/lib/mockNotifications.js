const STORAGE_KEY = 'mazhar-notifications'
const UPDATE_EVENT = 'mazhar-notifications-updated'

const baseSeeds = [
  {
    type: 'stock',
    title: 'نفاد مخزون مقاس M',
    message: 'الكمية المتبقية من قميص أبيض كلاسيكي أصبحت 3 قطع فقط.',
    is_read: false,
    created_at: '2026-06-15T08:15:00.000Z',
  },
  {
    type: 'order',
    title: 'طلب جديد تم استقباله',
    message: 'وصل طلب جديد من العميل أحمد محمد بقيمة 448 ر.س.',
    is_read: false,
    created_at: '2026-06-15T07:42:00.000Z',
  },
  {
    type: 'platform',
    title: 'تحديث جديد في المنصة',
    message: 'أضفنا تحسينات على عرض المنتجات وسرعة تصفح صفحة المتجر.',
    is_read: true,
    created_at: '2026-06-14T18:20:00.000Z',
  },
  {
    type: 'admin',
    title: 'تنبيه إداري',
    message: 'يرجى مراجعة بيانات المتجر وتحديث شعارك إن لزم الأمر.',
    is_read: false,
    created_at: '2026-06-14T16:05:00.000Z',
  },
]

const createSeed = (userId, offset = 0) =>
  baseSeeds.map((notification, index) => ({
    id: `${userId}-notif-${index + 1}`,
    user_id: userId,
    ...notification,
    created_at: new Date(Date.parse(notification.created_at) - offset).toISOString(),
  }))

const readAllNotifications = () => {
  if (typeof window === 'undefined') return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

const writeAllNotifications = notifications => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT))
}

const sortLatestFirst = notifications =>
  [...notifications].sort((left, right) => new Date(right.created_at) - new Date(left.created_at))

export function fetchNotificationsForUser(userId) {
  // لاحقاً: استبدل هذه الدالة باستدعاء Supabase الحقيقي:
  // const { data, error } = await supabase
  //   .from('notifications')
  //   .select('id, user_id, type, title, message, is_read, created_at')
  //   .eq('user_id', userId)
  //   .order('created_at', { ascending: false })
  // إذا فشل الاتصال، ارجع إلى بيانات mock المحفوظة محلياً كما نفعل هنا.
  if (!userId) return []

  const allNotifications = readAllNotifications()
  const userNotifications = allNotifications.filter(notification => notification.user_id === userId)

  if (userNotifications.length === 0) {
    const seeded = createSeed(userId, Date.now() % 120000)
    writeAllNotifications([...allNotifications, ...seeded])
    return sortLatestFirst(seeded)
  }

  return sortLatestFirst(userNotifications)
}

export function getUnreadNotificationsCount(userId) {
  if (!userId) return 0
  return fetchNotificationsForUser(userId).filter(notification => !notification.is_read).length
}

export function markNotificationRead(userId, notificationId) {
  // Supabase لاحقاً:
  // await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId).eq('user_id', userId)
  const notifications = readAllNotifications().map(notification =>
    notification.user_id === userId && notification.id === notificationId
      ? { ...notification, is_read: true }
      : notification
  )
  writeAllNotifications(notifications)
}

export function deleteNotification(userId, notificationId) {
  // Supabase لاحقاً:
  // await supabase.from('notifications').delete().eq('id', notificationId).eq('user_id', userId)
  const notifications = readAllNotifications().filter(notification => !(notification.user_id === userId && notification.id === notificationId))
  writeAllNotifications(notifications)
}

export function markAllNotificationsRead(userId) {
  // Supabase لاحقاً:
  // await supabase.from('notifications').update({ is_read: true }).eq('user_id', userId).eq('is_read', false)
  const notifications = readAllNotifications().map(notification =>
    notification.user_id === userId ? { ...notification, is_read: true } : notification
  )
  writeAllNotifications(notifications)
}

export function subscribeToNotificationUpdates(callback) {
  if (typeof window === 'undefined') return () => {}

  const refresh = () => callback()
  window.addEventListener(UPDATE_EVENT, refresh)
  window.addEventListener('storage', refresh)

  return () => {
    window.removeEventListener(UPDATE_EVENT, refresh)
    window.removeEventListener('storage', refresh)
  }
}
