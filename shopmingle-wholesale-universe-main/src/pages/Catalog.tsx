import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, ShoppingCart, ChevronRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/context/CartContext";
import { defaultProducts, categoriesList } from "@/lib/defaultData";

export default function Catalog() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryStr = searchParams.get("category");
  const queryStr = searchParams.get("q");
  const { addToCart } = useCart();

  const pageTitle = queryStr
    ? `Results for "${queryStr}"`
    : categoryStr
    ? categoryStr
    : "All Products";

  const { data: products, isLoading } = useQuery({
    queryKey: ["catalog", categoryStr, queryStr],
    queryFn: async () => {
      let query = supabase.from("products").select("*");
      if (categoryStr) query = query.ilike("category", `%${categoryStr}%`);
      if (queryStr) query = query.ilike("name", `%${queryStr}%`);
      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        let local = [...defaultProducts];
        if (categoryStr) {
          local = local.filter((p) =>
            p.category.toLowerCase().includes(categoryStr.toLowerCase())
          );
        }
        if (queryStr) {
          local = local.filter((p) =>
            p.name.toLowerCase().includes(queryStr.toLowerCase())
          );
        }
        return local;
      }
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{pageTitle}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">{pageTitle}</h1>
            {!isLoading && (
              <p className="text-muted-foreground mt-1">
                {products?.length ?? 0} products found
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          <Button
            size="sm"
            variant={!categoryStr && !queryStr ? "default" : "outline"}
            className="rounded-full"
            onClick={() => navigate("/catalog")}
          >
            All
          </Button>
          {categoriesList.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={categoryStr === cat ? "default" : "outline"}
              className={
                categoryStr === cat
                  ? "rounded-full bg-gradient-gold text-accent-foreground border-0"
                  : "rounded-full"
              }
              onClick={() =>
                navigate(`/catalog?category=${encodeURIComponent(cat)}`)
              }
            >
              {cat}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product: any, i: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.6) }}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all"
              >
                <div className="relative bg-muted aspect-square overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80";
                    }}
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] md:text-xs font-bold bg-gradient-gold text-accent-foreground shadow">
                    {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                  </span>
                </div>
                <div className="p-3 md:p-4 flex flex-col" style={{ minHeight: "148px" }}>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-medium text-sm mb-1 line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span className="text-xs font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(product.reviews || 0).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold">₹{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through ml-1">
                        ₹{product.mrp}
                      </span>
                    </div>
                    <Button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          mrp: product.mrp,
                          image: product.image_url,
                          category: product.category,
                        })
                      }
                      size="icon"
                      className="h-8 w-8 bg-primary text-primary-foreground hover:bg-gold hover:text-accent-foreground transition-colors shrink-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-muted/30 rounded-2xl border border-border">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              Try a different category or search term.
            </p>
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-gradient-gold text-accent-foreground"
            >
              Browse All Products
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
