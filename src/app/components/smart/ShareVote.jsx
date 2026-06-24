import { X, Share2, MessageCircle, Link2, ThumbsUp, ThumbsDown } from 'lucide-react'

export function ShareVote({ product, onClose }) {
  const votes = product.votes || { likes: 0, dislikes: 0 }
  const total = votes.likes + votes.dislikes
  const likePercent = total > 0 ? Math.round((votes.likes / total) * 100) : 0
  const dislikePercent = 100 - likePercent

  const voteUrl = `${window.location.origin}/vote/${product.id}`
  const shareWhatsapp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`شاهد هذا المنتج: ${product.name}\n${voteUrl}`)}`, '_blank')
  const copyLink = () => navigator.clipboard.writeText(voteUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/40 flex items-center justify-center"><Share2 className="w-5 h-5 text-pink-600" /></div>
            <h3 className="text-gray-900 dark:text-white">مشاركة وتصويت</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <img src={product.images[0]} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
              <p className="text-xs text-emerald-600">{product.discountPrice || product.price} ر.س</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">نتائج التصويت</p>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-1.5 text-sm text-emerald-600"><ThumbsUp className="w-4 h-4" /> <span>{votes.likes} ({likePercent}%)</span></div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden"><div className="h-full bg-emerald-500 rounded-full" style={{ width: `${likePercent}%` }} /></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-red-500"><ThumbsDown className="w-4 h-4" /> <span>{votes.dislikes} ({dislikePercent}%)</span></div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden"><div className="h-full bg-red-400 rounded-full" style={{ width: `${dislikePercent}%` }} /></div>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{total} مشاركة</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">شارك مع أصدقائك</p>
            <div className="space-y-2">
              <button onClick={shareWhatsapp} className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 rounded-xl"> <MessageCircle className="w-5 h-5" /> <span className="text-sm">مشاركة عبر واتساب</span></button>
              <button onClick={copyLink} className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 rounded-xl"> <Link2 className="w-5 h-5" /> <span className="text-sm">نسخ الرابط</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
