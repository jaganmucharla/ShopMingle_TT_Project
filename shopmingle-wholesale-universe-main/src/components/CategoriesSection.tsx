import { motion } from "framer-motion";
import catElectronics from "@/assets/cat-electronics.jpg";
import catFashion from "@/assets/cat-fashion.jpg";
import catHome from "@/assets/cat-home.jpg";
import catGrocery from "@/assets/cat-grocery.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import catSports from "@/assets/cat-sports.jpg";

import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", items: "50K+ Products", img: catElectronics, discount: "Up to 60% off" },
  { name: "Fashion", items: "1L+ Products", img: catFashion, discount: "Up to 70% off" },
  { name: "Home & Kitchen", items: "80K+ Products", img: catHome, discount: "Up to 55% off" },
  { name: "Grocery", items: "30K+ Products", img: catGrocery, discount: "Up to 40% off" },
  { name: "Beauty", items: "25K+ Products", img: catBeauty, discount: "Up to 65% off" },
  { name: "Sports", items: "15K+ Products", img: catSports, discount: "Up to 50% off" },
];

export default function CategoriesSection() {
  const navigate = useNavigate();

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
            Shop by <span className="text-gradient-gold">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything organized. Everything available. Always at wholesale prices.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              onClick={() => navigate(`/catalog?category=${encodeURIComponent(cat.name)}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                loading="lazy"
                width={640}
                height={640}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] md:text-xs font-medium bg-gold/20 text-gold mb-2">
                  {cat.discount}
                </span>
                <h3 className="font-display font-semibold text-lg md:text-xl text-primary-foreground">{cat.name}</h3>
                <p className="text-primary-foreground/60 text-xs md:text-sm">{cat.items}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
