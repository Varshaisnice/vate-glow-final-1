import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Landing() {
  const navigate = useNavigate();
  const featuredProducts = useQuery(api.products.getFeatured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2574&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        <div className="container relative z-20 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,128,0.5)]"
          >
            Vate Beauty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Unleash your inner glow with our premium, cruelty-free collection. Designed for the modern muse.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="rounded-full px-8 text-lg h-14 shadow-[0_0_20px_rgba(255,0,128,0.3)] hover:shadow-[0_0_30px_rgba(255,0,128,0.5)] transition-all" onClick={() => navigate("/shop")}>
              Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Our most loved products this week.</p>
          </div>
          <Button variant="link" onClick={() => navigate("/shop")}>View All</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts ? (
            featuredProducts.map((product) => (
              <motion.div 
                key={product._id}
                whileHover={{ y: -10 }}
                className="group relative bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <div className="aspect-square overflow-hidden bg-secondary/10">
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
                      View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Skeletons
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[400px] bg-muted/20 rounded-xl animate-pulse" />
            ))
          )}
        </div>
      </section>

      {/* Lookbook Teaser */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50" />
              <img 
                src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80" 
                alt="Lookbook" 
                className="relative rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">The Vate Lookbook</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover the latest trends and get inspired by our curated looks. From subtle day glows to dramatic evening glam, find your perfect style.
              </p>
              <Button size="lg" variant="outline" onClick={() => navigate("/lookbook")}>
                View Lookbook
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}