import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Vate Beauty
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Redefining beauty with clean, cruelty-free products designed to enhance your natural glow. Experience the magic of Vate.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop?category=Eyes" className="hover:text-primary transition-colors">Eyes</Link></li>
              <li><Link to="/shop?category=Lips" className="hover:text-primary transition-colors">Lips</Link></li>
              <li><Link to="/shop?category=Face" className="hover:text-primary transition-colors">Face</Link></li>
              <li><Link to="/shop?category=Skincare" className="hover:text-primary transition-colors">Skincare</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
            <p className="text-sm text-muted-foreground">Subscribe to our newsletter for updates and exclusive offers.</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vate Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
