import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Star, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  
  const products = useQuery(api.products.get, { 
    category, 
    search,
    paginationOpts: { numItems: 20, cursor: null } 
  });

  const categories = ["Eyes", "Lips", "Face", "Skincare", "Nails", "Accessories"];

  const handleCategoryChange = (cat: string) => {
    if (category === cat) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-8">
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={cat} 
                    checked={category === cat}
                    onCheckedChange={() => handleCategoryChange(cat)}
                  />
                  <Label htmlFor={cat} className="cursor-pointer">{cat}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Price Range</h3>
            <Slider defaultValue={[0, 5000]} max={5000} step={100} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹0</span>
              <span>₹5000+</span>
            </div>
          </div>
        </div>

        {/* Mobile Filter Trigger */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
            </SheetTrigger>
            <SheetContent side="left">
              {/* Same filters as above */}
              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-${cat}`} 
                          checked={category === cat}
                          onCheckedChange={() => handleCategoryChange(cat)}
                        />
                        <Label htmlFor={`mobile-${cat}`}>{cat}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{category || "All Products"}</h1>
            <p className="text-muted-foreground">{products?.page.length || 0} products found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products ? (
              products.page.map((product) => (
                <motion.div 
                  key={product._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="aspect-square overflow-hidden bg-secondary/10 relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isSoldOut && (
                      <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">
                        SOLD OUT
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs text-primary font-medium mb-1">{product.brand}</p>
                        <h3 className="font-bold truncate pr-2">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold text-lg">₹{product.price}</span>
                      <Button size="sm" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[400px] bg-muted/20 rounded-xl animate-pulse" />
              ))
            )}
          </div>
          
          {/* Pagination Load More */}
          {products?.isDone === false && (
             <div className="mt-8 text-center">
               <Button variant="outline">Load More</Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}