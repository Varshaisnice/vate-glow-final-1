import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const navigate = useNavigate();
  const cartItems = useQuery(api.cart.getCart);
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeFromCart = useMutation(api.cart.removeFromCart);

  const subtotal = cartItems?.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0) || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleUpdateQuantity = async (id: any, quantity: number) => {
    try {
      await updateQuantity({ id, quantity });
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemove = async (id: any) => {
    try {
      await removeFromCart({ id });
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (cartItems === undefined) return <div className="container py-20 text-center">Loading...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="container py-32 text-center flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our collection to find your new favorites.
        </p>
        <Button size="lg" onClick={() => navigate("/shop")} className="rounded-full">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex gap-6 p-4 bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl"
              >
                <div className="w-24 h-24 bg-secondary/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product?.images[0]} 
                    alt={item.product?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-primary font-medium">{item.product?.brand}</p>
                      <h3 className="font-bold text-lg">{item.product?.name}</h3>
                    </div>
                    <p className="font-bold text-lg">${(item.product?.price || 0) * item.quantity}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-input rounded-md bg-background/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(item._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-card/60 backdrop-blur-md border border-white/10 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              className="w-full rounded-full h-12 text-lg" 
              onClick={() => navigate("/checkout")}
            >
              Checkout <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
