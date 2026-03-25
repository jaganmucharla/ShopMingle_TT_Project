import { motion } from "framer-motion";

const stats = [
  { value: "10M+", label: "Products Available" },
  { value: "5L+", label: "Happy Customers" },
  { value: "70%", label: "Avg. Savings" },
  { value: "500+", label: "Categories" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-5xl font-display font-bold text-gradient-gold mb-2">{stat.value}</h3>
              <p className="text-sm text-primary-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
