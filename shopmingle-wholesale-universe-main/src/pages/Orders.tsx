import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchOrders, type Order } from "@/lib/dataService";

export default function Orders() {
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">My Orders</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">My Orders</h1>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold" />
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order: Order, i: number) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
                className="bg-card border border-border rounded-xl p-5 md:p-6 hover:border-gold/30 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-display font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {new Date(order.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      {order.status === "completed" ? "Delivered" : order.status}
                    </span>
                    <span className="font-display font-bold text-lg">₹{order.total_amount}</span>
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="border-t border-border/50 pt-3 mt-3">
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <span
                          key={item.id}
                          className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground"
                        >
                          {item.product_name || "Product"} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-muted/30 rounded-2xl border border-border">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here!
            </p>
            <Button
              onClick={() => navigate("/catalog")}
              className="bg-gradient-gold text-accent-foreground"
            >
              Browse Products
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
