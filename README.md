<div align="center">

<br />

# 🛍️ مَظهر — Mazhar

### منصة SaaS ذكية لإنشاء متاجر الملابس الإلكترونية

<br />

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.17-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](./LICENSE)

<br />

> **مَظهر** هي منصة SaaS متكاملة تُمكّن أصحاب متاجر الملابس من إنشاء متاجرهم الإلكترونية الخاصة في دقائق، مع مجموعة من الأدوات الذكية التي تُحسّن تجربة التسوق وتُقلّل من معدلات الإرجاع.

<br />

![Hero Banner](https://images.unsplash.com/photo-1777458300190-10caf494efe1?w=1200&q=80)

</div>

---

## 📑 فهرس المحتويات

- [✨ نظرة عامة](#-نظرة-عامة)
- [🚀 الميزات الرئيسية](#-الميزات-الرئيسية)
- [🧠 الميزات الذكية](#-الميزات-الذكية)
- [🗂️ بنية المشروع](#️-بنية-المشروع)
- [🛣️ صفحات التطبيق والمسارات](#️-صفحات-التطبيق-والمسارات)
- [🔐 نظام المصادقة](#-نظام-المصادقة)
- [🛒 إدارة عربة التسوق](#-إدارة-عربة-التسوق)
- [🎨 نظام التصميم](#-نظام-التصميم)
- [⚙️ المتطلبات والتثبيت](#️-المتطلبات-والتثبيت)
- [🔧 التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [📦 بنية الـ Commits](#-بنية-الـ-commits)
- [🗺️ خارطة الطريق](#️-خارطة-الطريق)

---

## ✨ نظرة عامة

**مَظهر** هي منصة SaaS (Software as a Service) متخصصة في قطاع الأزياء والملابس، تتيح لأي بائع أو مصمم إنشاء متجر إلكتروني احترافي بشكل مستقل دون الحاجة إلى خبرة تقنية.

تتميز المنصة بمجموعة فريدة من الأدوات الذكية المدمجة، مثل غرفة القياس الذكية والموديل الافتراضي ومنسّق الأزياء — وكلها تهدف إلى تحسين تجربة التسوق الإلكتروني وتقليل العوائق الشائعة كاختيار المقاس الخاطئ.

### لمن هذه المنصة؟

| الفئة | الاستخدام |
|-------|-----------|
| 👗 **أصحاب متاجر الملابس** | إنشاء متجر احترافي وإدارة المنتجات والطلبات |
| 🎨 **مصممو الأزياء** | عرض تصاميمهم بطريقة تفاعلية ومبتكرة |
| 🛍️ **المتسوقون** | تجربة ملابس افتراضية واكتشاف المقاس المناسب |

---

## 🚀 الميزات الرئيسية

### 🏪 إدارة المتجر
- **إنشاء متجر فوري** — رابط مخصص لكل متجر بصيغة `/shop/:slug`
- **تخصيص كامل** — شعار، بانر، اسم، وصف، ورقم تواصل
- **لوحة تحكم شاملة** — إحصائيات المبيعات، الطلبات، والمخزون في مكان واحد
- **إدارة المنتجات** — إضافة، تعديل، وحذف المنتجات بسهولة
- **تتبع الطلبات** — متابعة حالة كل طلب (معلق، قيد التنفيذ، تم الشحن، تم التسليم)

### 🛒 تجربة التسوق
- **تصفية المنتجات** — بحث بالاسم أو الفئة مع تصفية ديناميكية
- **عربة التسوق** — إضافة وإزالة المنتجات مع حساب الإجمالي تلقائياً
- **صفحة المنتج** — عرض تفصيلي مع صور، مقاسات، وسعر قبل وبعد الخصم
- **إشعارات فورية** — مركز إشعارات متكامل لمتابعة أحداث المتجر

### 📊 لوحة التحكم
- **إحصائيات لحظية** — عدد المنتجات، الطلبات، الزوار، والإيرادات
- **مخطط بياني** — تتبع الطلبات الأسبوعية والشهرية
- **تنبيه المخزون** — تحذير فوري عند اقتراب نفاد المنتجات
- **آخر الطلبات** — عرض أحدث الطلبات مع حالتها
- **أفضل المنتجات** — ترتيب المنتجات الأكثر مبيعاً

---

## 🧠 الميزات الذكية

هذا ما يميّز **مَظهر** عن أي منصة تجارة إلكترونية أخرى:

### 📏 غرفة القياس الذكية — `SmartSizeGuide`
أداة متقدمة تحلل مقاسات المستخدم الفعلية وتوصي بالمقاس المثالي لكل منتج.

**كيف تعمل:**
1. يُدخل المستخدم مقاساته (صدر، خصر، ورك، كتف، ذراع، طول، وزن)
2. يحدد تفضيل القصة (ضيق / عادي / واسع) وشكل الجسم
3. يحصل فوراً على توصية المقاس المناسب مع مقارنة بين كل المقاسات المتاحة

```
المدخلات: مقاسات الجسم + تفضيل القصة + شكل الجسم
     ↓
خوارزمية المطابقة (chest range matching + preference offset)
     ↓
المخرجات: المقاس الموصى به + مقارنة كاملة مع المخزون المتاح
```

### 👗 منسّق الأزياء — `OutfitMatcher`
يقترح أطقماً متكاملة ومتناسقة بناءً على المنتج المختار وتفضيلات المستخدم وميزانيته.

### 🧍 الموديل الافتراضي — `VirtualModel`
يُظهر كيف سيبدو المنتج على جسم يشبه المستخدم حسب شكل الجسم ولون البشرة — تجربة تسوق بصرية فريدة.

### 👍 تصويت الأصدقاء — `ShareVote`
قبل أن تشتري، شارك المنتج مع أصدقائك واجمع آراءهم عبر رابط تصويت مخصص لكل منتج (`/vote/:productId`).

---

## 🗂️ بنية المشروع

```
E-commerace/
├── 📄 index.html                    # نقطة الدخول الرئيسية
├── 📦 package.json                  # تبعيات المشروع
├── ⚙️  vite.config.js               # إعدادات Vite
├── 🎨 postcss.config.mjs            # إعدادات PostCSS
│
└── src/
    ├── 🚀 main.jsx                  # نقطة تشغيل React
    ├── 🎨 styles/
    │   ├── index.css                # الأنماط العامة
    │   ├── theme.css                # متغيرات الألوان والثيم
    │   ├── tailwind.css             # استيراد Tailwind
    │   └── fonts.css                # إعداد الخطوط (Cairo)
    │
    └── app/
        ├── 📱 App.jsx               # المكوّن الجذري مع مزودي السياق
        ├── 🛣️  routes.jsx            # تعريف جميع مسارات التطبيق
        │
        ├── 📂 contexts/             # إدارة الحالة العامة
        │   ├── AuthContext.jsx      # مصادقة المستخدمين (Login/Register/Profile)
        │   ├── CartContext.jsx      # حالة عربة التسوق
        │   └── ThemeContext.jsx     # الوضع الليلي/النهاري
        │
        ├── 📂 pages/                # صفحات التطبيق الرئيسية
        │   ├── LandingPage.jsx      # الصفحة الرئيسية (Landing)
        │   ├── LoginPage.jsx        # تسجيل الدخول
        │   ├── RegisterPage.jsx     # إنشاء حساب جديد
        │   ├── ShopPage.jsx         # واجهة المتجر للعملاء
        │   ├── ProductsPage.jsx     # قائمة المنتجات (داشبورد)
        │   ├── ProductPage.jsx      # صفحة تفاصيل المنتج
        │   ├── AddProductPage.jsx   # إضافة/تعديل منتج
        │   ├── CartPage.jsx         # عربة التسوق
        │   ├── DashboardPage.jsx    # لوحة التحكم الرئيسية
        │   ├── OrdersPage.jsx       # إدارة الطلبات
        │   ├── SettingsPage.jsx     # إعدادات الحساب والمتجر
        │   ├── NotificationsPage.jsx# مركز الإشعارات
        │   ├── LocalPage.jsx        # صفحة المتاجر المحلية
        │   ├── VotePage.jsx         # تصويت الأصدقاء على المنتجات
        │   └── NotFoundPage.jsx     # صفحة 404
        │
        ├── 📂 components/
        │   ├── shared/              # مكوّنات مشتركة عبر التطبيق
        │   │   ├── Navbar.jsx                    # شريط التنقل
        │   │   ├── Footer.jsx                    # تذييل الصفحة
        │   │   ├── RootLayout.jsx                # الهيكل الخارجي
        │   │   ├── DashboardLayout.jsx           # هيكل لوحة التحكم
        │   │   ├── ProductCard.jsx               # بطاقة عرض المنتج
        │   │   ├── StatCard.jsx                  # بطاقة الإحصائية
        │   │   ├── ConfirmDialog.jsx             # نافذة تأكيد الإجراءات
        │   │   ├── EmptyState.jsx                # حالة القائمة الفارغة
        │   │   ├── LoadingSpinner.jsx            # مؤشر التحميل
        │   │   └── ProtectedDashboardRoute.jsx  # حماية مسارات الداشبورد
        │   │
        │   └── smart/               # الأدوات الذكية الفريدة
        │       ├── SmartSizeGuide.jsx  # غرفة القياس الذكية
        │       ├── OutfitMatcher.jsx   # منسّق الأزياء
        │       ├── VirtualModel.jsx    # الموديل الافتراضي
        │       └── ShareVote.jsx       # مشاركة التصويت
        │
        └── 📂 data/
            ├── mockData.js             # بيانات تجريبية (منتجات، طلبات، إحصائيات)
            └── (lib/mockNotifications.js) # بيانات الإشعارات
```

---

## 🛣️ صفحات التطبيق والمسارات

### المسارات العامة (Public Routes)

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/` | `LandingPage` | الصفحة الرئيسية مع Hero، المميزات، وكيفية الاستخدام |
| `/login` | `LoginPage` | تسجيل الدخول بالبريد وكلمة المرور |
| `/register` | `RegisterPage` | إنشاء حساب جديد مع رابط المتجر |
| `/shop/:slug` | `ShopPage` | واجهة المتجر العامة مع تصفية وبحث |
| `/shop/:slug/product/:id` | `ProductPage` | تفاصيل المنتج مع الأدوات الذكية |
| `/cart` | `CartPage` | عربة التسوق |
| `/notifications` | `NotificationsPage` | مركز إشعارات المتجر |
| `/local` | `LocalPage` | دليل المتاجر المحلية |
| `/vote/:productId` | `VotePage` | صفحة تصويت الأصدقاء |
| `/*` | `NotFoundPage` | صفحة الخطأ 404 |

### مسارات لوحة التحكم (Protected Dashboard Routes)

> 🔒 جميع هذه المسارات محمية — تستوجب تسجيل الدخول مسبقاً

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/dashboard` | `DashboardPage` | نظرة عامة، إحصائيات، طلبات، ومنتجات |
| `/dashboard/products` | `ProductsPage` | قائمة إدارة المنتجات |
| `/dashboard/products/new` | `AddProductPage` | إضافة منتج جديد |
| `/dashboard/products/:id/edit` | `AddProductPage` | تعديل منتج موجود |
| `/dashboard/orders` | `OrdersPage` | إدارة ومتابعة الطلبات |
| `/dashboard/settings` | `SettingsPage` | إعدادات الحساب والمتجر |

---

## 🔐 نظام المصادقة

يعتمد التطبيق على نظام مصادقة كامل مبني بـ React Context API مع التخزين في `localStorage`.

### الميزات:

| الميزة | التفاصيل |
|--------|----------|
| **التسجيل** | إنشاء حساب جديد بالاسم، البريد، وكلمة المرور |
| **تسجيل الدخول** | الدخول بالبريد الإلكتروني مع التحقق من وجود الحساب |
| **تحديث الملف الشخصي** | تعديل الاسم، البريد، رابط المتجر، رقم التواصل، والصور |
| **تسجيل الخروج** | مسح جلسة المستخدم من التخزين المحلي |
| **حماية المسارات** | `ProtectedDashboardRoute` يمنع الوصول للداشبورد بدون تسجيل دخول |
| **مزامنة البيانات** | تحديثات الملف الشخصي تنعكس فوراً في المتجر |

```jsx
// مثال على استخدام AuthContext
const { user, login, register, logout, updateProfile } = useAuth()
```

---

## 🛒 إدارة عربة التسوق

تُدار عربة التسوق بالكامل عبر `CartContext` المبني على React Context API.

### العمليات المدعومة:

```
إضافة منتج     → addToCart(product, size, quantity)
إزالة منتج     → removeFromCart(productId)
تغيير الكمية   → updateQuantity(productId, quantity)
مسح العربة     → clearCart()
حساب الإجمالي  → تلقائي عبر useMemo
```

---

## 🎨 نظام التصميم

### الألوان الأساسية

| اللون | القيمة | الاستخدام |
|-------|--------|-----------|
| **Emerald** | `#059669` | اللون الأساسي — أزرار، روابط، تمييزات |
| **Teal** | `#0d9488` | التدرجات والعناصر الثانوية |
| **Gray-950** | `#030712` | خلفية الوضع الداكن |
| **White** | `#ffffff` | خلفية الوضع الفاتح |

### الخطوط

```css
font-family: 'Cairo', sans-serif;  /* الخط الأساسي للنصوص العربية */
```

### نمط التصميم

- **Glassmorphism** — تأثيرات الزجاج الشفاف في هيدر المتجر وبطاقات الإحصائيات
- **Smooth Gradients** — تدرجات من `emerald → teal → cyan`
- **Rounded Corners** — `rounded-2xl` و `rounded-3xl` لشكل حديث وناعم
- **Dark Mode** — دعم كامل للوضع الداكن عبر `ThemeContext`
- **Responsive Design** — تصميم متجاوب يعمل على جميع أحجام الشاشات

---

## ⚙️ المتطلبات والتثبيت

### المتطلبات الأساسية

- **Node.js** >= 18.0.0
- **npm** أو **pnpm** أو **yarn**

### خطوات التثبيت

```bash
# 1. استنسخ المشروع
git clone https://github.com/your-username/mazhar-ecommerce.git
cd mazhar-ecommerce

# 2. ثبّت التبعيات
npm install
# أو باستخدام pnpm
pnpm install

# 3. شغّل بيئة التطوير
npm run dev

# 4. افتح المتصفح على
# http://localhost:5173
```

### بناء الإنتاج

```bash
# بناء نسخة الإنتاج
npm run build

# الملفات ستكون في مجلد dist/
```

### متغيرات البيئة

لا يتطلب المشروع حالياً أي متغيرات بيئة — جميع البيانات مُحاكاة محلياً.

---

## 🔧 التقنيات المستخدمة

### الواجهة الأمامية (Frontend)

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| **React** | 18.3.1 | إطار عمل الواجهة الأمامية |
| **React Router** | 7.17.0 | التنقل بين الصفحات (SPA) |
| **Vite** | 6.3.5 | أداة البناء والتطوير السريع |
| **Tailwind CSS** | 4.1.12 | نظام التنسيق والتصميم |
| **Lucide React** | 0.487.0 | مكتبة الأيقونات |

### مكتبات UI

| المكتبة | الإصدار | الاستخدام |
|---------|---------|-----------|
| **Radix UI** | متعددة | مكوّنات UI قابلة للوصول |
| **MUI (Material UI)** | 7.3.5 | عناصر واجهة إضافية |
| **shadcn/ui** | - | مكوّنات مُصمَّمة مسبقاً |
| **Recharts** | 2.15.2 | مخططات بيانية في الداشبورد |
| **Motion** | 12.23.24 | رسوم متحركة سلسة |
| **Sonner** | 2.0.3 | إشعارات Toast |
| **Embla Carousel** | 8.6.0 | عارض الصور الدوّار |

### أدوات مساعدة

| الأداة | الاستخدام |
|--------|-----------|
| **React Hook Form** | إدارة النماذج |
| **date-fns** | معالجة التواريخ |
| **clsx + tailwind-merge** | دمج أسماء الـ CSS بشكل ذكي |
| **canvas-confetti** | تأثيرات احتفالية |
| **React DnD** | السحب والإفلات |
| **class-variance-authority** | إدارة المتغيرات في المكوّنات |

---

## 📦 بنية الـ Commits

يتبع المشروع [Conventional Commits](https://www.conventionalcommits.org/) لتاريخ git منظم وقابل للقراءة:

```
c7bc79e  chore: initial project setup with Vite, React, and dependencies
600b4bf  feat: add global styles, theme tokens, fonts, and Tailwind setup
207bcb0  feat(auth): add login, register pages, AuthContext, and protected route guard
43f634d  feat(ui): add shared components - Navbar, Footer, Layouts, ProductCard, StatCard, ThemeContext
22e8ff4  feat(shop): add shop page, products listing, and product detail page with mock data
95a7d04  feat(cart): add shopping cart page and CartContext for state management
d226f86  feat(dashboard): add admin dashboard with analytics and add product management page
3d0506e  feat(orders): add orders management page with tracking and status display
816aeb1  feat(settings): add user settings page with profile, preferences, and theme controls
35327b5  feat(notifications): add notifications page with real-time alerts and mock notification data
d01cd37  feat(pages): add landing page, local shop page, and 404 not found page
64e67a3  feat(smart): add AI-powered features - OutfitMatcher, SmartSizeGuide, VirtualModel, ShareVote
1ee6df8  feat(routing): add app routes configuration and main App component with context providers
3dcb126  chore(build): add production build output and test assets
```

---

## 🗺️ خارطة الطريق

### المرحلة الحالية ✅
- [x] نظام المصادقة الكامل (تسجيل، دخول، خروج، تحديث الملف)
- [x] واجهة المتجر مع بحث وتصفية ديناميكية
- [x] لوحة تحكم مع إحصائيات وإدارة منتجات وطلبات
- [x] عربة التسوق مع إدارة الكميات
- [x] غرفة القياس الذكية
- [x] منسّق الأزياء والموديل الافتراضي
- [x] نظام التصويت الاجتماعي
- [x] الوضع الداكن الكامل
- [x] تصميم متجاوب لجميع الشاشات

### المرحلة القادمة 🔜
- [ ] **Backend & API** — ربط قاعدة بيانات حقيقية (Supabase / Firebase)
- [ ] **رفع الصور** — تكامل مع Cloudinary أو S3
- [ ] **الدفع الإلكتروني** — دعم Stripe / PayTabs
- [ ] **إشعارات واتساب** — إرسال الطلبات عبر WhatsApp Business API
- [ ] **تحليلات متقدمة** — تقارير تفصيلية ومخططات بيانية
- [ ] **تطبيق موبايل** — نسخة React Native
- [ ] **متعدد اللغات** — دعم الإنجليزية والعربية

---

## 🤝 المساهمة

نرحب بأي مساهمة! اتبع هذه الخطوات:

```bash
# 1. Fork المشروع
# 2. أنشئ فرعاً جديداً
git checkout -b feature/your-feature-name

# 3. طوّر وارفع تغييراتك
git commit -m "feat: add your feature"
git push origin feature/your-feature-name

# 4. افتح Pull Request
```

---

## 📄 الترخيص

هذا المشروع مرخص بموجب رخصة [MIT](./LICENSE).

---

<div align="center">

صُنع بـ ❤️ وكثير من ☕

**[⬆ العودة للأعلى](#️-مَظهر--mazhar)**

</div>