# **Marketplace Technical Foundation - Steplo**

---

## **1. System Architecture Overview**

### **System Architecture Diagram**

```mermaid
graph TB

    %% Define classes with fill colors
    classDef frontend fill:#64B5F6, stroke:#336699, color:black
    classDef backend fill:#FFA726, stroke:#CC6600, color:black
    classDef thirdParty fill:#90A4AE, stroke:#666666, color:black
    classDef supabase fill:#3ECF8E, stroke:#2EA97D, color:black

    %% Frontend subgraph
    subgraph Frontend[Next.js Frontend]
        UI[User Interface]:::frontend
        COMP[UI Components]:::frontend
        HOOKS[Custom Hooks]:::frontend
    end

    %% Backend Services subgraph
    subgraph Backend[Backend Services]
        SANITY[Sanity CMS]:::backend
        subgraph Supabase[Supabase]
            AUTH[Authentication]:::supabase
            DB[Database]:::supabase
            REALTIME[Real-time Engine]:::supabase
        end
    end

    %% Third-Party APIs subgraph
    subgraph ThirdParty[Third-Party Services]
        STRIPE[Stripe Payment]:::thirdParty
        SHIPPING[Shipping Provider API]:::thirdParty
        CDN[Image CDN]:::thirdParty
    end

    %% Interactions
    UI -->|Browse Products| COMP
    COMP -->|Fetch Content| SANITY
    COMP -->|Real-time Updates| REALTIME
    HOOKS -->|Auth Operations| AUTH
    HOOKS -->|CRUD Operations| DB
    SANITY -->|Content Data| COMP
    DB -->|User/Order Data| COMP
    REALTIME -->|Live Updates| COMP
    UI -->|Place Order| HOOKS
    HOOKS -->|Process Payment| STRIPE
    STRIPE -->|Payment Confirmation| HOOKS
    HOOKS -->|Track Shipment| SHIPPING
    SHIPPING -->|Delivery Updates| HOOKS
    COMP -->|Load Images| CDN
    CDN -->|Optimized Images| COMP
```

### **Component Roles**

- **Frontend (Next.js)**:
  - **User Interface (UI)**: The visual layer where users interact with the marketplace.
  - **UI Components**: Reusable components for product listings, cart, checkout, etc.
  - **Custom Hooks**: Handle API requests, state management, and data fetching.
- **Backend Services**:
  - **Sanity CMS**: Manages product data, customer details, and order records.
  - **Supabase**: Manages user authentication, real-time database, and order management.
  - **Third-Party APIs**:
    - **Stripe Payment**: Processes payments securely.
    - **Shipping Provider API**: Provides real-time shipment tracking.
    - **Image CDN**: Optimizes image delivery for faster loading.

---

## **2. Key Workflows**

### **User Registration & Authentication (Supabase)**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Supabase Auth
    participant D as Supabase DB

    U->>F: Visits registration page
    F->>S: Submit registration data
    S-->>F: Return auth token
    F->>D: Create user profile
    D-->>F: Confirm storage
    F-->>U: Show confirmation

    Note over U,F: User receives welcome email
    Note over S: JWT token generated
    Note over D: Profile stored in Supabase
```

### **Product Browsing (Sanity + Supabase)**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant S as Sanity CMS
    participant D as Supabase DB

    U->>F: Visits product listing
    F->>S: Fetch product content
    S-->>F: Return content data
    F->>D: Fetch real-time stock
    D-->>F: Return stock levels
    F-->>U: Display products

    Note over D,F: Real-time stock updates
```

### **Order Processing (Supabase + Stripe)**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant D as Supabase DB
    participant STRIPE as Stripe
    participant SHIP as Shipping Provider

    U->>F: Adds items to cart
    F->>D: Update cart (real-time)
    D-->>F: Confirm update
    U->>F: Checkout
    F->>STRIPE: Process payment
    STRIPE-->>F: Payment confirmation
    F->>D: Create order
    F->>SHIP: Initiate shipment
    SHIP-->>F: Return tracking
    F-->>U: Show confirmation
```

---

## **3. API Implementation**

### **Authentication (Supabase)**

```typescript
// Initialize Supabase client
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Sign up
const signUp = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
};

// Sign in
const signIn = async (email: string, password: string) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
};
```

### **Product Management (Sanity + Supabase)**

```typescript
// Fetch product content from Sanity
const getProduct = async (slug: string) => {
  const product = await client.fetch(
    `
    *[_type == "product" && slug.current == $slug][0]{
      name,
      description,
      images,
      "variants": *[_type == "variant" && references(^._id)]
    }
  `,
    { slug }
  );
};

// Get real-time stock from Supabase
const getProductStock = async (productId: string) => {
  const { data, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId);
};

// Subscribe to stock updates
const subscribeToStock = (productId: string, callback: Function) => {
  const subscription = supabase
    .from(`product_variants:product_id=eq.${productId}`)
    .on("UPDATE", (payload) => {
      callback(payload.new);
    })
    .subscribe();
};
```

## **4. Security Implementation**

### **Row Level Security (Supabase)**

```sql
-- Enable RLS
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Define policies
CREATE POLICY "Users can view own cart"
ON cart_items FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
ON cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## **5. Technical Roadmap**

### Phase 1: Core Infrastructure

- Set up Supabase project and authentication
- Configure Sanity CMS for content
- Implement basic product browsing
- Set up real-time cart management

### Phase 2: Enhanced Features

- Real-time inventory tracking
- Multi-device cart synchronization
- Order management system
- User profiles and preferences

### Phase 3: Advanced Features

- Analytics integration
- Performance optimization
- Advanced search capabilities
- Recommendation engine

## **6. Deployment Strategy**

### Infrastructure

- Next.js deployment on Vercel
- Sanity Cloud for content
- Supabase Cloud for operational data
- CDN for media delivery

### Monitoring

- Supabase Dashboard
- Sanity metrics
- Custom logging
- Error tracking

---

_Created for NextJS Design JAM 2025 Hackathon - Day 2_
