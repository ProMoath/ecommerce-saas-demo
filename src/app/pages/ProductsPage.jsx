import { useState } from 'react'
import { mockProducts } from '../data/mockData.js'
import { ProductCard } from '../components/shared/ProductCard.jsx'
import { EmptyState } from '../components/shared/EmptyState.jsx'

export function ProductsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const categories = Array.from(new Set(mockProducts.map(p => p.category)))

  const filtered = mockProducts.filter(p => {
    const q = query.trim().toLowerCase()
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    const matchesCat = category === 'all' || p.category === category
    return matchesQuery && matchesCat
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">المنتجات</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{mockProducts.length} منتج متاح</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4">
        <div className="flex gap-3">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="ابحث عن منتج..." className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800">
            <option value="all">كل الفئات</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={() => (<div className="w-6 h-6 bg-gray-300" />)} title="لا يوجد منتجات" description="حاول تغيير معايير البحث" />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
