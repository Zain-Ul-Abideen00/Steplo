# **API Endpoints**

## **API Specification**

## **Authentication Endpoints**

| **Endpoint**           | **Method** | **Description**        | **Response Example**                                                                      |
| ---------------------- | ---------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `/auth/signup`         | `POST`     | Register new user      | `{ "user": { "id": "123", "email": "user@example.com" }, "session": { "token": "..." } }` |
| `/auth/signin`         | `POST`     | User login             | `{ "user": { "id": "123" }, "session": { "token": "..." } }`                              |
| `/auth/signout`        | `POST`     | User logout            | `{ "message": "Signed out successfully" }`                                                |
| `/auth/reset-password` | `POST`     | Request password reset | `{ "message": "Reset email sent" }`                                                       |

## **Product Endpoints**

| **Endpoint**               | **Method** | **Description**        | **Response Example**                                                                                                                              |
| -------------------------- | ---------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/products`            | `GET`      | Fetch all products.    | `{ "products": [{ "id": "123", "name": "Running Shoes", "price": 120, "stock": 50, "images": [...], "variants": [...] }] }`                       |
| `/api/products/{slug}`     | `GET`      | Get product details    | `{ "id": "123", "name": "Running Shoes", "description": "...", "price": 120, "stock": 50, "images": [...], "variants": [...], "reviews": [...] }` |
| `/api/products/categories` | `GET`      | Get product categories | `{ "categories": [{ "id": "1", "name": "Athletic", "subcategories": [...] }] }`                                                                   |
| `/api/products/search`     | `GET`      | Search products        | `{ "products": [...], "total": 100, "page": 1 }`                                                                                                  |

## **Cart Endpoints**

| **Endpoint**       | **Method** | **Description**  | **Response Example**                                                    |
| ------------------ | ---------- | ---------------- | ----------------------------------------------------------------------- |
| `/api/cart`        | `GET`      | Get cart items   | `{ "items": [...], "total": 240, "itemCount": 2 }`                      |
| `/api/cart/add`    | `POST`     | Add item to cart | `{ "message": "Item added", "cart": { "items": [...], "total": 240 } }` |
| `/api/cart/update` | `PUT`      | Update cart item | `{ "message": "Cart updated", "cart": { "items": [...] } }`             |
| `/api/cart/remove` | `DELETE`   | Remove cart item | `{ "message": "Item removed", "cart": { "items": [...] } }`             |

## **Order Endpoints**

| **Endpoint**              | **Method** | **Description**   | **Response Example**                                                            |
| ------------------------- | ---------- | ----------------- | ------------------------------------------------------------------------------- |
| `/api/orders`             | `GET`      | Get user orders   | `{ "orders": [{ "id": "ORD123", "status": "Processing", "items": [...] }] }`    |
| `/api/orders/create`      | `POST`     | Create new order  | `{ "orderId": "ORD123", "status": "Created", "total": 240 }`                    |
| `/api/orders/{id}`        | `GET`      | Get order details | `{ "id": "ORD123", "status": "Processing", "items": [...], "shipping": {...} }` |
| `/api/orders/{id}/cancel` | `POST`     | Cancel order      | `{ "message": "Order cancelled", "orderId": "ORD123" }`                         |

## **Shipping Endpoints**

| **Endpoint**               | **Method** | **Description**          | **Response Example**                                                                   |
| -------------------------- | ---------- | ------------------------ | -------------------------------------------------------------------------------------- |
| `/api/shipping/calculate`  | `POST`     | Calculate shipping rates | `{ "rates": [{ "carrier": "FedEx", "cost": 15, "eta": "2-3 days" }] }`                 |
| `/api/shipping/track/{id}` | `GET`      | Track shipment           | `{ "shipmentId": "SHIP123", "status": "In Transit", "location": "...", "eta": "..." }` |
| `/api/shipping/validate`   | `POST`     | Validate address         | `{ "valid": true, "normalized": { "street": "...", "city": "..." } }`                  |

## **Real-time Subscriptions**

```typescript
// Product Stock Updates
const stockSubscription = supabase
  .from("products")
  .on("UPDATE", (payload) => {
    // Handle stock updates
  })
  .subscribe();

// Cart Changes
const cartSubscription = supabase
  .from("cart_items")
  .on("*", (payload) => {
    // Handle cart updates
  })
  .subscribe();

// Order Status Updates
const orderSubscription = supabase
  .from("orders")
  .on("UPDATE", (payload) => {
    // Handle order status changes
  })
  .subscribe();
```

## **Error Responses**

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  status: number;
}
```

## **Rate Limiting**

All endpoints include the following headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640995200
```

## **Security**

- All endpoints require authentication except:

  - `/auth/signup`
  - `/auth/signin`
  - `/api/products` (GET)
  - `/api/products/{slug}` (GET)
  - `/api/products/categories` (GET)

- Row Level Security (RLS) policies are implemented for:
  - Cart items (users can only access their own cart)
  - Orders (users can only access their own orders)
  - User profiles (users can only access their own profile)

---

_Updated to include Supabase integration - NextJS Design JAM 2025_
