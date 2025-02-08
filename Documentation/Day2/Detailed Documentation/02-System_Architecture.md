# System Architecture Design

## 1. High-Level Architecture

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

## 2. Component Architecture

### Frontend Layer (Next.js)

#### Core Components

- **Pages**: Server-side rendered routes
- **Components**: Reusable UI elements
- **Hooks**: Custom data fetching and state management
- **Utils**: Helper functions and utilities

#### State Management

- **React Context**: Application-wide state
- **React Query**: Server state management
- **Local Storage**: Client-side persistence
- **Supabase Realtime**: Live updates

### Backend Services

#### Sanity CMS

- **Content Studio**: Admin interface
- **GROQ API**: Content queries
- **Asset Pipeline**: Media management
- **Webhooks**: Content updates

#### Supabase

- **Authentication**

  - Social login providers
  - JWT management
  - Session handling
  - Role-based access

- **Database**

  - PostgreSQL database
  - Row Level Security
  - Real-time subscriptions
  - Automated backups

- **Real-time Engine**
  - Live data sync
  - Presence detection
  - Broadcast channels
  - Change notifications

### Third-Party Services

#### Payment Processing

- **Stripe**
  - Payment intents
  - Customer management
  - Subscription handling
  - Refund processing

#### Shipping Integration

- **Shipping Provider API**
  - Rate calculation
  - Label generation
  - Tracking updates
  - Delivery notifications

#### Media Delivery

- **CDN**
  - Image optimization
  - Global distribution
  - Cache management
  - Lazy loading

## 3. Data Flow Architecture

### Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Supabase
    participant Database

    User->>Frontend: Login Request
    Frontend->>Supabase: Authenticate
    Supabase-->>Frontend: JWT Token
    Frontend->>Database: Fetch User Data
    Database-->>Frontend: User Profile
    Frontend-->>User: Login Complete
```

### Product Management Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Sanity
    participant Frontend
    participant Supabase
    participant CDN

    Admin->>Sanity: Update Product
    Sanity->>Frontend: Content Update
    Sanity->>CDN: Media Assets
    Frontend->>Supabase: Update Stock
    Supabase-->>Frontend: Real-time Update
```

### Order Processing Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Supabase
    participant Stripe
    participant Shipping

    User->>Frontend: Place Order
    Frontend->>Stripe: Process Payment
    Stripe-->>Frontend: Payment Success
    Frontend->>Supabase: Create Order
    Supabase-->>Frontend: Order Confirmed
    Frontend->>Shipping: Create Shipment
    Shipping-->>Frontend: Tracking Info
```

## 4. Security Architecture

### Authentication Security

- JWT-based authentication
- Role-based access control
- Session management
- 2FA support

### Data Security

- Row Level Security policies
- Data encryption
- API rate limiting
- CORS configuration

### Payment Security

- PCI compliance
- Secure payment processing
- Fraud prevention
- Transaction monitoring

## 5. Deployment Architecture

### Infrastructure

- **Frontend**: Vercel (Next.js)
- **Content**: Sanity Cloud
- **Database**: Supabase Cloud
- **Media**: CDN Provider

### Environments

- Development
- Staging
- Production
- QA/Testing

### Monitoring

- Performance metrics
- Error tracking
- Security alerts
- Business analytics

---

_Updated to include Supabase integration - NextJS Design JAM 2025_
