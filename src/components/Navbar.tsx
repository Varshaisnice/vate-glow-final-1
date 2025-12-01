import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, User, Menu, Search, ArrowLeft } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useQuery(api.cart.getCart);
  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const [search, setSearch] = useState("");
  const isHome = location.pathname === "/";
  const isAdmin = user?.email === "mvarsha4306@gmail.com";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?search=${encodeURIComponent(search)}`);
    }
  };

  if (!isHome) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="rounded-full bg-background/50 backdrop-blur-md border-white/10 hover:bg-primary/20 shadow-lg"
          title="Go Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl rounded-full border border-white/20 bg-background/70 backdrop-blur-xl shadow-lg">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Left Section: Mobile Menu & Logo */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 rounded-full">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] bg-background/95 backdrop-blur-xl border-r border-white/10">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link to="/" className="text-2xl font-bold text-primary">
                      Vate Beauty
                    </Link>
                    <div className="flex flex-col gap-4">
                      <Link to="/" className="text-lg hover:text-primary transition-colors">Home</Link>
                      <Link to="/shop" className="text-lg hover:text-primary transition-colors">Shop All</Link>
                      <Link to="/shop?category=Eyes" className="text-lg hover:text-primary transition-colors">Eyes</Link>
                      <Link to="/shop?category=Lips" className="text-lg hover:text-primary transition-colors">Lips</Link>
                      <Link to="/shop?category=Face" className="text-lg hover:text-primary transition-colors">Face</Link>
                      <Link to="/lookbook" className="text-lg hover:text-primary transition-colors">Lookbook</Link>
                      <Link to="/about" className="text-lg hover:text-primary transition-colors">About Us</Link>
                      {isAdmin && (
                        <Link to="/admin" className="text-lg hover:text-primary transition-colors">Admin</Link>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold tracking-tighter text-primary hover:opacity-80 transition-opacity">
              Vate Beauty
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link to="/lookbook" className="text-sm font-medium hover:text-primary transition-colors">Lookbook</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">Admin</Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <form onSubmit={handleSearch} className="hidden md:flex relative mr-2">
              <Input 
                placeholder="Search..." 
                className="w-[180px] h-9 bg-secondary/20 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-full px-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </form>

            <Button variant="ghost" size="icon" onClick={() => navigate("/wishlist")} className="rounded-full hover:bg-primary/10 hover:text-primary">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} className="relative rounded-full hover:bg-primary/10 hover:text-primary">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Button>

            {user ? (
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")} className="rounded-full hover:bg-primary/10 hover:text-primary">
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate("/auth")} className="rounded-full px-6 ml-2">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}