import { Shirt, Instagram, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Shirt className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl">مَظهر</span>
            </div>
            <p className="text-sm leading-relaxed">
              متجر ملابس ذكي يتيح لك تجربة الملابس افتراضياً واكتشاف مقاسك المناسب.
            </p>
          </div>
          <div>
            <h4 className="text-white mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              {['الرئيسية', 'المتجر', 'المميزات', 'الأسعار', 'تواصل معنا'].map(link => (
                <li key={link}><a href="#" className="hover:text-emerald-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">الدعم</h4>
            <ul className="space-y-2 text-sm">
              {['مركز المساعدة', 'سياسة الخصوصية', 'الشروط والأحكام', 'الإبلاغ عن مشكلة'].map(link => (
                <li key={link}><a href="#" className="hover:text-emerald-400 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">تواصل معنا</h4>
            <p className="text-sm mb-4">support@mazhar.sa</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© 2024 مَظهر. جميع الحقوق محفوظة.</p>
          <p>صُنع بـ ❤️ في المملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  )
}
