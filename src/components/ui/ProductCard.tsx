"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/db";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-brand-gold/10"
    >
      <Link href={`/shop/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

          {/* Quick Add Button (Visible on Hover) */}
          <div className="absolute bottom-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-white text-brand-purple p-3 rounded-full shadow-lg hover:bg-brand-gold hover:text-white transition-colors">
              <ShoppingBag size={20} />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <p className="text-xs text-brand-purple/60 uppercase tracking-wider">{product.category}</p>
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-serif text-lg font-bold text-brand-purple truncate group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="font-medium text-brand-dark">{product.price.toFixed(2)} €</span>
          <div className="flex gap-1">
             {/* Color dots simulation */}
             {product.colors.slice(0, 3).map((color, i) => (
               <div
                 key={i}
                 className="w-3 h-3 rounded-full border border-gray-200"
                 style={{ backgroundColor: color.toLowerCase() === 'or' ? '#D4AF37' : color.toLowerCase() === 'violet' ? '#612251' : color.toLowerCase() === 'blanc' ? '#FFF' : color.toLowerCase() === 'noir' ? '#000' : '#ccc' }}
                 title={color}
               />
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
