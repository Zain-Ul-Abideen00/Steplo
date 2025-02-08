# API Requirements

## 1. Authentication APIs (Supabase)

### User Management

```typescript
// Sign Up
POST /auth/signup
{
  "email": "string",
  "password": "string",
  "metadata": {
    "full_name": "string",
    "phone": "string"
  }
}

// Sign In
POST /auth/signin
{
  "email": "string",
  "password": "string"
}

// Social Auth
GET /auth/signin/:provider
```

### Session Management

```typescript
// Get User Session
GET / auth / session;

// Refresh Token
POST / auth / refresh;

// Sign Out
POST / auth / signout;
```

## 2. Product APIs

### Content APIs (Sanity)

```typescript
// Get All Products
GET /api/products
Response: {
  products: [{
    id: string,
    name: string,
    description: string,
    images: string[],
    features: string[],
    supabaseProductId: string
  }]
}

// Get Single Product
GET /api/products/:slug
Response: {
  product: {
    id: string,
    name: string,
    description: string,
    images: string[],
    features: string[],
    supabaseProductId: string
  }
}
```

### Operational APIs (Supabase)

```typescript
// Get Product Stock
GET /rest/v1/product_variants
?product_id=eq.:id
&select=size,color,stock_quantity,price

// Subscribe to Stock Updates
const subscription = supabase
  .from('product_variants')
  .on('UPDATE', payload => {
    // Handle stock update
  })
  .subscribe()
```

## 3. Cart APIs (Supabase)

### Cart Management

```typescript
// Add to Cart
POST /rest/v1/cart_items
{
  "user_id": "string",
  "variant_id": "string",
  "quantity": number
}

// Update Cart Item
PATCH /rest/v1/cart_items
?user_id=eq.:user_id
&variant_id=eq.:variant_id
{
  "quantity": number
}

// Remove from Cart
DELETE /rest/v1/cart_items
?user_id=eq.:user_id
&variant_id=eq.:variant_id

// Get Cart Items
GET /rest/v1/cart_items
?user_id=eq.:user_id
&select=*,product_variants(*)
```

### Real-time Cart Updates

```typescript
// Subscribe to Cart Changes
const subscription = supabase
  .from("cart_items")
  .on("*", (payload) => {
    // Handle cart update
  })
  .subscribe();
```

## 4. Order APIs (Supabase)

### Order Management

```typescript
// Create Order
POST /rest/v1/orders
{
  "user_id": "string",
  "total_amount": number,
  "shipping_address": {
    "address": "string",
    "city": "string",
    "postal_code": "string"
  }
}

// Get Order Details
GET /rest/v1/orders
?user_id=eq.:user_id
&select=*,order_items(*)

// Update Order Status
PATCH /rest/v1/orders
?id=eq.:order_id
{
  "status": "string"
}
```

### Order Tracking

```typescript
// Subscribe to Order Updates
const subscription = supabase
  .from("orders")
  .on("UPDATE", (payload) => {
    // Handle order status update
  })
  .subscribe();
```

## 5. Payment APIs (Stripe)

### Payment Processing

```typescript
// Create Payment Intent
POST /api/create-payment-intent
{
  "amount": number,
  "currency": "string"
}

// Confirm Payment
POST /api/confirm-payment
{
  "payment_intent_id": "string"
}
```

## 6. Shipping APIs

### Shipping Calculations

```typescript
// Get Shipping Rates
POST /api/shipping/calculate
{
  "items": [{
    "weight": number,
    "dimensions": {
      "length": number,
      "width": number,
      "height": number
    }
  }],
  "destination": {
    "postal_code": "string",
    "country": "string"
  }
}
```

### Tracking

```typescript
// Get Tracking Info
GET /api/shipping/track/:tracking_number
Response: {
  status: string,
  estimated_delivery: string,
  tracking_events: [{
    status: string,
    location: string,
    timestamp: string
  }]
}
```

## 7. Real-time Subscriptions (Supabase)

### Product Updates

```typescript
// Stock Level Changes
const subscription = supabase
  .from("product_variants")
  .on("UPDATE", (payload) => {
    // Handle stock update
  })
  .subscribe();
```

### Cart Sync

```typescript
// Cart Changes
const subscription = supabase
  .from("cart_items")
  .on("*", (payload) => {
    // Handle cart update
  })
  .subscribe();
```

### Order Updates

```typescript
// Order Status Changes
const subscription = supabase
  .from("orders")
  .on("UPDATE", (payload) => {
    // Handle order update
  })
  .subscribe();
```

## 8. Security Requirements

### Authentication

- JWT token required for authenticated endpoints
- Row Level Security policies for database access
- Rate limiting for API endpoints

### Data Validation

```sql
-- Example RLS Policy
CREATE POLICY "Users can only access their own cart"
ON cart_items
FOR ALL
USING (auth.uid() = user_id);
```

### Error Handling

```typescript
// Standard Error Response
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

## 9. Performance Requirements

### Caching

- Client-side caching with React Query
- CDN caching for static content
- Database query optimization

### Rate Limiting

```typescript
interface RateLimitHeaders {
  "X-RateLimit-Limit": number;
  "X-RateLimit-Remaining": number;
  "X-RateLimit-Reset": number;
}
```

---

_Updated to include Supabase integration - NextJS Design JAM 2025_
