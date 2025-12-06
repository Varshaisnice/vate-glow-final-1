import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./authHelpers";

export const getWishlist = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const items = await ctx.db
      .query("wishlistItems")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const products = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return product;
      })
    );

    return products.filter((p) => p !== null);
  },
});

export const toggleWishlist = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("wishlistItems")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", user._id).eq("productId", args.productId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return false; // removed
    } else {
      await ctx.db.insert("wishlistItems", {
        userId: user._id,
        productId: args.productId,
      });
      return true; // added
    }
  },
});

export const isInWishlist = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return false;

    const existing = await ctx.db
      .query("wishlistItems")
      .withIndex("by_user_product", (q) =>
        q.eq("userId", user._id).eq("productId", args.productId)
      )
      .first();

    return !!existing;
  },
});
