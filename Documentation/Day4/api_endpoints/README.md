# API Endpoints Documentation

## Product Management

### Get All Products

```typescript
GET /api/products

Response {
  success: boolean;
  data: {
    products: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      category: string;
      images: string[];
      variants: Array<{
        size: string;
        color: string;
        stock: number;
      }>;
      ratings: number;
      reviews: number;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
  };
}
```

### Get Single Product

```typescript
GET /api/products/[id]

Response {
  success: boolean;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    variants: Array<{
      size: string;
      color: string;
      stock: number;
    }>;
    ratings: number;
    reviews: Array<{
      userId: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
}
```

## User Management

### Get User Profile

```typescript
GET /api/users/profile

Headers {
  Authorization: 'Bearer ${token}'
}

Response {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
    preferences: {
      size: string;
      categories: string[];
      notifications: boolean;
    };
    addresses: Array<{
      id: string;
      type: string;
      address: string;
      city: string;
      country: string;
      isDefault: boolean;
    }>;
  };
}
```

## Cart Operations

### Get Cart

```typescript
GET /api/cart

Headers {
  Authorization: 'Bearer ${token}'
}

Response {
  success: boolean;
  data: {
    id: string;
    items: Array<{
      productId: string;
      quantity: number;
      variant: {
        size: string;
        color: string;
      };
      price: number;
    }>;
    total: number;
    totalItems: number;
  };
}
```

### Add to Cart

```typescript
POST /api/cart/items

Headers {
  Authorization: 'Bearer ${token}'
}

Body {
  productId: string;
  quantity: number;
  variant: {
    size: string;
    color: string;
  };
}

Response {
  success: boolean;
  data: {
    cartId: string;
    item: {
      productId: string;
      quantity: number;
      variant: {
        size: string;
        color: string;
      };
      price: number;
    };
    total: number;
    totalItems: number;
  };
}
```

## Order Processing

### Create Order

```typescript
POST /api/orders

Headers {
  Authorization: 'Bearer ${token}'
}

Body {
  items: Array<{
    productId: string;
    quantity: number;
    variant: {
      size: string;
      color: string;
    };
  }>;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
}

Response {
  success: boolean;
  data: {
    orderId: string;
    status: string;
    items: Array<{
      productId: string;
      quantity: number;
      price: number;
    }>;
    total: number;
    shippingAddress: {
      address: string;
      city: string;
      country: string;
    };
    paymentStatus: string;
    estimatedDelivery: string;
  };
}
```

## Search & Filtering

### Search Products

```typescript
GET /api/search?query=${query}&category=${category}&minPrice=${min}&maxPrice=${max}

Response {
  success: boolean;
  data: {
    products: Array<{
      id: string;
      name: string;
      price: number;
      category: string;
      thumbnail: string;
    }>;
    total: number;
    page: number;
    limit: number;
  };
}
```

## Error Responses

All endpoints follow a standard error response format:

```typescript
{
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

Common Error Codes:

- `AUTH_REQUIRED`: Authentication required
- `INVALID_INPUT`: Invalid input parameters
- `NOT_FOUND`: Resource not found
- `INSUFFICIENT_STOCK`: Product stock not available
- `PAYMENT_FAILED`: Payment processing failed
- `SERVER_ERROR`: Internal server error

## Rate Limiting

All API endpoints are rate-limited:

- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```typescript
Headers {
  Authorization: 'Bearer ${token}'
}
```

## Versioning

Current API Version: v1
Base URL: `/api/v1/`
