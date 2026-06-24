import { useState } from 'react'
import { useParams } from 'react-router'
import { ShoppingCart, Tag, Share2 } from 'lucide-react'
import { mockProducts } from '../data/mockData.js'
import { ProductCard } from '../components/shared/ProductCard.jsx'
import { SmartSizeGuide } from '../components/smart/SmartSizeGuide.jsx'
import { ShareVote } from '../components/smart/ShareVote.jsx'
import { OutfitMatcher } from '../components/smart/OutfitMatcher.jsx'
import { VirtualModel } from '../components/smart/VirtualModel.jsx'
import { ImageWithFallback } from '../components/shared/ImageWithFallback.jsx'

export function ProductPage() {
  const { id } = useParams()
  const product = mockProducts.find(p => String(p.id) === String(id))
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [outfitOpen, setOutfitOpen] = useState(false)

  if (!product) return <div className="p-6">المنتج غير موجود</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ImageWithFallback src={product.images[0]} alt={product.name} className="w-full h-[480px] object-cover rounded-2xl" />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-emerald-600">{product.discountPrice || product.price} ر.س</div>
            {product.discountPrice && <div className="text-sm text-gray-400 line-through">{product.price} ر.س</div>}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setSizeGuideOpen(true)} className="py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700">مقاسي</button>
            <button onClick={() => setShareOpen(true)} className="py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700">مشاركة</button>
            <button onClick={() => setOutfitOpen(true)} className="py-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700">نسق طقم</button>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-2">الوصف</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3">منتجات مشابهة</h4>
            <div className="grid grid-cols-2 gap-3">
              {mockProducts.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {sizeGuideOpen && <SmartSizeGuide product={product} onClose={() => setSizeGuideOpen(false)} onSelectSize={() => {}} />}
      {shareOpen && <ShareVote product={product} onClose={() => setShareOpen(false)} />}
      {outfitOpen && <OutfitMatcher onClose={() => setOutfitOpen(false)} />}
      <VirtualModel product={product} />
    </div>
  )
}
