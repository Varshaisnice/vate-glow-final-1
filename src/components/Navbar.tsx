import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, User, Menu, Search } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartItems = useQuery(api.cart.getCart);
  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background/95 backdrop-blur-xl border-r border-white/10">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="text-2xl font-bold text-primary">Vate Beauty</Link>
                <div className="flex flex-col gap-4">
                  <Link to="/shop" className="text-lg hover:text-primary transition-colors">Shop All</Link>
                  <Link to="/shop?category=Eyes" className="text-lg hover:text-primary transition-colors">Eyes</Link>
                  <Link to="/shop?category=Lips" className="text-lg hover:text-primary transition-colors">Lips</Link>
                  <Link to="/shop?category=Face" className="text-lg hover:text-primary transition-colors">Face</Link>
                  <Link to="/lookbook" className="text-lg hover:text-primary transition-colors">Lookbook</Link>
                  <Link to="/about" className="text-lg hover:text-primary transition-colors">About Us</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Vate Beauty
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
          <Link to="/lookbook" className="text-sm font-medium hover:text-primary transition-colors">Lookbook</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
            <Input 
              placeholder="Search..." 
              className="w-[200px] h-9 bg-secondary/20 border-none focus-visible:ring-1 focus-visible:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>

          <Button variant="ghost" size="icon" onClick={() => navigate("/wishlist")}>
            <Heart className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>

          {user ? (
            <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
