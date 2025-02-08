# Day 3 - API Integration and Data Migration

**Prepared by Ameen Alam**  
**First Published:** PKT 11:08 AM, January 15, 2025  

---

## Document Revision Information

| Version | Date                      | Amendment                    | Author       |
|---------|---------------------------|------------------------------|--------------|
| 1.0     | 11:08 AM, January 15, 2025 | Initial release of Day 1     | Ameen Alam   |
| 1.1     | 03:00 PM, January 15, 2025 | Added examples in Day 1      | Ameen Alam   |
| 2.0     | 01:00 PM, January 16, 2025 | Day 2 release                | Ameen Alam   |
| 2.1     | 02:00 PM, January 17, 2025 | Self-validation checklist    | Ameen Alam   |
| 3.0     | 04:00 PM, January 17, 2025 | Day 3 release                | Ameen Alam   |
| 3.1     | 08:30 PM, January 17, 2025 | Minor correction in link     | Ameen Alam   |

---

## Table of Contents
1. **Day 3 - API Integration and Data Migration**
   - **Objective**
   - **Key Learning Outcomes**
2. **API Overview**
   - Provided APIs
   - External Data Sources
3. **Steps for Day 3**
   - Understand the Provided API
   - Validate and Adjust Your Schema
   - Data Migration Options
   - API Integration in Next.js
4. **Error Handling Tips**
5. **Expected Output**
6. **Submission Requirements**
7. **Best Practices**
8. **Day 3 Checklist**
9. **Self-Validation Checklist**
10. **FAQs**

---

## Day 3 - API Integration and Data Migration

### Objective
The focus for Day 3 is integrating APIs and migrating data into **Sanity CMS** to build a functional marketplace backend. This approach replicates real-world practices and prepares students to handle diverse client requirements, including:
- Integrating headless APIs.
- Migrating existing data from popular eCommerce platforms.

### Key Learning Outcomes
1. Understand API integration in a Next.js project.
2. Migrate data from APIs into Sanity CMS.
3. Utilize existing data from platforms like Shopify, Magento, and more.
4. Handle and validate schemas to align with data sources.

---

## API Overview

### Provided APIs
The following APIs (Templates 0 to 9) are read-only and provided for schema validation and data migration.

#### Template 0
- [Documentation](https://docs.google.com/document/d/1tAtI-WtSByA7XbgxbvhtJq40d_IsfOBtcivmlLaoo6g/edit?usp=sharing)

#### Template 1
- [API Documentation](https://github.com/developer-hammad-rehman/template1/blob/main/README.md)
- [Migration Script](https://github.com/developer-hammad-rehman/template1/blob/main/importData.js)
- [Schema](https://github.com/developer-hammad-rehman/template1/blob/main/src/sanity/schemaTypes/products.ts)
- [GitHub Repository](https://github.com/developer-hammad-rehman/template1/tree/main)

#### Template 2
- [API](https://hackathon-apis.vercel.app/api/products)
- [Sanity Schemas - Category](https://github.com/bilalmk/hackathon-template02/blob/main/schema/category.ts)
- [Sanity Schemas - Product](https://github.com/bilalmk/hackathon-template02/blob/main/schema/product.ts)
- [Migration Script](https://github.com/bilalmk/hackathon-template02)

#### Template 3
- [Migration Script](https://github.com/OkashaTanoli/template-03-api/blob/master/scripts/data-migration.mjs)
- [API](https://template-03-api.vercel.app/api/products)
- [Sanity Schema](https://github.com/OkashaTanoli/template-03-api/blob/master/src/sanity/schemaTypes/products.ts)

#### Template 4
- [API URL](https://next-ecommerce-template-4.vercel.app/api/product)
- [Schema](https://github.com/anasseth/next-ecommerce-template-4/blob/master/src/sanity/schemaTypes/product.ts)
- [Documentation](https://github.com/anasseth/next-ecommerce-template-4/blob/master/README.md)

#### Template 5
- Follows the same API documentation as Template 6.

#### Template 6
- [API URL](https://template6-six.vercel.app/api/products)
- [Schema](https://github.com/developer-hammad-rehman/template6/blob/main/src/sanity/schemaTypes/product.ts)
- [Migration Script](https://github.com/developer-hammad-rehman/template6/blob/main/importData.js)

#### Template 7
- [API URL](https://sanity-nextjs-application.vercel.app/api/hackathon/template7)
- [Sanity Schema](https://github.com/AsharibAli/sanity-nextjs/blob/main/sanity/schemaTypes/cars.ts)
- [Migration Script](https://github.com/AsharibAli/sanity-nextjs/blob/main/scripts/importTemplate7Data.mjs)

#### Template 8
- [Documentation](https://docs.google.com/document/d/1tg3wdRvcGnEcyVRyzVpXzI8tbPClD_Z9mfFrq1vhkns/edit?tab=t.0)

#### Template 9
- [GitHub Repository](https://github.com/mubashirimtiaz/sanity-nextjs)

---

## Using External Data Sources (Optional)
Students can integrate data from popular eCommerce platforms or custom backends using their APIs or export features:
- Shopify: Export via CSV or access APIs.
- Magento: REST or GraphQL APIs.
- WooCommerce: REST APIs or manual export.
- WordPress: REST APIs or WooCommerce-specific data.
- Salesforce: APIs for CRM and product data.

---

## Steps for Day 3

### 1. Understand the Provided API
- Review the API documentation for your assigned template.
- Identify key endpoints like:
  - `/products`
  - `/categories`

### 2. Validate and Adjust Your Schema
- Compare your Sanity CMS schema (from Day 2) with the API structure.
- Adjust field names/types to ensure compatibility.
  - Example:
    - **API Field:** `product_title`
    - **Schema Field:** `name`

### 3. Data Migration Options
- **Using the Provided API:** Write scripts to fetch and transform data.
- **Manual Import:** Export data as JSON/CSV and use Sanity’s import tools.
- **External Platform APIs:** Fetch and map data to your schema.

### 4. API Integration in Next.js
- Create utility functions.
- Render data in components.
- Test endpoints using tools like Postman.

---

## Error Handling Tips
- Log errors centrally for debugging.
- Show user-friendly messages in the UI.
- Use fallback data or skeleton loaders.

---

## Expected Output
1. Sanity CMS populated with:
   - Provided API data.
   - External data sources.
   - Manually uploaded data.
2. Functional API integration in Next.js:
   - Product listings.
   - Categories.

---

## Submission Requirements
**Document Title:** `Day 3 - API Integration Report - [Your Marketplace Name]`

**What to Submit:**
- A report with:
  - API integration process.
  - Schema adjustments.
  - Migration steps.
- Screenshots:
  - API calls.
  - Data displayed in the frontend.
  - Populated Sanity CMS fields.
- Code snippets.

---

## Best Practices
1. Use `.env` files for sensitive data.
2. Follow clean coding practices:
   - Descriptive variable names.
   - Modular functions.
   - Comments for complex logic.
3. Validate data during migration.
4. Document steps thoroughly.
5. Use version control.

---

## Day 3 Checklist

| Task                         | ✔/✘ |
|------------------------------|------|
| API Understanding            |      |
| Schema Validation            |      |
| Data Migration               |      |
| API Integration in Next.js   |      |
| Submission Preparation       |      |

---

## FAQs

1. **Can we use other APIs?**  
   Yes, any API or data source aligning with your marketplace is acceptable.

2. **How to handle schema mismatches?**  
   Adjust your schema to match or map fields.

3. **No experience with API integration?**  
   Start with simple API calls using tools like Postman.

4. **Manual data addition instead of migration scripts?**  
   Yes, for small datasets.

5. **Create new APIs for this task?**  
   No, use existing APIs.

6. **Is API integration mandatory?**  
   Yes, for data fetching or migration.

7. **What to submit?**  
   A report, screenshots, and code snippets.

8. **Debugging API errors?**  
   Use developer tools or Postman for testing.

9. **Different schemas for templates?**  
   Yes, align schemas with your data source.

10. **Skills gained?**  
    - API integration.
    - Data migration.
    - Schema validation.

---

This Markdown conversion contains the full content of your document. Let me know if you need adjustments!
