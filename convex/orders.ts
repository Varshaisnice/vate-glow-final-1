import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./authHelpers";

export const createOrder = mutation({
  args: {
    shippingAddress: v.object({
      fullName: v.string(),
      address: v.string(),
      city: v.string(),
      postalCode: v.string(),
      country: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    // Get cart items
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    if (cartItems.length === 0) throw new Error("Cart is empty");

    let total = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await ctx.db.get(item.productId);
      if (!product) continue;
      
      // Check stock
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      // Update stock
      await ctx.db.patch(product._id, {
        stock: product.stock - item.quantity,
        isSoldOut: product.stock - item.quantity <= 0,
      });

      total += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0] || "",
      });

      // Remove from cart
      await ctx.db.delete(item._id);
    }

    const orderId = await ctx.db.insert("orders", {
      userId: user._id,
      items: orderItems,
      total,
      status: "Processing",
      shippingAddress: args.shippingAddress,
      paymentStatus: "Paid", // Mock payment
    });

    return orderId;
  },
});

export const getMyOrders = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    return await ctx.db
      .query("orders")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});
