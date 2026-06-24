import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowRight, Upload, Plus, Trash2, X, Save, Image } from 'lucide-react'
import { CATEGORIES, mockProducts } from '../data/mockData.js'

const defaultSizes = [
  { size: 'S', chestFrom: '86', chestTo: '90', waistFrom: '71', waistTo: '75', stock: '10' },
  { size: 'M', chestFrom: '91', chestTo: '96', waistFrom: '76', waistTo: '81', stock: '15' },
  { size: 'L', chestFrom: '97', chestTo: '102', waistFrom: '82', waistTo: '87', stock: '12' },
]

export function AddProductPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const fileRef = useRef(null)

  const existing = isEdit ? mockProducts.find(p => p.id === id) : null

  const [form, setForm] = useState({
    name: existing?.name || '',
    description: existing?.description || '',
    price: existing?.price?.toString() || '',
    discountPrice: existing?.discountPrice?.toString() || '',
    category: existing?.category || CATEGORIES[0],
    brand: existing?.brand || '',
    material: existing?.material || '',
    gender: existing?.gender || 'men',
  })

  const [images, setImages] = useState(existing?.images || [])
  const [sizes, setSizes] = useState(
    (existing?.sizes && existing.sizes.map(s => ({
      size: s.size,
      chestFrom: s.chestFrom.toString(),
      chestTo: s.chestTo.toString(),
      waistFrom: s.waistFrom.toString(),
      waistTo: s.waistTo.toString(),
      stock: s.stock.toString(),
    }))) || defaultSizes
  )
  const [saving, setSaving] = useState(false)

  const handleImageUpload = e => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach(file => {
      const reader = new FileReader()
      reader.onload = ev => {
        if (ev.target?.result) setImages(prev => [...prev, ev.target.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const addSizeRow = () => setSizes(prev => [...prev, { size: '', chestFrom: '', chestTo: '', waistFrom: '', waistTo: '', stock: '' }])
  const removeSizeRow = i => setSizes(prev => prev.filter((_, idx) => idx !== i))
  const updateSize = (i, key, val) => setSizes(prev => prev.map((row, idx) => idx === i ? { ...row, [key]: val } : row))

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    navigate('/dashboard/products')
  }

  const inputCls = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-[Cairo]">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">أملأ التفاصيل أدناه</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic info */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-gray-900 dark:text-white mb-4">المعلومات الأساسية</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">اسم المنتج *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="مثال: قميص قطني أبيض" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">الوصف</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="اكتب وصفاً مفصلاً للمنتج..." rows={3} className={`${inputCls} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">السعر (ر.س) *</label>
                  <input type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">سعر الخصم</label>
                  <input type="number" value={form.discountPrice} onChange={e => setForm(p => ({ ...p, discountPrice: e.target.value }))} placeholder="0" className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-gray-900 dark:text-white mb-4">التفاصيل</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">القسم</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">الماركة</label>
                <input value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} placeholder="مظهر" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">الخامة</label>
                <input value={form.material} onChange={e => setForm(p => ({ ...p, material: e.target.value }))} placeholder="قطن 100%" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">الجنس</label>
                <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))} className={inputCls}>
                  <option value="men">رجالي</option>
                  <option value="women">نسائي</option>
                  <option value="unisex">مختلط</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sizes table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-900 dark:text-white">جدول المقاسات</h2>
              <button onClick={addSizeRow} className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                <Plus className="w-4 h-4" /> إضافة صف
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    {['المقاس', 'صدر من', 'صدر إلى', 'خصر من', 'خصر إلى', 'المخزون', ''].map(h => (
                      <th key={h} className="pb-2 text-right text-xs text-gray-500 dark:text-gray-400 font-medium px-1">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row, i) => (
                    <tr key={i}>
                      {(['size', 'chestFrom', 'chestTo', 'waistFrom', 'waistTo', 'stock']).map(k => (
                        <td key={k} className="py-1 px-1">
                          <input
                            value={row[k]}
                            onChange={e => updateSize(i, k, e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            placeholder={k === 'size' ? 'M' : '0'}
                          />
                        </td>
                      ))}
                      <td className="py-1 px-1">
                        <button onClick={() => removeSizeRow(i)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar - Images */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
            <h2 className="text-gray-900 dark:text-white mb-4">صور المنتج</h2>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />

            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors mb-4"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">اضغط لرفع الصور</p>
              <p className="text-xs text-gray-400">PNG, JPG حتى 5MB</p>
            </button>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img} alt="" className="w-full aspect-square object-cover rounded-xl" />
                    <button
                      onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {i === 0 && <div className="absolute bottom-1 left-1 text-xs bg-emerald-600 text-white px-1.5 py-0.5 rounded-lg">رئيسية</div>}
                  </div>
                ))}
              </div>
            )}

            {images.length === 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Image className="w-4 h-4" />
                <span>لم يتم رفع صور بعد</span>
              </div>
            )}
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving || !form.name || !form.price}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>{isEdit ? 'حفظ التعديلات' : 'نشر المنتج'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
