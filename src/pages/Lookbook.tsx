import { motion } from "framer-motion";

export default function Lookbook() {
  const looks = [
    {
      title: "Ethereal Glow",
      description: "A soft, radiant look perfect for daytime events.",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80",
      products: ["Silk Foundation", "Rose Blush", "Glassy Lip Gloss"]
    },
    {
      title: "Midnight Muse",
      description: "Bold eyes and subtle lips for a mysterious evening vibe.",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&q=80",
      products: ["Starlight Eyeshadow Palette", "Velvet Eyeliner", "Matte Top Coat"]
    },
    {
      title: "Rosy Romance",
      description: "Pink hues that bring out your natural flush.",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=800&q=80",
      products: ["Rose Tinted Balm", "Rose Aura Perfume", "Pink Clay Mask"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">The Lookbook</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Curated styles to inspire your next transformation.</p>
      </motion.div>

      <div className="space-y-24">
        {looks.map((look, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
              <img 
                src={look.image} 
                alt={look.title} 
                className="relative w-full rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold">{look.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{look.description}</p>
              <div>
                <h3 className="font-semibold mb-2">Featured Products:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {look.products.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
