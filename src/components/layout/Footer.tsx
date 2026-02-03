import Link from "next/link";
import { Facebook, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white/90 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-brand-gold">
              Les Trésors de Caroline
            </h3>
            <p className="text-sm leading-relaxed max-w-xs text-white/70">
              Une sélection unique de pièces tendances et élégantes pour sublimer toutes les femmes.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-brand-gold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-brand-gold transition-colors">Boutique</Link></li>
              <li><Link href="/about" className="hover:text-brand-gold transition-colors">Notre Histoire</Link></li>
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
              <li><Link href="/account" className="hover:text-brand-gold transition-colors">Mon Compte</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-brand-gold">Nous Suivre</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-gold hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-gold hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="mailto:contact@lestresorsdecaroline.com" className="p-2 bg-white/10 rounded-full hover:bg-brand-gold hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Les Trésors de Caroline. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
