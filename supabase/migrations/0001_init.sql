-- =====================================================================
--  Portfolio — Supabase schema, RLS policies, storage and seed data
--  Run this file in the Supabase SQL editor (or as a migration).
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- 1. Profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Security-definer helper avoids recursive RLS checks on profiles.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Create a profile automatically for every new auth user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Prevent privilege escalation: only admins may change roles.
-- When there is no end-user JWT (SQL editor, migrations or the service role),
-- auth.uid() is null; those trusted contexts may promote the first admin.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role
     and auth.uid() is not null
     and not public.is_admin() then
    raise exception 'Only administrators can change roles';
  end if;
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();

-- ---------------------------------------------------------------------
-- 2. Site settings (single row, id = 1)
-- ---------------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  name_ar text not null default 'أبو جاسم',
  name_en text not null default 'Abu Jasem',
  title_ar text not null default 'مطور ويب متكامل ومصمم تجارب رقمية',
  title_en text not null default 'Full-Stack Developer & Digital Experience Designer',
  bio_ar text not null default '',
  bio_en text not null default '',
  email text not null default 'hello@example.com',
  whatsapp text not null default '',
  github text not null default '',
  linkedin text not null default '',
  x text not null default '',
  telegram text not null default '',
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3. Projects
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title_ar text not null,
  title_en text not null,
  description_ar text not null,
  description_en text not null,
  long_description_ar text,
  long_description_en text,
  category text not null default 'web' check (category in ('web', 'ecommerce', 'saas', 'uiux')),
  tech text[] not null default '{}',
  image_url text,
  demo_url text,
  repo_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_published_idx on public.projects (published, sort_order);
create index if not exists projects_category_idx on public.projects (category);

-- ---------------------------------------------------------------------
-- 4. Services
-- ---------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title_ar text not null,
  title_en text not null,
  description_ar text not null,
  description_en text not null,
  icon text not null default 'Code2',
  price numeric(12, 2) not null default 0 check (price >= 0),
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_active_idx on public.services (active, sort_order);

-- ---------------------------------------------------------------------
-- 5. Contact messages
-- ---------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 5 and 160),
  subject text not null check (char_length(subject) between 3 and 140),
  message text not null check (char_length(message) between 10 and 4000),
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_read_idx on public.contact_messages (read);

-- ---------------------------------------------------------------------
-- 6. Orders and payments
-- ---------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  service_id uuid references public.services (id) on delete set null,
  service_title text not null,
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  customer_email text not null check (char_length(customer_email) between 5 and 160),
  notes text,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_status_idx on public.orders (status, created_at desc);
create index if not exists orders_user_idx on public.orders (user_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  provider text not null,
  provider_payment_id text,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payments_order_idx on public.payments (order_id);
create unique index if not exists payments_provider_ref_idx
  on public.payments (provider, provider_payment_id)
  where provider_payment_id is not null;

-- ---------------------------------------------------------------------
-- 7. updated_at triggers
-- ---------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_site_settings on public.site_settings;
create trigger touch_site_settings before update on public.site_settings
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_projects on public.projects;
create trigger touch_projects before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_services on public.services;
create trigger touch_services before update on public.services
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_orders on public.orders;
create trigger touch_orders before update on public.orders
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_payments on public.payments;
create trigger touch_payments before update on public.payments
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- 8. Row Level Security
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.contact_messages enable row level security;
alter table public.orders enable row level security;
alter table public.payments enable row level security;

-- Profiles: read own, admins read all; update own name/email (role protected
-- by trigger), admins may update anyone.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- Site settings: public read, admin write.
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read"
  on public.site_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
  on public.site_settings for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Projects: published are public; admins manage everything.
drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read"
  on public.projects for select
  to anon, authenticated
  using (published = true);

drop policy if exists "projects_admin_read" on public.projects;
create policy "projects_admin_read"
  on public.projects for select
  to authenticated
  using (public.is_admin());

drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write"
  on public.projects for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Services: active are public; admins manage everything.
drop policy if exists "services_public_read" on public.services;
create policy "services_public_read"
  on public.services for select
  to anon, authenticated
  using (active = true);

drop policy if exists "services_admin_read" on public.services;
create policy "services_admin_read"
  on public.services for select
  to authenticated
  using (public.is_admin());

drop policy if exists "services_admin_write" on public.services;
create policy "services_admin_write"
  on public.services for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Contact messages: writes happen only through the server API route using the
-- service role (so validation, honeypot and rate limiting cannot be bypassed
-- with the public anon key). Only admins may read or manage.
drop policy if exists "contact_messages_public_insert" on public.contact_messages;

drop policy if exists "contact_messages_admin_read" on public.contact_messages;
create policy "contact_messages_admin_read"
  on public.contact_messages for select
  to authenticated
  using (public.is_admin());

drop policy if exists "contact_messages_admin_update" on public.contact_messages;
create policy "contact_messages_admin_update"
  on public.contact_messages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "contact_messages_admin_delete" on public.contact_messages;
create policy "contact_messages_admin_delete"
  on public.contact_messages for delete
  to authenticated
  using (public.is_admin());

-- Orders: customers can read their own orders; admins manage all.
-- Inserts happen only through the server (service role), never the browser.
drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "orders_admin_write" on public.orders;
create policy "orders_admin_write"
  on public.orders for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Payments: admins read only. Writes only via service role (bypasses RLS).
drop policy if exists "payments_admin_read" on public.payments;
create policy "payments_admin_read"
  on public.payments for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------
-- 9. Storage bucket for project covers
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('project-covers', 'project-covers', true)
on conflict (id) do nothing;

drop policy if exists "project_covers_public_read" on storage.objects;
create policy "project_covers_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-covers');

drop policy if exists "project_covers_admin_insert" on storage.objects;
create policy "project_covers_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-covers' and public.is_admin());

drop policy if exists "project_covers_admin_update" on storage.objects;
create policy "project_covers_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-covers' and public.is_admin())
  with check (bucket_id = 'project-covers' and public.is_admin());

drop policy if exists "project_covers_admin_delete" on storage.objects;
create policy "project_covers_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-covers' and public.is_admin());

-- ---------------------------------------------------------------------
-- 10. Seed data (safe to re-run)
-- ---------------------------------------------------------------------
insert into public.site_settings (id, name_ar, name_en, title_ar, title_en, bio_ar, bio_en, email, whatsapp, github, linkedin, x, telegram)
values (
  1,
  'أبو جاسم',
  'Abu Jasem',
  'مطور ويب متكامل ومصمم تجارب رقمية',
  'Full-Stack Developer & Digital Experience Designer',
  'مطور ويب متكامل بخبرة تتجاوز 6 سنوات في بناء مواقع ومنصات رقمية عالية الأداء.',
  'Full-stack developer with 6+ years of experience building high-performance websites and digital platforms.',
  'hello@abujasem.dev',
  '970000000000',
  'https://github.com/',
  'https://www.linkedin.com/',
  'https://x.com/',
  'https://t.me/abo_jasem_info'
)
on conflict (id) do nothing;

insert into public.services (slug, title_ar, title_en, description_ar, description_en, icon, price, active, sort_order)
values
  ('website-development', 'تطوير المواقع', 'Website Development',
   'مواقع سريعة ومتجاوبة مبنية بأحدث التقنيات، من صفحة الهبوط إلى المنصة الكاملة.',
   'Fast, responsive websites built with modern technologies — from landing pages to full platforms.',
   'Code2', 450, true, 1),
  ('frontend-development', 'تطوير الواجهات الأمامية', 'Frontend Development',
   'واجهات تفاعلية دقيقة Pixel-perfect مع حركات سلسة وأداء عالٍ وإمكانية وصول.',
   'Pixel-perfect interactive interfaces with smooth motion, high performance and accessibility.',
   'LayoutTemplate', 300, true, 2),
  ('backend-development', 'تطوير الواجهة الخلفية', 'Backend Development',
   'واجهات API آمنة، قواعد بيانات منظمة، ومصادقة وتكاملات جاهزة للتوسع.',
   'Secure APIs, well-structured databases, authentication and integrations built to scale.',
   'Server', 500, true, 3),
  ('ui-ux-implementation', 'تنفيذ واجهات UI/UX', 'UI/UX Implementation',
   'تحويل تصاميم Figma إلى كود نظيف ومتجاوب مع نظام مكونات موحد.',
   'Turning Figma designs into clean, responsive code with a consistent component system.',
   'PenTool', 250, true, 4),
  ('ecommerce-development', 'تطوير المتاجر الإلكترونية', 'E-commerce Development',
   'متاجر متكاملة مع إدارة منتجات، سلة، دفع آمن، ولوحة طلبات.',
   'Complete stores with product management, cart, secure payments and an orders dashboard.',
   'ShoppingCart', 700, true, 5),
  ('ai-integrations', 'تكاملات الذكاء الاصطناعي', 'AI Integrations',
   'دمج نماذج الذكاء الاصطناعي في منتجك: مساعدون، بحث دلالي، وتوليد محتوى.',
   'Integrating AI models into your product: assistants, semantic search and content generation.',
   'Sparkles', 650, true, 6)
on conflict (slug) do nothing;

insert into public.projects
  (slug, title_ar, title_en, description_ar, description_en, long_description_ar, long_description_en,
   category, tech, demo_url, repo_url, featured, published, sort_order)
values
  ('luxora-store', 'لوكسورا — متجر أزياء', 'LUXORA — Fashion Store',
   'متجر إلكتروني فاخر بتجربة شراء سلسة، سلة ذكية، ودفع آمن متكامل.',
   'A premium fashion e-commerce experience with a fluid checkout, smart cart and secure payments.',
   'لوكسورا منصة تجارة إلكترونية كاملة صُممت لعلامة أزياء راقية. تشمل كتالوجاً ديناميكياً، بحثاً فورياً، سلة محفوظة، ولوحة تحكم لإدارة المنتجات والطلبات.',
   'LUXORA is a complete e-commerce platform built for a premium fashion brand, including a dynamic catalog, instant search, persistent cart and a management dashboard.',
   'ecommerce', array['Next.js','TypeScript','Tailwind CSS','Stripe','Supabase'],
   'https://example.com', 'https://github.com', true, true, 1),
  ('nabd-tasks', 'نبض — منصة إدارة مهام', 'Nabd — Task Platform',
   'منصة SaaS لإدارة المهام والتعاون الفوري بين الفرق، بواجهة نظيفة وتحديثات لحظية.',
   'A SaaS task management and real-time team collaboration platform with a clean UI and instant updates.',
   'نبض منصة إنتاجية للفرق الصغيرة والمتوسطة. تدعم المشاريع، المهام الفرعية، التعليقات، الإشعارات اللحظية، وأدوار المستخدمين.',
   'Nabd is a productivity platform for small and mid-sized teams. It supports projects, subtasks, comments, real-time notifications and user roles.',
   'saas', array['Next.js','Supabase','PostgreSQL','Realtime','Framer Motion'],
   'https://example.com', null, true, true, 2),
  ('aura-studio', 'أورا ستوديو — موقع وكالة', 'AURA Studio — Agency Site',
   'موقع تعريفي لوكالة إبداعية بتجربة ثلاثية الأبعاد وحركات سينمائية.',
   'An agency website with an immersive 3D experience and cinematic motion design.',
   'موقع وكالة إبداعية يضع التجربة البصرية في المقدمة: مشهد ثلاثي الأبعاد تفاعلي، انتقالات سلسة بين الأقسام، وصفحات دراسات حالة غنية.',
   'A creative agency site that puts visual experience first: an interactive 3D scene, smooth transitions and rich case-study pages.',
   'web', array['Next.js','React Three Fiber','Three.js','GSAP','Tailwind CSS'],
   'https://example.com', 'https://github.com', true, true, 3),
  ('sanad-estate', 'سند — منصة عقارية', 'Sanad — Real Estate Platform',
   'منصة بحث عن العقارات مع خرائط تفاعلية، فلاتر متقدمة، وحجز معاينات.',
   'A real-estate discovery platform with interactive maps, advanced filters and viewing bookings.',
   'سند يربط المشترين والمستأجرين بأصحاب العقارات عبر تجربة بحث ذكية.',
   'Sanad connects buyers and renters with property owners through smart discovery.',
   'web', array['Next.js','TypeScript','Mapbox','Prisma','PostgreSQL'],
   null, 'https://github.com', false, true, 4),
  ('pulse-analytics', 'بولس — لوحة تحليلات', 'Pulse — Analytics Dashboard',
   'لوحة تحكم تحليلية بواجهات بيانات غنية، رسوم تفاعلية، وتجربة استخدام مدروسة.',
   'An analytics dashboard with rich data visualization, interactive charts and a carefully crafted UX.',
   'بولس لوحة تحليلات لفرق المنتج تعرض مؤشرات الأداء، مسارات التحويل، والسلوك اليومي عبر رسوم تفاعلية عالية الأداء.',
   'Pulse is an analytics dashboard for product teams, surfacing KPIs, conversion funnels and daily behavior through high-performance charts.',
   'uiux', array['React','TypeScript','D3.js','Tailwind CSS','Storybook'],
   'https://example.com', null, false, true, 5),
  ('zaytoun-market', 'زيتون — سوق طبيعي', 'Zaytoun — Organic Market',
   'متجر إلكتروني لمنتجات طبيعية بتجربة هادئة وهوية بصرية دافئة.',
   'An organic products store with a calm experience and a warm visual identity.',
   'زيتون متجر لمنتجات طبيعية محلية يجمع بين تصوير منتجات دافئ وتصفح بسيط واشتراكات شهرية.',
   'Zaytoun is a store for local organic products, combining warm photography, simple browsing and monthly subscriptions.',
   'ecommerce', array['Next.js','Sanity','Stripe','Tailwind CSS'],
   null, null, false, true, 6)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- 11. Promote an administrator (run manually, once, after signing up):
--
--   update public.profiles
--   set role = 'admin'
--   where email = 'you@example.com';
--
-- Then sign out and sign in again. Never expose a hardcoded admin password.
-- ---------------------------------------------------------------------
