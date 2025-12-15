import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter, Moon, Leaf } from "lucide-react";
import logoImage from "@/assets/LOGO MB PNG.png";

export const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Store", path: "/store" },
    { name: "Blog", path: "/blogs" },
    { name: "Daily Journal", path: "/journal" },
    { name: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-indigo via-royal to-royal-dark text-primary-foreground overflow-hidden">
      {/* Mystical crescent moon */}
      <div className="absolute top-10 right-10 opacity-20 animate-pulse">
        <Moon className="w-32 h-32 text-lavender fill-lavender/20" style={{ animationDuration: "4s" }} />
      </div>

      {/* Subtle stone texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--lavender) / 0.1) 10px, hsl(var(--lavender) / 0.1) 20px)`
        }}
      />

      {/* Leaf patterns */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M 0,100 Q 100,80 200,100 T 400,100 T 600,100 T 800,100 T 1000,100 T 1200,100 T 1400,100 L 1400,150 L 0,150 Z"
            fill="hsl(var(--lavender))"
            className="animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </svg>
      </div>

      {/* Decorative leaves scattered */}
      <div className="absolute top-20 left-20 opacity-10">
        <Leaf className="w-16 h-16 text-lavender rotate-45" />
      </div>
      <div className="absolute bottom-40 right-32 opacity-10">
        <Leaf className="w-12 h-12 text-lavender -rotate-12" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <img 
              src={logoImage} 
              alt="Moonbeam Logo" 
              className="h-16 w-auto"
            />
            <p className="text-lavender-light text-lg font-serif">
              The Kumaon Aesthetics
            </p>
            <p className="text-primary-foreground/70 leading-relaxed">
              Experience the mystical flavors and organic treasures of the Himalayan hills, 
              crafted with love and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-lavender-light">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-primary-foreground/80 hover:text-lavender transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-lavender-light">
              Connect With Us
            </h3>
            <div className="space-y-4 mb-6">
              <a 
                href="mailto:hello@moonbeam.com"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-lavender transition-colors duration-300 group"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>hello@moonbeam.com</span>
              </a>
              <a 
                href="tel:+919876543210"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-lavender transition-colors duration-300 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border-2 border-lavender/50 flex items-center justify-center hover:bg-lavender hover:border-lavender transition-all duration-300 hover:scale-110 group"
                >
                  <social.icon className="w-5 h-5 text-lavender group-hover:text-royal-dark" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-lavender/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © 2024 Moonbeam. All rights reserved.
            </p>
            <p className="text-lavender-light text-sm font-serif flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Made with love in the Kumaon Hills
              <Leaf className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
