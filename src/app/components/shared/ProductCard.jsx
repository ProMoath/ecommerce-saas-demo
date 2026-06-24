import { ShoppingCart, Share2, Tag } from 'lucide-react'
import { useCart } from '../../contexts/CartContext.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function ProductCard({ product, storeSlug = 'mazhar-store', onShare }) {
  const { items, addItem, updateQuantity } = useCart()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const defaultSize = product.sizes[0]?.size || 'M'
  const cartItem = items.find(i => i.product.id === product.id && i.size === defaultSize)
  const quantity = cartItem?.quantity || 0

  const handleAddToCart = e => {
    e.stopPropagation()
    addItem(product, defaultSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleDecrease = e => {
    e.stopPropagation()
    updateQuantity(product.id, defaultSize, quantity - 1)
  }

  const handleIncrease = e => {
    e.stopPropagation()
    addItem(product, defaultSize)
  }

  const handleShare = e => {
    e.stopPropagation()
    const url = `${window.location.origin}/vote/${product.id}`
    if (navigator.share) navigator.share({ title: product.name, url })
    else navigator.clipboard.writeText(url)
    onShare?.()
  }

  const discountPercent = product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => navigate(`/shop/${storeSlug}/product/${product.id}`)}>
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discountPercent > 0 && (<div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1"><Tag className="w-3 h-3" /> <span>{discountPercent}% خصم</span></div>)}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleShare} className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-900/90 flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-1">{product.category}</p>
        <h3 className="text-gray-900 dark:text-white mb-2 truncate">{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{product.discountPrice} ر.س</span>
              <span className="text-sm text-gray-400 line-through">{product.price} ر.س</span>
            </>
          ) : (
            <span className="font-bold text-gray-900 dark:text-white">{product.price} ر.س</span>
          )}
        </div>
        <button onClick={handleAddToCart} className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-sm transition-all ${added ? 'bg-emerald-600 text-white' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 hover:bg-emerald-600 hover:text-white'}`}>
          <ShoppingCart className="w-4 h-4" />
          <span>أضف للسلة</span>
        </button>
        {quantity > 0 && (
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={handleDecrease}
              className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              -
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">عدد مرات الإضافة</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{quantity}</p>
            </div>
            <button
              onClick={handleIncrease}
              className="w-9 h-9 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
