import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logoMoonbeam.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { name: "Menu", path: "/menu" },
  { name: "Organic Store", path: "/store" },
  { name: "Blogs", path: "/blogs" },
  { name: "Daily Journal", path: "/journal" },
  { name: "Contact Us", path: "/contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 navbar-fade"
    >
      {/* Gradient Background - Completely Invisible at Bottom */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, hsl(var(--royal-blue) / 0.85) 0%, hsl(var(--royal-blue) / 0.6) 30%, hsl(var(--royal-blue) / 0.2) 60%, hsl(var(--royal-blue) / 0.05) 80%, transparent 100%)',
          backdropFilter: 'blur(12px) saturate(180%)'
        }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Moonbeam Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Nav Items */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                    isActive
                      ? "text-lavender-light"
                      : "text-primary-foreground hover:text-lavender-light"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-lavender transition-all duration-300",
                      isActive ? "w-full shadow-mystical" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative px-3 py-2 text-primary-foreground hover:text-lavender-light transition-colors ml-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-lavender text-lavender-foreground">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* Auth Section */}
            {user && profile ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground hover:text-lavender-light transition-colors ml-2">
                  <User className="w-4 h-4" />
                  <span>Hello, {profile.first_name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-royal-dark border-lavender/20">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer text-primary-foreground hover:text-lavender-light">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer text-primary-foreground hover:text-lavender-light"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-primary-foreground hover:text-lavender-light transition-colors ml-2 border border-lavender/50 hover:border-lavender"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 text-primary-foreground hover:text-lavender-light transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-lavender text-lavender-foreground">
                  {totalItems}
                </Badge>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary-foreground hover:text-lavender-light transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-royal-dark/95 backdrop-blur-md border-t border-lavender/20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-6 py-4 text-sm font-medium transition-colors border-l-4",
                  isActive
                    ? "text-lavender-light border-lavender bg-lavender/10"
                    : "text-primary-foreground border-transparent hover:text-lavender-light hover:border-lavender/50 hover:bg-lavender/5"
                )}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="border-t border-lavender/20 mt-2 pt-2">
            {user && profile ? (
              <>
                <Link
                  to="/account"
                  className="block px-6 py-4 text-sm font-medium text-primary-foreground border-l-4 border-transparent hover:text-lavender-light hover:border-lavender/50 hover:bg-lavender/5 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={signOut}
                  className="w-full text-left px-6 py-4 text-sm font-medium text-primary-foreground border-l-4 border-transparent hover:text-lavender-light hover:border-lavender/50 hover:bg-lavender/5 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center justify-center px-6 py-4 text-sm font-medium text-primary-foreground border-l-4 border-transparent hover:text-lavender-light hover:border-lavender/50 hover:bg-lavender/5 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
