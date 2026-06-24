import { useState } from 'react'
import { useParams } from 'react-router'
import { mockProducts } from '../data/mockData.js'

export function VotePage() {
  const { id } = useParams()
  const product = mockProducts.find(p => String(p.id) === String(id))
  const [vote, setVote] = useState(null)

  if (!product) return <div className="p-6">المنتج غير موجود</div>

  const handleVote = v => {
    // placeholder - in real app send to API
    setVote(v)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 font-[Cairo]">
      <div className="flex items-center gap-4">
        <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{product.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">شارك رأيك بسرعة</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center">
        <p className="mb-4">ما رأيك بهذا المنتج؟</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => handleVote('like')} className={`px-6 py-3 rounded-xl ${vote === 'like' ? 'bg-emerald-600 text-white' : 'border border-gray-200'}`}>أعجبني</button>
          <button onClick={() => handleVote('dislike')} className={`px-6 py-3 rounded-xl ${vote === 'dislike' ? 'bg-red-500 text-white' : 'border border-gray-200'}`}>لم يعجبني</button>
        </div>
        {vote && <p className="mt-4 text-sm">شكراً لمشاركتك!</p>}
      </div>
    </div>
  )
}
