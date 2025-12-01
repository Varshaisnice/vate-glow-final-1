import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useQuery(api.cart.getCart);
  const createOrder = useMutation(api.orders.createOrder);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems?.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0) || 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const shippingAddress = {
      fullName: formData.get("fullName") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
    };

    try {
      await createOrder({ shippingAddress });
      toast.success("Order placed successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems === undefined) return <div className="container py-20 text-center">Loading...</div>;
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Shipping Form */}
        <div>
          <Card className="bg-card/40 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" required placeholder="123 Beauty Lane" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" required placeholder="10001" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" required placeholder="United States" />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="bg-card/40 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.product?.name}
                    </span>
                    <span>₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form"
                className="w-full rounded-full h-12 text-lg mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${total.toFixed(2)}`
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}