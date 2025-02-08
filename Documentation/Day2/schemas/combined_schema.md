# Combined Schema Design (Sanity + Supabase)

## Sanity Schemas (Content Management)

### Product Content

```typescript
export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "supabaseProductId",
      title: "Supabase Product ID",
      type: "string",
    },
  ],
};
```

## Supabase Schema (Operational Data)

### Products Table

```sql
create table products (
  id uuid default uuid_generate_v4() primary key,
  sanity_id text references sanity.products,
  category_id uuid references categories(id),
  base_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table products enable row level security;
```

### Product Variants Table

```sql
create table product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id),
  size text not null,
  color text not null,
  sku text unique not null,
  price decimal(10,2) not null,
  stock_quantity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and create policy
alter table product_variants enable row level security;
```

### Users Table (Extended Supabase Auth)

```sql
create table user_profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  shipping_address jsonb,
  phone text,
  preferences jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and create policy
alter table user_profiles enable row level security;
```

### Orders Table

```sql
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  status text not null,
  total_amount decimal(10,2) not null,
  shipping_address jsonb not null,
  payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and create policy
alter table orders enable row level security;
```

### Order Items Table

```sql
create table order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references orders(id),
  variant_id uuid references product_variants(id),
  quantity integer not null,
  price_at_time decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS and create policy
alter table order_items enable row level security;
```

### Cart Table (Real-time Shopping Cart)

```sql
create table cart_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id),
  variant_id uuid references product_variants(id),
  quantity integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, variant_id)
);

-- Enable RLS and create policy
alter table cart_items enable row level security;
```

## Real-time Subscriptions

Enable real-time for the following tables:

- product_variants (stock updates)
- cart_items (shopping cart sync)
- orders (order status updates)
