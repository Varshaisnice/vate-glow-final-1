import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const get = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    if (args.search) {
      return await ctx.db
        .query("products")
        .withSearchIndex("search_name", (q) => {
          let search = q.search("name", args.search!);
          if (args.category) {
            search = search.eq("category", args.category);
          }
          return search;
        })
        .paginate(args.paginationOpts);
    }

    if (args.category) {
      return await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .order("desc")
        .paginate(args.paginationOpts);
    }
    
    return await ctx.db.query("products").order("desc").paginate(args.paginationOpts);
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").take(8);
  },
});

export const getRelated = query({
  args: { category: v.string(), excludeId: v.id("products") },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .take(5);
    return products.filter((p) => p._id !== args.excludeId);
  },
});

// Admin mutations
export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    category: v.string(),
    brand: v.string(),
    skinType: v.optional(v.string()),
    images: v.array(v.string()),
    ingredients: v.optional(v.string()),
    stock: v.number(),
  },
  handler: async (ctx, args) => {
    // In a real app, check for admin role here
    return await ctx.db.insert("products", {
      ...args,
      rating: 0,
      reviewCount: 0,
      isSoldOut: args.stock <= 0,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    patch: v.object({
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      price: v.optional(v.number()),
      category: v.optional(v.string()),
      brand: v.optional(v.string()),
      stock: v.optional(v.number()),
      isSoldOut: v.optional(v.boolean()),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.patch);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});