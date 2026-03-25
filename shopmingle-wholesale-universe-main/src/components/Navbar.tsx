import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartSheet from "./CartSheet";

const categories = [
  "Electronics", "Fashion", "Home & Kitchen", "Grocery", "Beauty", "Sports",
  "Books", "Toys", "Automotive", "Health", "Garden", "Pet Supplies"
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      navigate(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);
      setMobileOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      {/* Top bar */}
      <div className="bg-gradient-dark py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <p className="text-xs text-gold-light tracking-wider">🔥 Wholesale prices for everyone — Save up to 70% on every order</p>
          <div className="hidden md:flex items-center gap-4 text-xs text-gold-light/70">
            <span>Seller Hub</span>
            <span>Help Center</span>
            <span>Download App</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
              <span className="font-display font-bold text-lg text-accent-foreground">S</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">ShopMingle</span>
          </a>

          {/* Categories dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-xl p-2 grid grid-cols-1 gap-0.5"
                >
                  {categories.map(c => (
                    <button 
                      key={c} 
                      onClick={() => { navigate(`/catalog?category=${encodeURIComponent(c)}`); setCatOpen(false); }} 
                      className="px-3 py-2 text-sm text-left rounded-md hover:bg-muted transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything... electronics, fashion, groceries"
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-shadow"
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => navigate('/auth')}>
            <User className="w-5 h-5" />
          </Button>
          <CartSheet />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-muted border border-border text-sm"
                  onKeyDown={handleSearch}
                />
              </div>
              {categories.map(c => (
                <button 
                  key={c} 
                  onClick={() => { navigate(`/catalog?category=${encodeURIComponent(c)}`); setMobileOpen(false); }} 
                  className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-muted"
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
