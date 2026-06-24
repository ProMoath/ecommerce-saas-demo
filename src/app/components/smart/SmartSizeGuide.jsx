import { useState } from 'react'
import { X, Ruler, CheckCircle, AlertCircle } from 'lucide-react'
import { mockProducts } from '../../data/mockData.js'

function getSizeRecommendation(m, product) {
  const sizes = product.sizes
  let recommended = sizes[1] || sizes[0]
  for (const s of sizes) {
    if (m.chest >= s.chestFrom && m.chest <= s.chestTo) {
      recommended = s
      break
    }
  }
  if (m.preference === 'loose') {
    const idx = sizes.indexOf(recommended)
    recommended = sizes[Math.min(idx + 1, sizes.length - 1)]
  } else if (m.preference === 'tight') {
    const idx = sizes.indexOf(recommended)
    recommended = sizes[Math.max(idx - 1, 0)]
  }
  return recommended
}

function MeasurementForm({ onSubmit }) {
  const [data, setData] = useState({ preference: 'regular', bodyShape: 'athletic', skinTone: 'medium' })
  const handle = (k, v) => setData(prev => ({ ...prev, [k]: v }))

  const fields = [
    { key: 'chest', label: 'محيط الصدر', unit: 'سم' },
    { key: 'waist', label: 'محيط الخصر', unit: 'سم' },
    { key: 'hip', label: 'محيط الورك', unit: 'سم' },
    { key: 'shoulder', label: 'عرض الكتف', unit: 'سم' },
    { key: 'armLength', label: 'طول الذراع', unit: 'سم' },
    { key: 'height', label: 'الطول', unit: 'سم' },
    { key: 'weight', label: 'الوزن', unit: 'كغ' },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <div className="relative">
              <input type="number" value={data[f.key] || ''} onChange={e => handle(f.key, Number(e.target.value))} className="w-full px-3 py-2 pr-10 border rounded-xl bg-white dark:bg-gray-800 text-sm" placeholder="0" />
              {f.unit && <span className="absolute top-1/2 -translate-y-1/2 left-3 text-xs text-gray-400">{f.unit}</span>}
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">تفضيل القصة</label>
        <div className="flex gap-2">
          {[{ v: 'tight', l: 'ضيق' }, { v: 'regular', l: 'عادي' }, { v: 'loose', l: 'واسع' }].map(o => (
            <button key={o.v} type="button" onClick={() => handle('preference', o.v)} className={`flex-1 py-2 rounded-xl text-sm border ${data.preference === o.v ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>{o.l}</button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">شكل الجسم</label>
        <div className="flex gap-2">
          {[{ v: 'slim', l: 'نحيف' }, { v: 'athletic', l: 'رياضي' }, { v: 'full', l: 'ممتلئ' }].map(o => (
            <button key={o.v} type="button" onClick={() => handle('bodyShape', o.v)} className={`flex-1 py-2 rounded-xl text-sm border ${data.bodyShape === o.v ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>{o.l}</button>
          ))}
        </div>
      </div>

      <button onClick={() => onSubmit(data)} disabled={!data.chest || !data.waist} className="w-full py-3 bg-emerald-600 text-white rounded-xl">احسب مقاسي</button>
    </div>
  )
}

export function SmartSizeGuide({ product, onClose, onSelectSize }) {
  const [measurements, setMeasurements] = useState(null)
  const recommended = measurements ? getSizeRecommendation(measurements, product) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <Ruler className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">غرفة القياس الذكية</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{product.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {!measurements ? (
            <>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 mb-5">
                <p className="text-sm text-emerald-700 dark:text-emerald-400">أدخل مقاساتك لنجد لك المقاس الأنسب من هذا المنتج</p>
              </div>
              <MeasurementForm onSubmit={setMeasurements} />
            </>
          ) : (
            <div className="space-y-5">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 rounded-2xl p-5 text-center">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">المقاس المناسب لك</p>
                <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{recommended?.size}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">صدر: {recommended?.chestFrom}–{recommended?.chestTo} سم | خصر: {recommended?.waistFrom}–{recommended?.waistTo} سم</p>
              </div>

              <div>
                <h4 className="text-sm text-gray-700 dark:text-gray-300 mb-3">مقارنة المقاسات</h4>
                <div className="space-y-2">
                  {product.sizes.map(s => {
                    const isRecommended = s.size === recommended?.size
                    const isTooSmall = s.chestTo < (measurements.chest || 0)
                    const isTooBig = s.chestFrom > (measurements.chest || 0) + 10
                    return (
                      <div key={s.size} className={`flex items-center gap-3 p-3 rounded-xl border ${isRecommended ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${isRecommended ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{s.size}</div>
                        <div className="flex-1 text-sm">
                          <p className="text-gray-700">صدر {s.chestFrom}–{s.chestTo} | خصر {s.waistFrom}–{s.waistTo}</p>
                          {isTooSmall && <p className="text-xs text-orange-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> صغير جداً عليك</p>}
                          {isTooBig && <p className="text-xs text-blue-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> كبير جداً عليك</p>}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-lg ${s.stock > 0 ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-400'}`}>{s.stock > 0 ? `${s.stock} متوفر` : 'نفذ'}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setMeasurements(null)} className="flex-1 py-3 border rounded-xl">تعديل المقاسات</button>
                <button onClick={() => { onSelectSize(recommended?.size || ''); onClose(); }} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl">اختر هذا المقاس</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
