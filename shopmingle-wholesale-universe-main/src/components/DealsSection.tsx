import { motion } from "framer-motion";
import { Star, ShoppingCart, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { defaultProducts } from "@/lib/defaultData";

export default function DealsSection() {
  const { addToCart } = useCart();

  const { data: deals, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').limit(8);
      if (error || !data || data.length === 0) {
        console.warn("Falling back to default deals. Did you run the schema.sql in Supabase?", error);
        return defaultProducts.slice(0, 8);
      }
      return data;
    }
  });

  const displayDeals = deals || defaultProducts.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Today's <span className="text-gradient-gold">Flash Deals</span>
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Grab before they're gone</span>
              <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3" /> Delivery under 30 mins
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gold font-medium bg-gold/10 px-4 py-2 rounded-lg border border-gold/20 w-fit">
            <Clock className="w-5 h-5" />
            <span className="font-display text-lg">Ends in 04:32:18</span>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayDeals.map((deal: any, i: number) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all hover:border-gold/30"
              >
                <div className="relative bg-muted aspect-square overflow-hidden">
                  <img src={deal.image_url} alt={deal.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] md:text-xs font-bold bg-gradient-gold text-accent-foreground shadow-lg">
                    {Math.round((1 - deal.price / deal.mrp) * 100)}% OFF
                  </span>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">{deal.category}</p>
                  <h3 className="font-medium text-sm md:text-base mb-2 line-clamp-2 min-h-[40px]">{deal.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="text-xs font-medium">{deal.rating}</span>
                    <span className="text-xs text-muted-foreground">({(deal.reviews || 0).toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-display font-bold text-lg">₹{deal.price}</span>
                      <span className="text-[10px] md:text-xs text-muted-foreground line-through ml-2">₹{deal.mrp}</span>
                    </div>
                    <Button 
                      onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.price, mrp: deal.mrp, image: deal.image_url, category: deal.category })}
                      size="icon" 
                      className="h-8 w-8 md:h-9 md:w-9 bg-primary text-primary-foreground hover:bg-gold hover:text-accent-foreground transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
