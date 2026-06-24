# 🔍 تقرير فحص مشروع مَظهر (E-Commerce) — الشامل

## نظرة عامة على المشروع

**مَظهر** — منصة يمنية لإنشاء متاجر ملابس ذكية مبنية بـ React 19 + Vite + Supabase + TailwindCSS 4.
يتضمن: لوحة تحكم (Dashboard)، واجهة متجر (ShopView)، سلة تسوق (Cart)، نظام مصادقة (Auth)، SEO متقدم، ومميزات ذكية (غرفة قياس، موديل افتراضي، تنسيق أزياء، تصويت).

---

## الحكم العام: هل المشروع جاهز؟

> [!CAUTION]
> **المشروع غير جاهز للنشر** في حالته الحالية. يوجد أخطاء برمجية حرجة ستسبب كراش فوري عند تشغيل بعض الصفحات، وأخطاء منطقية في البيانات، ونواقص وظيفية مهمة.

### ملخص سريع

| التقييم | التفاصيل |
|---------|----------|
| 🔴 أخطاء حرجة (Crashes) | **7 أخطاء** — ستكسر التطبيق فوراً |
| 🟠 أخطاء منطقية (Bugs) | **8 أخطاء** — ستعطي نتائج خاطئة |
| 🟡 نواقص وظيفية | **6 نواقص** — وظائف مهمة غير مكتملة |
| 🔵 مشاكل بنيوية | **5 مشاكل** — تحتاج تحسين للـ production |
| ⚪ ملاحظات تحسينية | **4 ملاحظات** — أفضل ممارسات |

---

## 🔴 1. أخطاء حرجة (ستكسر التطبيق)

---

### 🔴 1.1 — ShopView يستخدم متغيرات غير معرّفة (`shop`)

**الملف:** [ShopView.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/ShopView.jsx#L104-L109)

**المشكلة:** في سطر 104-109 يُستخدم `shop?.name` و `shop?.slug` و `shop?.logo_url` لكن لا يوجد متغير `shop` معرّف في الملف أصلاً. و `SEOHead` مستخدم بدون import.

```jsx
// ❌ الخطأ — shop و SEOHead غير موجودين
<SEOHead
    title={shop?.name || 'المتجر'}
    description={`${shop?.name} - ...`}
    image={shop?.logo_url}
    url={`https://mazhar.vercel.app/shop/${shop?.slug}`}
/>
```

**السبب:** على الأرجح نسيت استيراد `SEOHead` وجلب بيانات المتجر من Supabase.

**النتيجة:** 💥 **كراش فوري** عند فتح صفحة المتجر — `ReferenceError: SEOHead is not defined`.

**كيف تصلح:** 
1. أضف `import { SEOHead } from '../component/SEOHead.jsx';` في أعلى الملف.
2. إما تجلب بيانات المتجر من API أو تستخدم `slug` بدلاً من `shop`.

---

### 🔴 1.2 — ProductCard يقرأ `product.images[0]` بدل `product.product_images`

**الملف:** [ProductCard.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/ProductCard.jsx#L41)

**المشكلة:** يستخدم `product.images[0]` (سطر 41) لكن البيانات القادمة من Supabase تحتوي على `product.product_images` وليس `product.images`.

```jsx
// ❌ الخطأ
<img src={product.images[0]} ... />

// أيضاً سطر 30-32:
const discountPercent = product.discountPrice  // ❌ يجب أن يكون product.discount_price
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

// وسطر 61:
<p className="...">{product.category}</p>  // ❌ يجب أن يكون product.categories?.name
```

**النتيجة:** 💥 **كراش** `TypeError: Cannot read properties of undefined (reading '0')` — كل بطاقات المنتجات ستنكسر.

**كيف تصلح:**
- `product.images[0]` → `product.product_images?.[0]?.image_url || '/placeholder.png'`
- `product.discountPrice` → `product.discount_price`
- `product.category` → `product.categories?.name`

---

### 🔴 1.3 — Vote.jsx يستورد من مسار خطأ

**الملف:** [Vote.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Vote.jsx#L4)

**المشكلة:** يستورد من `'../../utils/api/productsAPI.js'` (حرف كبير) لكن الملف الفعلي اسمه `productsApi.js` (حرف صغير).

```jsx
// ❌ الملف الفعلي: productsApi.js  
import { fetchProductById } from '../../utils/api/productsAPI.js'; // ← خطأ
```

**النتيجة:** 💥 **كراش على Linux/Vercel** — أنظمة الملفات case-sensitive لا تجد الملف. يعمل على Windows فقط.

**كيف تصلح:** غيّر الاستيراد لـ `productsApi.js` (حرف صغير).

---

### 🔴 1.4 — Vote.jsx غير مسجل في Routes

**الملف:** [Routes.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/Routes.jsx)

**المشكلة:** صفحة التصويت `Vote.jsx` مبنية وتتوقع route مثل `/vote/:productId`، لكن لا يوجد هذا المسار في [Routes.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/Routes.jsx). أيضاً في [ProductCard.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/ProductCard.jsx#L21) يُولّد رابط `/vote/${product.id}`.

**النتيجة:** المستخدم يرى صفحة 404 عند الضغط على رابط التصويت.

**كيف تصلح:** أضف route في `Routes.jsx`:
```jsx
import { VotePage } from './pages/Vote.jsx';
// ثم:
{ path: '/vote/:productId', element: <VotePage /> },
```

---

### 🔴 1.5 — fetchChartData تعود بعد أول يوم فقط

**الملف:** [Satatiscs.js](file:///d:/Projects/WEB_Project/React/E-Commerece/src/hooks/Satatiscs.js#L103)

**المشكلة:** `return days;` موجود **داخل** الـ `for` loop (سطر 103) مما يجعل الدالة ترجع بعد أول iteration فقط بدلاً من جلب 7 أيام.

```jsx
for (let i = 6; i >= 0; i--) {
    // ...
    days.push({ day: dayName, date: dateStr, orders: count || 0 });
    return days; // ❌ يرجع بعد أول يوم!
}
```

**النتيجة:** الرسم البياني يعرض يوم واحد فقط بدلاً من 7 أيام.

**كيف تصلح:** انقل `return days;` إلى **بعد** نهاية الـ for loop.

---

### 🔴 1.6 — fetchChartData يُنادى مرتين ومرة بدون shopId

**الملف:** [Satatiscs.js](file:///d:/Projects/WEB_Project/React/E-Commerece/src/hooks/Satatiscs.js#L107-L110)

**المشكلة:** في `useEffect` يتم استدعاء `fetchChartData()` بدون `shopId` (سطر 109)، والدالة تُنادى بالفعل من داخل `fetchStatistics()` (سطر 57).

```jsx
useEffect(() => {
    fetchStatistics();       // ← هنا يستدعي fetchChartData(shopId)
    fetchChartData();        // ← ❌ وهنا يستدعيها مرة ثانية بدون shopId!
}, [shopId]);
```

**النتيجة:** خطأ في Supabase لأن shopId يكون `undefined`، ونداء مكرر بلا فائدة.

**كيف تصلح:** احذف `fetchChartData();` من الـ useEffect.

---

### 🔴 1.7 — Navbar يستدعي `handelLogout` غير موجود

**الملف:** [Navbar.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/Navbar.jsx#L9)

**المشكلة:** يستخرج `handelLogout` من `useAuth()` لكن الدالة الفعلية اسمها `handleLogout`.

```jsx
const {user, handelLogout, profile} = useAuth(); // ❌ handelLogout ← خطأ إملائي
// الصحيح: handleLogout
```

**النتيجة:** 💥 **كراش** `TypeError: handelLogout is not a function` عند الضغط على "خروج" في Navbar.

**كيف تصلح:** غيّر `handelLogout` إلى `handleLogout`.

---

## 🟠 2. أخطاء منطقية (Bugs)

---

### 🟠 2.1 — Login: محاولة قراءة `error.email` على string

**الملف:** [Login.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Login.jsx#L101)

**المشكلة:** `error` من نوع `string` (سطر 17: `useState('')`) لكن السطر 101 يحاول قراءة `error.email`:
```jsx
{error.email && <p>...</p>}  // ❌ error هو string وليس object
```

**النتيجة:** لا يُعرض خطأ البريد الإلكتروني أبداً.

**كيف تصلح:** حوّل `error` إلى object مثل Register، أو احذف هذا السطر واستعمل الـ error العام فقط.

---

### 🟠 2.2 — AuthContext: `loadProfile` يستخدم `user` قبل تعيينه

**الملف:** [AuthContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/AuthContext.jsx#L26)

**المشكلة:** `loadProfile(userId)` في سطر 26 يستخدم `user?.user_metadata?.full_name` لكن `user` state قد يكون `null` في هذه المرحلة لأن `setUser` قد لم يتم تنفيذه بعد.

```jsx
const {data:newProfile} = await supabase
    .from('profiles')
    .insert({id:userId, full_name: user?.user_metadata?.full_name || 'مستخدم'})
    //                                ^^^^ قد يكون null
```

**النتيجة:** الملف الشخصي الجديد يُنشأ باسم "مستخدم" بدلاً من الاسم الحقيقي.

**كيف تصلح:** مرر `user` كمعامل ثاني لـ `loadProfile` أو استخدم `userId` لجلب البيانات.

---

### 🟠 2.3 — AuthContext: خطأ في mounted check

**الملف:** [AuthContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/AuthContext.jsx#L52-L54)

**المشكلة:**
```jsx
// سطر 52: الشرط مقلوب
if (!mounted && error.message !== 'Auth session missing!')
    console.error(...);
// يجب أن يكون: if (mounted && ...)

// سطر 54: الشرط مقلوب أيضاً
finally { if(!mounted) setLoading(false); }
// يجب أن يكون: if(mounted) setLoading(false);
```

**النتيجة:** لا يتم إيقاف التحميل عندما يكون المكون mounted، ويتم محاولة إيقافه عندما يكون unmounted (وهو عكس المطلوب تماماً).

---

### 🟠 2.4 — AuthContext: handleSignUp يعيد loading بشكل خاطئ

**الملف:** [AuthContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/AuthContext.jsx#L122-L124)

**المشكلة:**
```jsx
if (data.user) {
    setTimeout(() => {
        setLoading(true);  // ❌ يجب أن يكون false!
    }, 2000);
}
```

**النتيجة:** بعد التسجيل بنجاح، الـ loading يرجع `true` بعد ثانيتين ويظل كذلك للأبد.

---

### 🟠 2.5 — fetchProducts يُستدعى بدون معاملات

**الملف:** [ShopView.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/ShopView.jsx#L34)

**المشكلة:** 
```jsx
const { data, error } = await fetchProducts();  // ❌ بدون {}
```
لكن تعريف الدالة: `fetchProducts({limit, orderBy, ascending})` يتوقع object. عند استدعائها بدون معاملات، يُحاول تفكيك `undefined` ويعطي خطأ.

**النتيجة:** خطأ `Cannot destructure property 'limit' of undefined`.

**كيف تصلح:** إما مرّر `{}` أو أضف قيمة افتراضية: `fetchProducts = async ({...} = {})`

---

### 🟠 2.6 — AddProduct: `shop_id` ثابت كـ string

**الملف:** [AddPrdouct.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/AddPrdouct.jsx#L134)

**المشكلة:**
```jsx
const productData = {
    shop_id: 'shop-id-here',  // ❌ قيمة ثابتة وهمية!
```

**النتيجة:** كل المنتجات تُحفظ بـ `shop_id` وهمي. إذا كان هناك foreign key في Supabase سيفشل الحفظ.

**كيف تصلح:** استخدم `profile?.shop_id` من `useAuth()`.

---

### 🟠 2.7 — searchProducts: خطأ إملائي في filter

**الملف:** [productsApi.js](file:///d:/Projects/WEB_Project/React/E-Commerece/utils/api/productsApi.js#L139)

**المشكلة:**
```jsx
.or(`name.likes.%${searchTerm}%,brand.ilike.%${searchTerm}%`)
//        ^^^^^ يجب أن يكون ilike
```

**النتيجة:** البحث لا يعمل — Supabase لا يعرف operator اسمه `likes`.

---

### 🟠 2.8 — Settings: لون الأزرار لا يظهر

**الملف:** [Settings.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Settings.jsx#L174)

**المشكلة:**
```jsx
style={{cackGroundColor: color}}  // ❌ خطأ إملائي كبير!
// الصحيح: backgroundColor
```

**النتيجة:** أزرار اختيار اللون تظهر بدون لون — كلها شفافة.

---

## 🟡 3. نواقص وظيفية مهمة

---

### 🟡 3.1 — Dashboard غير محمي (لا Route Guard)

**المشكلة:** أي شخص بدون تسجيل دخول يقدر يدخل `/dashboard` مباشرة. لا يوجد أي تحقق من المصادقة في [DashboardLayout.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/DashboardLayout.jsx) أو [Routes.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/Routes.jsx).

**كيف تصلح:** أنشئ component `ProtectedRoute` يتحقق من `user` ويوجه للـ login إذا لم يكن مسجل:
```jsx
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <LoadingSpinner />;
    if (!user) return <Navigate to="/login" />;
    return children;
}
```

---

### 🟡 3.2 — Settings لا تحفظ فعلياً في Supabase

**المشكلة:** [Settings.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Settings.jsx#L29-L33) يعمل `setTimeout` ويعطي رسالة "تم الحفظ" لكن لا يرسل أي شيء لـ Supabase. البيانات تضيع عند تحديث الصفحة.

---

### 🟡 3.3 — لا يتم حفظ المقاسات (Size Charts) عند إنشاء المنتج

**الملف:** [AddPrdouct.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/AddPrdouct.jsx#L186-L187)

**المشكلة:** يوجد تعليق يقول "اختياري - إذا تريد" لكن المقاسات لا تُحفظ أبداً في Supabase:
```jsx
// ⭐ 3. حفظ المقاسات (اختياري - إذا تريد)
// يمكنك إضافة دوال لحفظ المقاسات في size_charts
```

**النتيجة:** المقاسات تظهر في الفورم لكن لا تُحفظ. صفحة المنتج لن تعرض أي مقاسات.

---

### 🟡 3.4 — لا يوجد تغيير حالة الطلب

**المشكلة:** صفحة [Orders.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Orders.jsx) تعرض الطلبات لكن لا توفر طريقة لتغيير حالة الطلب (من "معلق" إلى "قيد التنفيذ" مثلاً).

---

### 🟡 3.5 — Navbar: badge السلة لا يعرض العدد

**الملف:** [Navbar.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/Navbar.jsx#L43-L49)

**المشكلة:** الكود معلّق (commented out):
```jsx
{/*{toatlIems > 0 && (*/}
    <span className="...">
        {/*{totalItems}*/}
    </span>
{/*)}*/}
```

**النتيجة:** تظهر badge فارغة دائماً حتى لو السلة فيها 0 عناصر.

---

### 🟡 3.6 — Google Login button لا يعمل

**الملف:** [Login.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Login.jsx#L66) و [Register.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Register.jsx#L53)

**المشكلة:** زر تسجيل الدخول بـ Google لا يستدعي `handleGoogleLogin()` — الـ button ليس عليه `onClick`.

---

## 🔵 4. مشاكل بنيوية

---

### 🔵 4.1 — عدم وجود `StrictMode` في React

**الملف:** [main.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/main.jsx)

لا يوجد `<React.StrictMode>` مما يخفي بعض المشاكل أثناء التطوير.

---

### 🔵 4.2 — ملفات خارج `src/` (مجلد `utils`)

المجلد `utils/` موجود خارج `src/` مما يجعل الاستيرادات طويلة (`../../utils/...`). الأفضل نقله داخل `src/`.

---

### 🔵 4.3 — أسماء ملفات غير متسقة

| الملف | المشكلة |
|-------|---------|
| `AddPrdouct.jsx` | خطأ إملائي — يجب `AddProduct.jsx` |
| `Satatiscs.js` | خطأ إملائي — يجب `Statistics.js` أو `useStatistics.js` |
| `productsApi.js` vs `productsAPI.js` | غير متسق — سيسبب مشاكل على Linux |
| `SmartSizeGuideProps.jsx` | اسم مضلل — هو component وليس props |

---

### 🔵 4.4 — استخدام `alert()` و `prompt()` في الـ production

**الملفات:** [AuthContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/AuthContext.jsx#L73-L78) و [AuthContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/AuthContext.jsx#L171-L175)

```jsx
const newPassword = prompt("What would you like your new password to be?");
alert("تم تحديث كلمة المرور بنجاح!");
```

غير احترافي وغير آمن — `prompt` يعرض كلمة المرور بدون تشفير.

---

### 🔵 4.5 — DashboardLayout: رابط "عرض المتجر" غلط

**الملف:** [DashboardLayout.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/DashboardLayout.jsx#L85)

```jsx
<Link to="shop/mazhar-stote">  // ❌ stote بدل store، وينقص / في البداية
// الصحيح:
<Link to="/shop/mazhar-store">
```

---

## ⚪ 5. ملاحظات تحسينية

---

### ⚪ 5.1 — تعليقات تعليمية متروكة في الكود

مثلاً في [ThemeContext.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/contexts/ThemeContext.jsx#L23-L27):
```jsx
// const toggleTheme = () => setIsDark(prev => ...); //what prev mean?
// and y prev not above var?
```

وفي [DashboardLayout.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/component/DashboardLayout.jsx#L23-L25):
```jsx
const isActive = (to,exact = false) => { // I didn't understand
    // anything
```

يُفضل حذفها قبل النشر.

---

### ⚪ 5.2 — لا يوجد Error Boundary

لا يوجد Error Boundary لالتقاط الأخطاء الغير متوقعة. عند حدوث خطأ في أي component، التطبيق كله يتوقف.

---

### ⚪ 5.3 — لا يوجد Lazy Loading للصفحات

كل الصفحات تُحمّل مرة واحدة. استخدام `React.lazy()` سيقلل حجم الـ bundle الأولي.

---

### ⚪ 5.4 — رقم واتساب ثابت في الكود

**الملف:** [Cart.jsx](file:///d:/Projects/WEB_Project/React/E-Commerece/src/pages/Cart.jsx#L47)

```jsx
const storePhone = '0501234567'; // ❌ رقم وهمي ثابت
```

يجب جلبه من إعدادات المتجر.

---

## ترتيب الأولويات للإصلاح

| الأولوية | المهمة | الأثر |
|----------|--------|-------|
| 1️⃣ | إصلاح ShopView (shop غير معرّف + SEOHead) | يكسر صفحة المتجر |
| 2️⃣ | إصلاح ProductCard (images → product_images) | يكسر كل بطاقات المنتجات |
| 3️⃣ | إصلاح Navbar (handelLogout → handleLogout) | يكسر زر الخروج |
| 4️⃣ | إصلاح fetchProducts default params | يكسر تحميل المنتجات |
| 5️⃣ | إصلاح Vote imports + إضافة Route | يكسر ميزة التصويت |
| 6️⃣ | إصلاح fetchChartData (return inside loop) | يكسر الرسم البياني |
| 7️⃣ | إصلاح Settings (backgroundColor) | الأزرار بلا ألوان |
| 8️⃣ | إصلاح AuthContext bugs | مشاكل المصادقة |
| 9️⃣ | إضافة Route Guard للـ Dashboard | أمان |
| 🔟 | ربط Google Login + حفظ Settings | وظائف ناقصة |

---

## خطتك

> [!IMPORTANT]
> حاول تصلح الأخطاء بنفسك أولاً (خذ وقتك)، وبعدها قدّم لك الحلول الجاهزة لتقارن حلك بحلي. ابدأ من الأخطاء 🔴 الحرجة لأنها تمنع التطبيق من العمل أصلاً.

هل تبي تبدأ بإصلاح الأخطاء الحرجة بنفسك، ولا تبي أعطيك الحلول الآن؟
