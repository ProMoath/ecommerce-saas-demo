import { useState } from 'react'
import { mockProducts } from '../../data/mockData.js'

export function VirtualModel({ product }) {
  const [show, setShow] = useState(false)
  if (!product) return null
  return (
    <div className="fixed bottom-6 left-6">
      <button onClick={() => setShow(s => !s)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl">العرض الافتراضي</button>
      {show && (
        <div className="mt-3 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">نموذج افتراضي لعرض المنتج (تجريبي)</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {mockProducts.slice(0, 3).map(p => (
              <img key={p.id} src={p.images[0]} alt={p.name} className="w-full h-24 object-cover rounded" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
