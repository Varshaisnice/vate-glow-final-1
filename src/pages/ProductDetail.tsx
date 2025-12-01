import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus, Star, ShoppingBag, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = useQuery(api.products.getById, { 
    id: id as Id<"products"> 
  });

  const relatedProducts = useQuery(api.products.getRelated, 
    product ? { category: product.category, excludeId: product._id } : "skip"
  );

  const addToCart = useMutation(api.cart.addToCart);
  const toggleWishlist = useMutation(api.wishlist.toggleWishlist);
  const isInWishlist = useQuery(api.wishlist.isInWishlist, 
    product ? { productId: product._id } : "skip"
  );

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/auth");
      return;
    }
    try {
      await addToCart({ productId: product!._id, quantity });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please sign in to use wishlist");
      navigate("/auth");
      return;
    }
    const added = await toggleWishlist({ productId: product!._id });
    toast.success(added ? "Added to wishlist" : "Removed from wishlist");
  };

  if (!product) return <div className="container py-20 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        {/* Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-2xl overflow-hidden bg-secondary/10 border border-white/10"
          >
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedImage === i ? "border-primary" : "border-transparent hover:border-primary/50"
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <h2 className="text-primary font-medium mb-2">{product.brand}</h2>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="fill-current w-5 h-5" />
                <span className="font-bold">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
              {product.isSoldOut && (
                <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                  Sold Out
                </span>
              )}
            </div>
            <p className="text-3xl font-bold">${product.price}</p>
          </div>

          <div className="prose prose-invert max-w-none text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-input rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.isSoldOut}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.isSoldOut}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                size="lg" 
                className="flex-1 rounded-full"
                onClick={handleAddToCart}
                disabled={product.isSoldOut}
              >
                <ShoppingBag className="mr-2 w-5 h-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isInWishlist ? "text-red-500 border-red-500" : ""}`}
                onClick={handleWishlist}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="font-bold">Ingredients</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.ingredients || "Ingredients not listed."}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <motion.div 
                key={p._id}
                whileHover={{ y: -10 }}
                className="group bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <div className="aspect-square overflow-hidden bg-secondary/10">
                  <img 
                    src={p.images[0]} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-medium mb-1">{p.brand}</p>
                  <h3 className="font-bold truncate">{p.name}</h3>
                  <p className="mt-2 font-bold">${p.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
