import { motion } from "framer-motion";
import { Package, Truck, Shield, CreditCard, Headphones, RefreshCw } from "lucide-react";

const features = [
  { icon: Package, title: "Everything in One Place", desc: "No product is unavailable. If it exists, we have it." },
  { icon: Truck, title: "Free Express Delivery", desc: "Free shipping on orders above ₹500. Delivered in 24-48 hours." },
  { icon: Shield, title: "100% Buyer Protection", desc: "Every order is insured and verified for authenticity." },
  { icon: CreditCard, title: "Wholesale Prices for All", desc: "No minimum order. Everyone gets wholesale rates." },
  { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock customer support in 10+ languages." },
  { icon: RefreshCw, title: "Easy Returns", desc: "30-day hassle-free returns on every single product." },
];

export default function WhyShopMingle() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
            Why <span className="text-gradient-gold">ShopMingle</span>?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're not just another marketplace. We're redefining how India shops.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <f.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
