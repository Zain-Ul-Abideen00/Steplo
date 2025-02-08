# Updated System Architecture with Supabase Integration

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

    %% Data Flow Description
    subgraph DataFlow[Data Flow]
        direction TB
        CONTENT[Content Management]:::backend
        OPERATIONS[Operational Data]:::supabase
        CONTENT -->|Sanity| Products/Marketing
        OPERATIONS -->|Supabase| Users/Orders/Inventory
    end
```

## Key Components

### Frontend (Next.js)

- **User Interface**: React components and pages
- **UI Components**: Reusable components for product display, cart, etc.
- **Custom Hooks**: Data fetching and state management

### Sanity CMS

- Product content and descriptions
- Marketing materials
- Media assets
- SEO content

### Supabase

- **Authentication**: User management and sessions
- **Database**: Orders, inventory, and user data
- **Real-time Engine**: Live updates and notifications

### Third-Party Services

- **Stripe**: Payment processing
- **Shipping API**: Order tracking
- **CDN**: Image optimization and delivery

## Data Flow

1. **Content Flow**

   - Sanity → Product information
   - Supabase → Operational data
   - CDN → Media delivery

2. **User Flow**

   - Authentication via Supabase
   - Real-time cart updates
   - Order processing and tracking

3. **Order Flow**
   - Cart management in Supabase
   - Payment processing via Stripe
   - Order tracking via Shipping API

```

```
