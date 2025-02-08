# Business Structure and Data Flow

## 1. Target Audience and Product Categories

```mermaid
graph TB
    %% Define classes with fill colors
    classDef audience fill:#64B5F6, stroke:#336699, color:black
    classDef products fill:#81C784, stroke:#2E7D32, color:black
    classDef features fill:#FFB74D, stroke:#F57C00, color:black

    %% Main marketplace node
    MARKETPLACE[Steplo Marketplace]

    %% Target Audience subgraph
    subgraph Audience[Target Audience]
        YOUNG[Young Adults 18-35]:::audience
        PARENTS[Parents]:::audience
        TEENS[Teenagers]:::audience
        ATHLETES[Athletes]:::audience
        KIDS[Kids]:::audience
    end

    %% Product Categories subgraph
    subgraph Products[Product Categories]
        %% Footwear
        subgraph Footwear[Footwear]
            ATHLETIC[Athletic/Sports]:::products
            CASUAL[Casual]:::products
            FORMAL[Formal]:::products
            KIDS_SHOES[Kids' Shoes]:::products
            SNEAKERS[Fashion Sneakers]:::products
        end
        %% Apparel
        subgraph Apparel[Apparel]
            TOPS[T-shirts & Tops]:::products
            BOTTOMS[Shorts & Bottoms]:::products
            ATHLETIC_WEAR[Athletic Wear]:::products
            CASUAL_WEAR[Casual Wear]:::products
            KIDS_CLOTHING[Kids' Clothing]:::products
        end
    end

    %% Competitive Advantages subgraph
    subgraph Features[Key Features]
        FAMILY[Complete Family Shopping]:::features
        VIRTUAL[Virtual Try-On]:::features
        SIZE[Size Consistency]:::features
        STYLE[Style Matching]:::features
        PRICE[Affordable Premium]:::features
    end

    %% Connect audiences to marketplace
    YOUNG --> MARKETPLACE
    PARENTS --> MARKETPLACE
    TEENS --> MARKETPLACE
    ATHLETES --> MARKETPLACE
    KIDS --> MARKETPLACE

    %% Connect marketplace to products
    MARKETPLACE --> Footwear
    MARKETPLACE --> Apparel

    %% Connect marketplace to features
    MARKETPLACE --> Features
```

## 2. Data Schema Relationships

```mermaid
erDiagram
    PRODUCTS ||--o{ VARIANTS : has
    PRODUCTS ||--o{ CONTENT : contains
    PRODUCTS {
        string productID
        string name
        string category
        decimal basePrice
        array images
        string description
        array features
    }
    VARIANTS {
        string variantID
        string productID
        string size
        string color
        string SKU
        int stockLevel
        decimal price
    }
    CUSTOMERS ||--o{ ORDERS : places
    CUSTOMERS {
        string customerID
        string fullName
        string email
        json address
        string phone
        json preferences
    }
    ORDERS ||--o{ ORDER_ITEMS : contains
    ORDERS {
        string orderID
        string customerID
        decimal totalAmount
        string status
        json shippingDetails
        datetime orderDate
    }
    ORDER_ITEMS {
        string orderItemID
        string orderID
        string productID
        string variantID
        int quantity
        decimal price
    }
    SHIPMENT ||--|| ORDERS : tracks
    SHIPMENT {
        string shipmentID
        string orderID
        string status
        string trackingNumber
        datetime estimatedDelivery
    }
```

## 3. Implementation Workflow

```mermaid
graph LR
    %% Define classes
    classDef phase1 fill:#64B5F6, stroke:#336699, color:black
    classDef phase2 fill:#81C784, stroke:#2E7D32, color:black

    %% Phase 1
    subgraph Phase1[Phase 1 - Core Features]
        AUTH[User Authentication]:::phase1
        CATALOG[Product Catalog]:::phase1
        CHECKOUT[Basic Checkout]:::phase1
        ORDERS[Order Management]:::phase1
    end

    %% Phase 2
    subgraph Phase2[Phase 2 - Enhanced Features]
        STYLE[Style Matching]:::phase2
        SIZE[Size Recommendations]:::phase2
        VIRTUAL[Virtual Fitting]:::phase2
        FAMILY[Family Account]:::phase2
    end

    %% Workflow
    AUTH --> CATALOG
    CATALOG --> CHECKOUT
    CHECKOUT --> ORDERS
    ORDERS --> STYLE
    STYLE --> SIZE
    SIZE --> VIRTUAL
    VIRTUAL --> FAMILY
```

## 4. Success Metrics Flow

```mermaid
flowchart TD
    %% Define classes
    classDef metrics fill:#FFB74D, stroke:#F57C00, color:black

    %% Metrics
    USER[User Engagement]:::metrics
    SALES[Sales Performance]:::metrics
    FAMILY[Family Metrics]:::metrics
    PRODUCT[Product Performance]:::metrics

    %% Submetrics
    subgraph UserMetrics[User Engagement Metrics]
        SATISFACTION[Customer Satisfaction]
        ENGAGEMENT[User Activity]
        RETENTION[User Retention]
    end

    subgraph SalesMetrics[Sales Performance Metrics]
        AOV[Average Order Value]
        CONVERSION[Conversion Rate]
        REVENUE[Revenue Growth]
    end

    subgraph FamilyMetrics[Family Success Metrics]
        ACCOUNTS[Family Account Sign-ups]
        CROSS[Cross-category Purchase]
        LIFETIME[Family Lifetime Value]
    end

    subgraph ProductMetrics[Product Success Metrics]
        RETURN[Return Rate]
        MATCH[Style Match Accuracy]
        INVENTORY[Stock Turnover]
    end

    %% Connections
    USER --> UserMetrics
    SALES --> SalesMetrics
    FAMILY --> FamilyMetrics
    PRODUCT --> ProductMetrics
```

---

_Created for NextJS Design JAM 2025_
