import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
      username: v.optional(v.string()),
    }).index("email", ["email"]), // index for the email. do not remove or modify

    products: defineTable({
      name: v.string(),
      description: v.string(),
      price: v.number(),
      category: v.string(),
      brand: v.string(),
      skinType: v.optional(v.string()),
      images: v.array(v.string()),
      rating: v.number(),
      reviewCount: v.number(),
      ingredients: v.optional(v.string()),
      stock: v.number(),
      isSoldOut: v.boolean(),
    })
      .index("by_category", ["category"])
      .index("by_brand", ["brand"])
      .searchIndex("search_name", {
        searchField: "name",
        filterFields: ["category", "brand"],
      }),

    cartItems: defineTable({
      userId: v.id("users"),
      productId: v.id("products"),
      quantity: v.number(),
    }).index("by_user", ["userId"]),

    wishlistItems: defineTable({
      userId: v.id("users"),
      productId: v.id("products"),
    })
      .index("by_user_product", ["userId", "productId"])
      .index("by_user", ["userId"]),

    orders: defineTable({
      userId: v.id("users"),
      items: v.array(
        v.object({
          productId: v.id("products"),
          name: v.string(),
          price: v.number(),
          quantity: v.number(),
          image: v.string(),
        })
      ),
      total: v.number(),
      status: v.string(),
      shippingAddress: v.object({
        fullName: v.string(),
        address: v.string(),
        city: v.string(),
        postalCode: v.string(),
        country: v.string(),
      }),
      paymentStatus: v.string(),
    }).index("by_user", ["userId"]),

    reviews: defineTable({
      productId: v.id("products"),
      userId: v.id("users"),
      userName: v.string(),
      rating: v.number(),
      comment: v.string(),
    }).index("by_product", ["productId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;