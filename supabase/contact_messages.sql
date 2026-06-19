-- Run this in Supabase SQL Editor to create the contact_messages table

create table if not exists contact_messages (
  id        bigint generated always as identity primary key,
  name      text not null,
  company   text,
  email     text not null,
  phone     text,
  subject   text not null,
  message   text not null,
  status    text not null default 'unread' check (status in ('unread', 'read', 'replied')),
  reply     text,
  replied_at timestamptz,
  created_at timestamptz default now()
);

-- Enable Row Level Security (optional but recommended)
alter table contact_messages enable row level security;

-- Allow public INSERT (contact form submissions)
create policy "Allow public insert" on contact_messages
  for insert to anon with check (true);

-- Allow service role full access (admin)
create policy "Allow service role all" on contact_messages
  for all to service_role using (true);
