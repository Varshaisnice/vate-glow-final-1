import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Heart, LogOut, User } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const orders = useQuery(api.orders.getMyOrders);
  const wishlist = useQuery(api.wishlist.getWishlist);
  const toggleWishlist = useMutation(api.wishlist.toggleWishlist);

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-bold text-lg truncate">{user.name || "User"}</h2>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-white/10 rounded-none h-auto p-0 mb-8">
              <TabsTrigger 
                value="orders" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Package className="mr-2 w-4 h-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="wishlist" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
              >
                <Heart className="mr-2 w-4 h-4" />
                Wishlist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              {orders?.length === 0 ? (
                <p className="text-muted-foreground">No orders yet.</p>
              ) : (
                orders?.map((order) => (
                  <Card key={order._id} className="bg-card/40 backdrop-blur-sm border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Order #{order._id.slice(-6)}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order._creationTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.total.toFixed(2)}</p>
                        <span className="inline-block px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold">
                          {order.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4 text-sm">
                            <div className="w-10 h-10 bg-secondary/10 rounded overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="flex-1">{item.name}</span>
                            <span className="text-muted-foreground">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="wishlist">
              <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
              {wishlist?.length === 0 ? (
                <p className="text-muted-foreground">Your wishlist is empty.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist?.map((product) => (
                    <div 
                      key={product._id}
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
                        <h3 className="font-bold truncate mb-1">{product.name}</h3>
                        <p className="text-primary font-bold">₹{product.price}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-white/10"
                          onClick={() => toggleWishlist({ productId: product._id })}
                        >
                          <Heart className="fill-current w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}