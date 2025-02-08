# Schemas Documentation

## Overview

This directory contains the data schemas for the Steplo marketplace, defining the structure and relationships of our data models across both Sanity CMS and Supabase.

## Files

- [`combined_schema.md`](./combined_schema.md): Comprehensive schema definitions for all data models
  - Product schemas
  - Customer schemas
  - Order schemas
  - Inventory schemas
  - Shipping schemas

## Schema Organization

### Content Models (Sanity CMS)

- Product content
- Marketing materials
- Blog posts
- Media assets
- SEO metadata

### Operational Models (Supabase)

- User authentication
- Cart management
- Order processing
- Real-time features
- Inventory tracking

## Usage

1. **Sanity CMS Setup**

   - Use these schemas to configure your Sanity Studio
   - Follow type definitions for content modeling
   - Reference relationships between documents

2. **Supabase Setup**

   - Use as reference for database table creation
   - Implement Row Level Security policies
   - Set up real-time subscriptions

3. **Development**
   - Reference for type definitions
   - Guide for API implementation
   - Basis for data validation

## Schema Updates

When updating schemas:

1. Update the `combined_schema.md` file
2. Apply changes to both Sanity and Supabase
3. Update related TypeScript types
4. Test data migrations if needed

## Best Practices

- Maintain schema version history
- Document all relationships
- Keep types consistent
- Follow naming conventions
- Include validation rules

---

_Updated for NextJS Design JAM 2025_
