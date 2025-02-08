import { defineType } from "sanity";

export default defineType({
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Product Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "name", // Automatically generates slug based on the 'name' field
        maxLength: 96, // Optional: limits the slug length
      },
      validation: (Rule) => Rule.required(), // Ensures the slug field is mandatory
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "isNew",
      type: "boolean",
      title: "Is New",
    },
    {
      name: "colors",
      type: "number",
      title: "Colors",
    },
    {
      name: "category",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "Men's Shoes", value: "mens-shoes" },
          { title: "Men's Top", value: "mens-top" },
          { title: "Men's Shorts", value: "mens-shorts" },
          { title: "Women's Shoes", value: "womens-shoes" },
          { title: "Women's Top", value: "womens-top" },
          { title: "Women's Shorts", value: "womens-shorts" },
          { title: "Kids", value: "kids" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Select a category for the product",
    },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    },
  ],
});
