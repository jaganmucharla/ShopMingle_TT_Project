import { Mail, Phone, MapPin } from "lucide-react";

const links = {
  "Shop": ["Electronics", "Fashion", "Home & Kitchen", "Grocery", "Beauty", "Sports"],
  "Company": ["About Us", "Careers", "Press", "Blog", "Affiliate Program"],
  "Support": ["Help Center", "Returns", "Shipping Info", "Track Order", "Contact Us"],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="font-display font-bold text-lg text-accent-foreground">S</span>
              </div>
              <span className="font-display font-bold text-xl text-primary-foreground">ShopMingle</span>
            </div>
            <p className="text-primary-foreground/50 text-sm mb-6 max-w-xs">
              India's largest wholesale marketplace. Everything available, everything affordable.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/50">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> support@shopmingle.in</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> 1800-SHOP-MINGLE</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Bangalore, India</div>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-primary-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-primary-foreground/50 hover:text-gold transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">© 2026 ShopMingle. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-primary-foreground/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
