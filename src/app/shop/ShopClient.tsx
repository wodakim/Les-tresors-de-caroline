"use client";

import { useState } from "react";
import { Product } from "@/lib/db";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  initialProducts: Product[];
}

export default function ShopClient({ initialProducts }: ShopClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter States
  const [category, setCategory] = useState("Tous");
  const [selectedColor, setSelectedColor] = useState("Tous");

  // Derive unique categories and colors
  const categories = ["Tous", ...Array.from(new Set(products.map((p) => p.category)))];
  const colors = ["Tous", ...Array.from(new Set(products.flatMap((p) => p.colors)))];

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "Tous" || p.category === category;
    const matchColor = selectedColor === "Tous" || p.colors.includes(selectedColor);
    return matchCategory && matchColor;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Mobile Filter Button */}
        <button
          className="md:hidden flex items-center gap-2 text-brand-purple font-medium"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Filter size={20} /> Filtres
        </button>

        {/* Sidebar Filters */}
        <aside className={cn(
            "w-full md:w-64 space-y-8 md:block",
            filtersOpen ? "block" : "hidden"
        )}>
          <div className="flex justify-between items-center md:hidden">
            <h3 className="font-serif text-xl font-bold">Filtres</h3>
            <button onClick={() => setFiltersOpen(false)}><X size={24} /></button>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-brand-purple mb-4">Catégories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={cn(
                      "text-sm hover:text-brand-gold transition-colors",
                      category === cat ? "font-bold text-brand-gold" : "text-brand-dark/70"
                    )}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-brand-purple mb-4">Couleurs</h3>
             <div className="flex flex-wrap gap-2">
               {colors.map((c) => (
                 <button
                   key={c}
                   onClick={() => setSelectedColor(c)}
                   className={cn(
                     "px-3 py-1 rounded-full text-xs border transition-colors",
                     selectedColor === c
                       ? "bg-brand-purple text-white border-brand-purple"
                       : "bg-white text-brand-purple border-brand-purple/20 hover:border-brand-purple"
                   )}
                 >
                   {c}
                 </button>
               ))}
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="font-serif text-3xl font-bold text-brand-purple">Boutique</h1>
            <span className="text-sm text-brand-dark/60">{filteredProducts.length} articles</span>
          </div>

          {filteredProducts.length === 0 ? (
             <div className="text-center py-20 text-brand-dark/50">
               Aucun produit ne correspond à vos critères.
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
