CREATE TABLE IF NOT EXISTS entries (
  author text not null,
  message text not null,
  image_url text not null,
  created_at timestamp with time zone default now()
);
