import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Wishlist() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const wishlist = useQuery(api.wishlist.getWishlist);
  const toggleWishlist = useMutation(api.wishlist.toggleWishlist);

  if (!user) {
    return (
      <div className="container py-32 text-center flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Please sign in</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Sign in to view your wishlist and save your favorite items.
        </p>
        <Button size="lg" onClick={() => navigate("/auth")} className="rounded-full">
          Sign In
        </Button>
      </div>
    );
  }

  const handleRemove = async (productId: any) => {
    try {
      await toggleWishlist({ productId });
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlist === undefined ? (
        <div className="text-center py-20">Loading...</div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Start saving your favorite beauty items.</p>
          <Button onClick={() => navigate("/shop")} className="rounded-full">
            Explore Shop
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <motion.div 
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden relative"
            >
              <div 
                className="aspect-square overflow-hidden bg-secondary/10 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
                <h3 className="font-bold truncate mb-1">{product.name}</h3>
                <p className="text-lg font-bold">₹{product.price}</p>
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    className="flex-1 rounded-full" 
                    size="sm"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                    onClick={() => handleRemove(product._id)}
                  >
                    <Heart className="fill-current w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
