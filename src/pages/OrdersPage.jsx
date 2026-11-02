import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ClipboardList } from 'lucide-react';

const statuses = ['كل الحالات', 'معلق', 'قيد التنفيذ', 'تم الشحن', 'تم التسليم', 'ملغي'];

export default function OrdersPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('كل الحالات');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-sans text-gray-800 relative w-full">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">الطلبات</h1>
        <div className="text-sm text-gray-500">0 طلب إجمالي</div>
      </header>

      <div className="p-4 flex gap-2">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو رقم الطلب..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
        >
          <span>{selectedStatus}</span>
          <SlidersHorizontal className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center mt-32 text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold mb-2">لا توجد طلبات</h2>
        <p className="text-sm text-gray-500">أضف طلبات إلى متجرك</p>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-xl pb-6">
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-lg font-bold">تصفية الطلبات</h3>
              <X className="w-6 h-6 text-gray-500 cursor-pointer" onClick={() => setIsFilterOpen(false)} />
            </div>
            <div className="flex flex-col">
              {statuses.map((status) => (
                <div 
                  key={status}
                  onClick={() => { setSelectedStatus(status); setIsFilterOpen(false); }}
                  className="flex items-center justify-between p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50"
                >
                  <span className={`text-base ${selectedStatus === status ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{status}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedStatus === status ? 'border-indigo-600' : 'border-gray-400'}`}>
                    {selectedStatus === status && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}