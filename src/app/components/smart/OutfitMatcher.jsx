import { X, ShoppingCart, Sparkles } from 'lucide-react'
import { outfitSuggestions } from '../../data/mockData.js'
import { useCart } from '../../contexts/CartContext.jsx'
import { useState } from 'react'

export function OutfitMatcher({ onClose }) {
  const { addItem } = useCart()
  const [addedOutfit, setAddedOutfit] = useState(null)

  const handleAddOutfit = (outfitId, products) => {
    products.forEach(p => addItem(p, p.sizes[0]?.size || 'M'))
    setAddedOutfit(outfitId)
    setTimeout(() => setAddedOutfit(null), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center"><Sparkles className="w-5 h-5 text-purple-600" /></div>
            <h3 className="text-gray-900 dark:text-white">نسّق لي</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">اختر طقماً كاملاً يناسب هذا المنتج</p>

          {outfitSuggestions.map(outfit => (
            <div key={outfit.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-gray-900 dark:text-white">{outfit.name}</h4>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{outfit.totalPrice} ر.س</span>
              </div>

              <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                {outfit.products.map(p => (
                  <div key={p.id} className="flex-shrink-0 w-28">
                    <div className="w-28 h-36 rounded-xl overflow-hidden mb-2"><img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /></div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{p.name}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">{p.discountPrice || p.price} ر.س</p>
                  </div>
                ))}
              </div>

              <button onClick={() => handleAddOutfit(outfit.id, outfit.products)} className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm ${addedOutfit === outfit.id ? 'bg-emerald-600 text-white' : 'border border-emerald-500 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}>
                <ShoppingCart className="w-4 h-4" />
                <span>{addedOutfit === outfit.id ? 'تمت الإضافة ✓' : 'أضف الطقم للسلة'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
