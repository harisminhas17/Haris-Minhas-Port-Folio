-- Haris Minhas portfolio schema
-- Run with: pnpm db:push

create table if not exists site_settings (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id serial primary key,
  slug text unique not null,
  name text not null,
  year text default '',
  summary text default '',
  description text default '',
  tags text[] not null default '{}',
  image text default '',
  logo text default '',
  live_url text default '',
  repo_url text default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists experiences (
  id serial primary key,
  company text not null,
  role text default '',
  period text default '',
  logo text default '',
  points text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists capabilities (
  id serial primary key,
  icon text default 'Layers',
  title text not null,
  description text default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists stack_groups (
  id serial primary key,
  label text not null,
  items text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists stack_logos (
  id serial primary key,
  name text not null,
  src text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id serial primary key,
  quote text not null,
  name text default '',
  role text default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists socials (
  id serial primary key,
  label text not null,
  href text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists media (
  id serial primary key,
  filename text not null,
  content_type text not null,
  size integer not null,
  data bytea not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on contact_messages (created_at desc);
create index if not exists projects_sort_idx on projects (sort_order);
create index if not exists experiences_sort_idx on experiences (sort_order);
