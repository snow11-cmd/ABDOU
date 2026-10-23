# أبو جاسم — بورتفوليو ثلاثي الأبعاد (Next.js + Supabase)

موقع بورتفوليو احترافي كامل بواجهة داكنة فاخرة، تجربة ثلاثية الأبعاد تفاعلية، دعم عربي/إنجليزي مع RTL، مصادقة آمنة، لوحة تحكم محمية، ومتجر خدمات مع بنية دفع آمنة.

> **الوضع الحالي:** الموقع يعمل ويعرض محتوى تجريبياً كاملاً **بدون** أي مفاتيح. المصادقة ولوحة التحكم وحفظ الرسائل والطلبات الحقيقية تحتاج إلى ربط مشروع Supabase (الخطوات أدناه). الدفع الحقيقي غير مُفعّل؛ يوجد وضع Sandbox واضح ومُعلَّم.

---

## 1. المزايا المنفذة

### الواجهة العامة

- صفحة رئيسية كاملة: Hero ثلاثي الأبعاد، نبذة، خدمات، أعمال، تواصل، فوتر.
- مشهد 3D تفاعلي (React Three Fiber): مجسم متحرك + حلقات مدارية + جزيئات + استجابة للماوس، مع **بديل CSS ثابت** للأجهزة المحمولة وتفضيل تقليل الحركة.
- تصميم متجاوب بالكامل (Mobile-first) مع منع التمرير الأفقي.
- وضعان لغويان: العربية (افتراضي، RTL) والإنجليزية (LTR) مع حفظ الاختيار.
- صفحات تفاصيل المشاريع + فلترة التصنيفات.
- صفحة طلب خدمة (Checkout) مع ملخص السعر.
- SEO: عناوين، أوصاف، Open Graph، Sitemap، robots، JSON-LD.
- إمكانية وصول: تسميات نماذج، تركيز مرئي، دعم تقليل الحركة.

### المصادقة

- تسجيل دخول / إنشاء حساب / نسيت كلمة المرور / تعيين كلمة مرور جديدة.
- Supabase Auth (كلمات المرور مشفّرة دائماً، لا تُخزَّن أبداً في التطبيق).
- تأكيد البريد الإلكتروني ورابط استعادة كلمة المرور عبر `/auth/callback`.

### لوحة التحكم (Admin)

- إحصائيات عامة (مشاريع، رسائل جديدة، طلبات معلقة، إيرادات مدفوعة).
- إدارة المشاريع: إنشاء، تعديل، نشر/إلغاء نشر، حذف، رفع صورة غلاف.
- إدارة الخدمات: إنشاء، تعديل، تفعيل/تعطيل، حذف.
- إدارة الرسائل: قراءة، تعليم كمقروء، حذف.
- إدارة الطلبات: تغيير الحالة (pending/paid/cancelled/failed).
- إعدادات الموقع: الاسم، المسمى، النبذة، البريد، واتساب، روابط التواصل.
- بحث وفلاتر وحالات تحميل وفراغ.
- الحماية على **ثلاث طبقات**: Proxy (توجيه)، `requireAdmin` على الخادم، وسياسات RLS في PostgreSQL.

### قاعدة البيانات

- الجداول: `profiles`, `site_settings`, `projects`, `services`, `contact_messages`, `orders`, `payments`.
- Row Level Security مفعّلة على جميع الجداول.
- دالة `is_admin()` آمنة (SECURITY DEFINER) + Trigger لمنع رفع الصلاحية.
- Trigger لإنشاء ملف تعريف تلقائياً عند التسجيل.
- Bucket تخزين `project-covers` مع سياسات رفع للمشرفين فقط.
- بيانات أولية (Seed) قابلة للتكرار.

---

## 2. التقنيات

| الطبقة    | التقنية                                |
| --------- | -------------------------------------- |
| الإطار    | Next.js 16 (App Router) + Turbopack    |
| اللغة     | TypeScript                             |
| التنسيق   | Tailwind CSS 4                         |
| 3D        | Three.js + React Three Fiber + Drei    |
| الحركة    | Framer Motion                          |
| الخلفية   | Supabase (PostgreSQL + Auth + Storage) |
| النماذج   | React Hook Form + Zod                  |
| الأيقونات | Lucide                                 |
| النشر     | Vercel + GitHub                        |

---

## 3. المتطلبات

- Node.js **20.9 أو أحدث** (تم الاختبار على 24.20).
- npm 10+.
- حساب Supabase (مجاني للبداية).
- حساب GitHub وحساب Vercel للنشر (اختياري للتطوير المحلي).

تحقق:

```bash
node -v
npm -v
```

---

## 4. التشغيل المحلي

```bash
# 1) ادخل مجلد المشروع
cd portfolio

# 2) ثبّت الحزم
npm install

# 3) انسخ متغيرات البيئة
#    Windows (PowerShell):
Copy-Item .env.example .env.local
#    macOS / Linux:
# cp .env.example .env.local

# 4) شغّل الخادم
npm run dev
```

افتح: <http://localhost:3000>

> بدون تعبئة `.env.local` سيعمل الموقع بالبيانات التجريبية. لوحة التحكم ستعرض صفحة إعداد Supabase بدلاً من نموذج دخول وهمي — وهذا مقصود لأسباب أمنية.

### أوامر مفيدة

```bash
npm run dev          # تطوير
npm run build        # بناء إنتاجي
npm run start        # تشغيل نسخة الإنتاج
npm run lint         # ESLint
npm run format       # تنسيق كل الملفات وترتيب الاستيرادات وأصناف Tailwind
npm run format:check # التحقق من التنسيق دون تعديل
npx tsc --noEmit     # فحص الأنواع
```

---

## 5. إعداد Supabase خطوة بخطوة

### 5.1 إنشاء المشروع

1. افتح <https://supabase.com> وأنشئ مشروعاً جديداً.
2. اختر منطقة قريبة من جمهورك.
3. احتفظ بكلمة مرور قاعدة البيانات في مكان آمن.

### 5.2 تنفيذ مخطط قاعدة البيانات

1. من لوحة Supabase افتح **SQL Editor → New query**.
2. انسخ كامل محتوى الملف:
   `supabase/migrations/0001_init.sql`
3. اضغط **Run**.
4. تحقق من ظهور الجداول في **Table Editor**، ومن ظهور Bucket باسم `project-covers` في **Storage**.

هذا الملف يُنشئ الجداول والفهارس وTriggers وسياسات RLS وبيانات البداية. يمكن تشغيله أكثر من مرة بأمان.

### 5.3 جلب المفاتيح

من **Project Settings → API** انسخ:

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **مفتاح service_role سري تماماً.** يُستخدم فقط على الخادم لإنشاء الطلبات وتحديث المدفوعات وحفظ رسائل التواصل وتجاوز RLS. لا تضعه أبداً في كود العميل ولا في متغير يبدأ بـ `NEXT_PUBLIC_`.

> إذا كان `NEXT_PUBLIC_SUPABASE_URL` و`ANON_KEY` مضبوطين لكن `SUPABASE_SERVICE_ROLE_KEY` ناقص، فإن نموذج التواصل والدفع يُعطَّلان بأمان (503 / زر معطّل) بدلاً من الكتابة عبر مفتاح anon العام.

### 5.4 إعدادات المصادقة

من **Authentication → URL Configuration**:

- **Site URL:** `http://localhost:3000` للتطوير، ثم نطاق Vercel في الإنتاج.
- **Redirect URLs:** أضف:
  - `http://localhost:3000/auth/callback`
  - `https://YOUR-DOMAIN.vercel.app/auth/callback`

من **Authentication → Providers → Email**:

- فعّل Email.
- للتطوير السريع يمكنك تعطيل **Confirm email**، لكن يُنصح بإبقائه مفعّلاً في الإنتاج.

### 5.5 املأ `.env.local`

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

PAYMENT_PROVIDER=sandbox
PAYMENTS_SANDBOX=true
PAYMENT_WEBHOOK_SECRET=
```

أعد تشغيل `npm run dev` بعد أي تعديل على `.env.local`. في الإنتاج، الصفحة الرئيسية تُبنى مسبقاً وتُحدَّث دورياً كل 60 ثانية، لذا أعد النشر بعد تغيير متغيرات البيئة أو أضف المحتوى قبل البناء الأول.

---

## 6. إنشاء حساب المشرف بأمان

لا يوجد — ولن يوجد — كلمة مرور مشرف مكتوبة في الكود.

1. شغّل الموقع واذهب إلى `/signup`.
2. أنشئ حسابك بالبريد وكلمة المرور (وأكّد البريد إن كان التأكيد مفعّلاً).
3. في Supabase → **SQL Editor** نفّذ:

```sql
update public.profiles
set role = 'admin'
where email = 'YOUR_EMAIL@example.com';
```

4. تحقق:

```sql
select id, email, role from public.profiles;
```

5. سجّل الخروج ثم الدخول مجدداً، ثم افتح `/admin`.

**كيف تُفرَض الحماية؟**

- `proxy.ts` يوجّه غير المسجلين إلى `/login`.
- `app/admin/layout.tsx` وكل Server Action يستدعيان `requireAdmin()` الذي يتحقق من `profiles.role`.
- سياسات RLS تمنع أي وصول غير مصرّح حتى لو استُدعيت واجهات Supabase مباشرة من المتصفح.
- Trigger `protect_profile_role` يمنع أي مستخدم عادي من تغيير دوره إلى `admin`.
- الترقية من **SQL Editor** أو بمفتاح service role مسموحة لأن `auth.uid()` يكون `null` في هذه السياقات الموثوقة؛ أي طلب من عميل عادي يحمل JWT يبقى ممنوعاً.

---

## 7. الدفع — ما هو مُنفّذ وما هو مطلوب

### المُنفّذ الآن

- إنشاء طلب مع **التحقق من السعر على الخادم** (لا يُقبل أي مبلغ من المتصفح).
- عند تفعيل Supabase: يُقرأ السعر والخدمة **من جدول `services` مباشرةً بمفتاح service role**، وليس من البيانات التجريبية. إذا كانت Supabase مضبوطة بلا service role → 503.
- إنشاء سجل `payments` بحالة `pending`؛ إذا فشل إنشاء السجل يُعاد خطأ واضح ولا يُدّعى النجاح.
- وضع **Sandbox** واضح: لا يتم خصم أي مبلغ.
- بدون Supabase: يُنشأ طلب تجريبي في الذاكرة (غير دائم) ويظهر تنبيه صريح، ولا تُعرض بيانات العميل في صفحة النجاح.
- `PAYMENT_PROVIDER` يقبل `sandbox` فقط حالياً؛ أي قيمة أخرى تُغلق الدفع بأمان (503) بدلاً من الرجوع الصامت إلى Sandbox.
- إذا كان `PAYMENTS_SANDBOX=false` يُعطَّل الدفع في الواجهة والـAPI.
- Webhook آمن على `/api/payments/webhook`:
  - يتطلب `PAYMENT_WEBHOOK_SECRET`.
  - يتحقق من توقيع HMAC-SHA256 على الجسم الخام.
  - يرفض تغيير الحالة إذا اختلف المبلغ.
  - يستخدم service role فقط على الخادم.

> صفحة نجاح الطلب تعرض رقم الطلب والخدمة والمبلغ والحالة فقط، ولا ترسل اسم العميل أو بريده أو ملاحظاته إلى المتصفح.

### غير المُنفّذ (يحتاج مزوّداً حقيقياً)

لا يوجد أي ادعاء بأن الدفع الحقيقي يعمل. لتفعيله:

1. اختر مزوّداً مدعوماً في بلدك (مثل Stripe، Paddle، Paymob، Tap، Moyasar — تحقق من الأهلية أولاً).
2. أضف وحدة جديدة في `lib/payments/provider.ts` تنفّذ الواجهة `PaymentProvider`:
   - `createCheckout` لإنشاء جلسة دفع وإرجاع رابط إعادة التوجيه.
   - تحقق Webhook وفق توثيق المزوّد (بدلاً من HMAC العام أو بالإضافة إليه).
3. أضف متغيرات البيئة الخاصة بالمزوّد (مفاتيح سرية فقط على الخادم).
4. عدّل `app/api/checkout/route.ts` لاستخدام المزوّد الجديد.
5. اختبر في بيئة المزوّد التجريبية قبل الإنتاج، وتأكد من:
   - عدم تخزين أي بيانات بطاقة.
   - التحقق من التوقيع والمبلغ.
   - idempotency (معالجة نفس الحدث مرتين بأمان).
6. فعّل HTTPS فقط، واضبط `PAYMENTS_SANDBOX=false` بعد التأكد.

> ملاحظة: الطلبات الحالية تُنشأ كـ `pending` ولا تُعتبر مدفوعة إلا بعد Webhook موثّق.

---

## 8. بنية المشروع

```text
portfolio/
├─ app/
│  ├─ (site)/                 # الصفحات العامة (نافبار + فوتر)
│  │  ├─ page.tsx             # الرئيسية
│  │  ├─ projects/[slug]/     # تفاصيل المشروع
│  │  ├─ checkout/            # الطلب + صفحة النجاح
│  │  └─ loading.tsx
│  ├─ (auth)/                 # login / signup / forgot / reset
│  ├─ admin/                  # لوحة التحكم المحمية
│  ├─ api/
│  │  ├─ contact/route.ts
│  │  ├─ checkout/route.ts
│  │  └─ payments/webhook/route.ts
│  ├─ auth/callback/route.ts  # تبادل رمز Supabase
│  ├─ layout.tsx              # RTL + خطوط + مزوّد اللغة
│  ├─ sitemap.ts / robots.ts
│  └─ globals.css             # نظام التصميم
├─ components/
│  ├─ home/                   # Hero, About, Services, Projects, Contact
│  ├─ three/                  # مشهد 3D + Fallback
│  ├─ admin/                  # Sidebar, الجداول, النماذج
│  ├─ auth/                   # AuthShell والنماذج
│  ├─ checkout/
│  └─ ui/                     # أزرار، حقول، شارات، مكونات مشتركة
├─ lib/
│  ├─ data/                   # الأنواع، البيانات التجريبية، الاستعلامات
│  ├─ actions/                # Server Actions محمية
│  ├─ supabase/               # عملاء المتصفح/الخادم/الأدمن
│  ├─ payments/               # واجهة المزوّد + Sandbox
│  ├─ i18n/                   # القواميس ومزوّد اللغة
│  ├─ auth.ts                 # requireAdmin
│  └─ validations.ts          # مخططات Zod
├─ supabase/migrations/0001_init.sql
├─ proxy.ts                   # حماية المسارات وتحديث الجلسة
└─ .env.example
```

---

## 9. تخصيص المحتوى

- **الاسم/النبذة/الروابط:** من `/admin/settings` بعد ربط Supabase، أو من `lib/data/demo.ts` للوضع التجريبي.
- **الخدمات والمشاريع:** من لوحة التحكم، أو بيانات البداية في `lib/data/demo.ts` وملف SQL.
- **الألوان والخطوط:** `app/globals.css` (المتغيرات في `:root`).
- **النصوص الثابتة:** `lib/i18n/dictionaries.ts` (عربي + إنجليزي).
- **الخط:** Cairo للعربية وSpace Grotesk للإنجليزية عبر Google Fonts في `app/layout.tsx`.

> عند إضافة مشروع أو تعديله من لوحة التحكم يتم استدعاء `revalidatePath` لتحديث الصفحات.

---

## 10. الرفع إلى GitHub

```bash
cd portfolio
git init
git add .
git commit -m "feat: premium 3D portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

⚠️ قبل الرفع تأكد أن `.env.local` غير مضمّن. ملف `.gitignore` الافتراضي في Next.js يتجاهله، لكن تحقق دائماً:

```bash
git status
```

لا ترفع أبداً:

- `.env.local`
- `SUPABASE_SERVICE_ROLE_KEY`
- أي مفاتيح دفع.

---

## 11. النشر على Vercel

1. ادخل <https://vercel.com> → **Add New Project**.
2. استورد مستودع GitHub.
3. Framework Preset: **Next.js** (يُكتشف تلقائياً).
4. أضف متغيرات البيئة (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` = رابط النطاق النهائي.
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (سرّي)
   - `PAYMENT_PROVIDER`, `PAYMENTS_SANDBOX`, `PAYMENT_WEBHOOK_SECRET`
5. Deploy.
6. بعد الحصول على النطاق:
   - أضف `https://YOUR-DOMAIN/auth/callback` إلى Redirect URLs في Supabase.
   - حدّث `NEXT_PUBLIC_SITE_URL` وأعد النشر.
7. أضف نطاقك المخصص من **Settings → Domains** إن أردت.

### قائمة تحقق بعد النشر

- [ ] الصفحة الرئيسية تعمل بالعربية RTL وبالإنجليزية LTR.
- [ ] المشهد 3D يعمل على سطح المكتب ويظهر البديل على الجوال.
- [ ] إنشاء حساب وتسجيل دخول يعملان.
- [ ] `/admin` يفتح للمشرف فقط ويُعيد التوجيه لغير المسجلين.
- [ ] إرسال رسالة تواصل يظهر في `/admin/messages`.
- [ ] إنشاء طلب يظهر في `/admin/orders` بحالة pending.
- [ ] لا توجد أخطاء في Console.
- [ ] `sitemap.xml` و`robots.txt` يعملان.

---

## 12. الأمان — ملخص

- كلمات المرور تُدار بواسطة Supabase Auth (تشفير bcrypt داخلياً)، ولا تمر عبر قاعدة بياناتك.
- كل المدخلات تُتحقق على الخادم بـ Zod، وليس فقط في المتصفح.
- الأسعار تُقرأ من قاعدة البيانات على الخادم عند تفعيل Supabase؛ لا يُقبل أي مبلغ من العميل.
- `service_role` لا يُستخدم إلا داخل Route Handlers وServer Components على الخادم، ولا يُصدَّر إلى العميل.
- RLS مفعّلة، ودالة `is_admin()` تمنع الاستعلامات التعاودية. لا توجد سياسة إدراج عامة لجدول `contact_messages`؛ الكتابة فقط عبر الـAPI بمفتاح service role.
- Webhook يتحقق من HMAC ويقارن المبلغ.
- Honeypot صامت + Rate limiting بسيط على نموذج التواصل (يُنصح بـ Upstash/Redis للإنتاج).
- الحساب غير المشرف يُعاد توجيهه إلى `/login?error=forbidden` مع رسالة واضحة بدلاً من صفحة صامتة.
- ترويسات أمان أساسية: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, وHSTS.
- لا توجد كلمة مرور مشرف ثابتة ولا بيانات وهمية تُوهم المستخدم بالنجاح.

---

## 13. حل المشكلات

| المشكلة                                                     | الحل                                                                                                              |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| لوحة التحكم تعيد التوجيه دائماً إلى `/login?setup=required` | Supabase غير مُهيّأ. أضف المفاتيح في `.env.local` وأعد تشغيل الخادم.                                              |
| تم إنشاء الحساب لكن لا يوجد ملف تعريف                       | نفّذ ملف SQL مرة أخرى؛ Trigger `handle_new_user` يجب أن يكون موجوداً.                                             |
| `/admin` يعيد التوجيه إلى `/login?error=forbidden`          | الحساب ليس admin. نفّذ `update profiles set role='admin' ...` من SQL Editor (مسموح لأن `auth.uid()` فارغ هناك).   |
| رابط استعادة كلمة المرور لا يعمل                            | أضف `/auth/callback` إلى Redirect URLs في Supabase.                                                               |
| فشل رفع صورة المشروع                                        | تأكد من إنشاء Bucket `project-covers` ومن سياسات Storage في ملف SQL.                                              |
| نموذج التواصل يعرض خطأ                                      | تحقق من `SUPABASE_SERVICE_ROLE_KEY`؛ الكتابة تحتاج service role. راجع Logs في Supabase.                           |
| الدفع معطّل (زر غير فعّال)                                  | `PAYMENT_PROVIDER` ليس `sandbox`، أو `PAYMENTS_SANDBOX=false`، أو Supabase مضبوطة بلا service role. راجع القسم 7. |
| الطلب يظهر Sandbox                                          | طبيعي: لا يوجد مزوّد دفع حقيقي مُفعّل بعد. راجع القسم 7.                                                          |
| مشكلة في الخطوط                                             | افحص الاتصال بـ Google Fonts، أو استبدل الرابط بخط محلي عبر `next/font`.                                          |

---

## 14. ما تم التحقق منه فعلياً

- `npx tsc --noEmit` ✅ بدون أخطاء.
- `npm run lint` ✅ بدون أخطاء.
- `npm run build` ✅ بناء إنتاجي ناجح (24 مساراً + Proxy).
- تشغيل نسخة الإنتاج (`npm start` على المنفذ 3001) واختبارها بمتصفح Edge فعلي:
  - الرئيسية سطح المكتب 1440px: الهيرو 3D (`canvas`)، شريط التقنيات، 6 خدمات، 6 مشاريع، Skip Link.
  - الجوال 390px: لا يوجد Overflow أفقي، لا يُحمَّل Canvas، ويظهر البديل الثابت.
  - قائمة الجوال: `role="dialog"`, `aria-modal`, قفل التمرير، والإغلاق بمفتاح Escape.
  - تبديل اللغة إلى الإنجليزية: `lang="en"`, `dir="ltr"`, وترجمة التنقل/العنوان/404.
  - حفظ اللغة بعد إعادة التحميل والانتقال بين الصفحات (الرئيسية، الدخول، الدفع).
  - فلاتر المشاريع: 6 → 2، وصفحة تفاصيل المشروع.
  - Checkout: طلب Sandbox ناجح، السعر `$450`، والحالة «بانتظار الدفع».
  - صفحة النجاح: عنوان «وضع تجريبي (Sandbox)» ظاهر، ولا تُسرّب بريد العميل أو اسمه إلى HTML/RSC.
  - `/admin` بدون Supabase → `/login?setup=required`.
  - `/api/contact` بدون إعداد → 503 صريح (وليس نجاحاً وهمياً).
  - ترويسات الأمان الأساسية موجودة.
- لا أخطاء Console/PageError من التطبيق؛ تظهر فقط أخطاء شبكة متوقعة لطلبات 404/503 التي يجري اختبارها عمداً.

**لم يتم اختبار ما يلي لعدم توفر بيانات خارجية:**

- تسجيل الدخول الفعلي ولوحة التحكم مع Supabase حقيقي (لم تُضبط مفاتيح).
- حفظ الرسائل والطلبات في قاعدة بيانات فعلية.
- رفع الصور إلى Storage.
- تنفيذ Webhook بمزوّد حقيقي (التحقق من HMAC مُختبر منطقياً فقط).
- الدفع الحقيقي (غير مُنفّذ أصلاً).
- النشر على Vercel.

اتبع خطوات الإعداد أعلاه ثم اختبر القائمة في القسم 11.

---

## 15. الترخيص

هذا المشروع مخصص للاستخدام الشخصي. عدّل المحتوى والهوية البصرية كما تشاء.
