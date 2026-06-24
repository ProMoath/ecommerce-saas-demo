import { AlertTriangle, X } from 'lucide-react'

export function ConfirmDialog({ isOpen, title, message, confirmText = 'تأكيد', cancelText = 'إلغاء', onConfirm, onCancel, danger = false }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <button onClick={onCancel} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${danger ? 'bg-red-100' : 'bg-emerald-100'}`}>
          <AlertTriangle className={`w-6 h-6 ${danger ? 'text-red-600' : 'text-emerald-600'}`} />
        </div>
        <h3 className="text-center text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded-xl">{cancelText}</button>
          <button onClick={onConfirm} className={`flex-1 px-4 py-2 rounded-xl text-white ${danger ? 'bg-red-600' : 'bg-emerald-600'}`}>{confirmText}</button>
        </div>
      </div>
    </div>
  )
}
