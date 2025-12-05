import { mutation } from "./_generated/server";

const CATEGORIES = ["Eyes", "Lips", "Face", "Skincare", "Nails", "Accessories"];
const BRANDS = ["Vate Beauty", "LuxeGlow", "SoftPetal", "MoonDust", "RoseAura"];

const PRODUCT_NAMES = {
  Eyes: ["Starlight Eyeshadow Palette", "Velvet Eyeliner", "Lash Volumizer Mascara", "Shimmer Dust", "Brow Sculptor", "Glitter Gel", "Matte Eye Primer", "Liquid Chrome Liner", "Silk Lashes", "Eye Definer Pencil"],
  Lips: ["Velvet Matte Lipstick", "Glassy Lip Gloss", "Rose Tinted Balm", "Lip Liner Pencil", "Satin Lip Cream", "Plumping Gloss", "Liquid Matte Lip", "Lip Scrub", "Lip Mask", "Sheer Lipstick"],
  Face: ["Silk Foundation", "Radiant Concealer", "Rose Blush", "Champagne Highlighter", "Setting Powder", "Dewy Primer", "Contour Stick", "Bronzing Powder", "Setting Spray", "BB Cream"],
  Skincare: ["Hydrating Serum", "Rose Water Toner", "Night Cream", "Day Moisturizer", "Clay Mask", "Face Oil", "Eye Cream", "Cleansing Balm", "Exfoliating Scrub", "Sunscreen SPF 50"],
  Nails: ["Gel Polish", "Nail Hardener", "Cuticle Oil", "Matte Top Coat", "Glass File", "Nail Stickers", "Quick Dry Drops", "Base Coat", "Nail Art Brush", "Remover Wipes"],
  Accessories: ["Makeup Sponge", "Brush Set", "Eyelash Curler", "Mirror", "Cosmetic Bag", "Hair Clips", "Headband", "Tweezers", "Brush Cleaner", "Travel Kit"]
};

const IMAGES = {
  Eyes: [
    "https://images.unsplash.com/photo-1583241744611-721f189184b8?w=500&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80",
    "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500&q=80",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&q=80",
    "https://images.unsplash.com/photo-1503236823255-943684d1834e?w=500&q=80"
  ],
  Lips: [
    "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80",
    "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500&q=80",
    "https://images.unsplash.com/photo-1591360236480-9495562922c1?w=500&q=80",
    "https://images.unsplash.com/photo-1627292441194-0264e2273117?w=500&q=80",
    "https://images.unsplash.com/photo-1605701250441-2bfae07ea38d?w=500&q=80"
  ],
  Face: [
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80",
    "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=500&q=80",
    "https://images.unsplash.com/photo-1590156206657-b18a62318c8c?w=500&q=80"
  ],
  Skincare: [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?w=500&q=80",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80",
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&q=80",
    "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&q=80"
  ],
  Nails: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80",
    "https://images.unsplash.com/photo-1632973579791-356308829767?w=500&q=80",
    "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=500&q=80",
    "https://images.unsplash.com/photo-1522337360705-8b13d52c03cc?w=500&q=80",
    "https://images.unsplash.com/photo-1599693828665-c311a8d8c964?w=500&q=80"
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80",
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
    "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=500&q=80",
    "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&q=80"
  ]
};

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing products
    const existing = await ctx.db.query("products").collect();
    for (const p of existing) {
      await ctx.db.delete(p._id);
    }

    // Create 20 products for each category
    for (const category of CATEGORIES) {
      const names = PRODUCT_NAMES[category as keyof typeof PRODUCT_NAMES] || [];
      
      for (let i = 0; i < 30; i++) {
        const nameBase = names[i % names.length];
        const name = i < names.length ? nameBase : `${nameBase} ${i + 1}`;
        const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
        const price = (Math.floor(Math.random() * 50) + 10) * 85; // Convert roughly to INR
        const stock = Math.floor(Math.random() * 100);
        const images = IMAGES[category as keyof typeof IMAGES] || [];
        
        await ctx.db.insert("products", {
          name,
          description: `Experience the luxury of ${name}. This premium ${category.toLowerCase()} product by ${brand} is designed to enhance your natural beauty. Cruelty-free and vegan.`,
          price,
          category,
          brand,
          skinType: "All Skin Types",
          images: [images[i % images.length], images[(i + 1) % images.length]],
          rating: (Math.random() * 2) + 3, // 3 to 5 stars
          reviewCount: Math.floor(Math.random() * 500),
          ingredients: "Aqua, Glycerin, Mica, Titanium Dioxide, Iron Oxides",
          stock,
          isSoldOut: stock === 0,
        });
      }
    }
  },
});