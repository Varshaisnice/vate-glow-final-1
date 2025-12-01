import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2574&auto=format&fit=crop" 
            alt="About Hero" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Redefining beauty standards with clean, conscious, and captivating products.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">The Vate Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At Vate Beauty, we believe that makeup should be an extension of your natural radiance, not a mask. Our journey began with a simple question: why choose between high-performance cosmetics and skin-loving ingredients?
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We meticulously craft each product to deliver stunning pigment and lasting wear while nourishing your skin. Cruelty-free, vegan, and ethically sourced — because beauty shouldn't cost the earth.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-secondary/20 blur-3xl rounded-full opacity-50" />
            <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80" 
              alt="Mission" 
              className="relative rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Clean Beauty", desc: "Free from parabens, sulfates, and harmful toxins." },
              { title: "Cruelty Free", desc: "Never tested on animals, always vegan friendly." },
              { title: "Sustainable", desc: "Eco-conscious packaging and ethical sourcing." }
            ].map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-card/40 backdrop-blur-sm border border-white/10 p-8 rounded-xl text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
