create table if not exists pricing (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  price integer not null,
  updated_at timestamptz default now()
);

insert into pricing (key, label, price)
values
  ('self_car_10h', '자차 10시간', 290000),
  ('sedan_10h', '연수차(승용) 10시간', 320000),
  ('suv_10h', '연수차(SUV) 10시간', 340000)
on conflict (key) do nothing;

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  training_type text not null,
  region text not null,
  desired_schedule text not null,
  driving_level text not null,
  message text,
  status text default '신규',
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  author_name text not null,
  created_at date not null,
  image_url text not null,
  storage_path text,
  is_published boolean default true
);

-- Storage bucket: reviews (public)
-- In Supabase dashboard, create public bucket named 'reviews'.
