"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, Review } from "@/lib/db";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import MathCaptcha from "@/components/ui/MathCaptcha";
import { sanitizeInput } from "@/lib/security";
import { Star, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
}

export default function ProductDetailClient({ product, reviews }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || "");
  const [activeTab, setActiveTab] = useState<"desc" | "reviews">("desc");

  // Mock Review Form State
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor);
    alert("Produit ajouté au panier !");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
        alert("Veuillez résoudre la question de sécurité.");
        return;
    }
    const cleanComment = sanitizeInput(comment);
    // Here we would call API to post review
    console.log("Submitting review:", { rating, cleanComment });
    alert("Votre avis a été publié !");
    setComment("");
    setRating(5);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnails would go here */}
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <p className="text-sm text-brand-gold uppercase tracking-widest font-bold mb-2">{product.category}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium text-brand-dark">{product.price.toFixed(2)} €</span>
              <div className="flex items-center text-yellow-500 text-sm">
                <Star size={16} fill="currentColor" />
                <span className="ml-1 text-brand-purple/60">({reviews.length} avis)</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-brand-purple/10" />

          {/* Selectors */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-brand-purple mb-2">Couleur: <span className="font-normal">{selectedColor}</span></label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-all",
                      selectedColor === color ? "border-brand-purple scale-110 shadow-md" : "border-gray-200 hover:border-brand-gold"
                    )}
                    style={{ backgroundColor: color.toLowerCase() === 'or' ? '#D4AF37' : color.toLowerCase() === 'violet' ? '#612251' : color.toLowerCase() === 'blanc' ? '#FFF' : color.toLowerCase() === 'noir' ? '#000' : '#ccc' }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-brand-purple mb-2">Taille: <span className="font-normal">{selectedSize}</span></label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border font-medium transition-colors min-w-[3rem]",
                      selectedSize === size
                        ? "bg-brand-purple text-white border-brand-purple"
                        : "bg-white text-brand-purple border-brand-purple/20 hover:border-brand-purple"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button size="lg" className="w-full flex items-center justify-center gap-2" onClick={handleAddToCart}>
              <ShoppingBag size={20} /> Ajouter au panier
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-brand-dark/70">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-brand-gold" /> Livraison rapide
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-brand-gold" /> Paiement sécurisé
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="mt-20">
        <div className="flex border-b border-brand-purple/10 mb-8">
          <button
            onClick={() => setActiveTab("desc")}
            className={cn(
              "px-8 py-4 font-serif text-lg font-bold transition-colors relative",
              activeTab === "desc" ? "text-brand-purple" : "text-brand-purple/40 hover:text-brand-purple/70"
            )}
          >
            Description
            {activeTab === "desc" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={cn(
              "px-8 py-4 font-serif text-lg font-bold transition-colors relative",
              activeTab === "reviews" ? "text-brand-purple" : "text-brand-purple/40 hover:text-brand-purple/70"
            )}
          >
            Avis Clients ({reviews.length})
            {activeTab === "reviews" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />}
          </button>
        </div>

        <div>
          {activeTab === "desc" ? (
            <div className="prose prose-lg text-brand-dark/80 max-w-none">
              <p>{product.description}</p>
              <p><strong>Matière :</strong> {product.material}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Reviews List */}
              <div className="grid gap-8">
                {reviews.length > 0 ? reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold text-brand-purple">{review.user}</h4>
                        <div className="flex text-yellow-500 text-xs mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-brand-dark/40">{review.date}</span>
                    </div>
                    <p className="text-brand-dark/80">{review.comment}</p>
                    {review.image && (
                       <div className="mt-4 w-24 h-24 relative rounded-lg overflow-hidden">
                          <Image src={review.image} alt="Review" fill className="object-cover" />
                       </div>
                    )}
                  </div>
                )) : (
                  <p className="text-brand-dark/50 italic">Aucun avis pour le moment.</p>
                )}
              </div>

              {/* Add Review Form */}
              <div className="bg-brand-light p-8 rounded-2xl">
                <h3 className="font-serif text-xl font-bold text-brand-purple mb-6">Laisser un avis</h3>
                {user ? (
                  <form className="space-y-4" onSubmit={handleSubmitReview}>
                    <div className="flex gap-2 mb-2">
                       {[1, 2, 3, 4, 5].map((s) => (
                         <button key={s} type="button" onClick={() => setRating(s)} className="text-yellow-500">
                           <Star size={24} fill={s <= rating ? "currentColor" : "none"} />
                         </button>
                       ))}
                    </div>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-brand-gold/30 focus:outline-none focus:border-brand-purple min-h-[100px]"
                      placeholder="Votre commentaire..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    {/* Simulated Photo Upload */}
                    <div className="text-sm text-brand-dark/60">
                      <label className="cursor-pointer hover:text-brand-gold flex items-center gap-2">
                        <span>📷 Ajouter une photo (simulé)</span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>

                    <MathCaptcha onVerify={setIsCaptchaValid} />

                    <Button type="submit">Publier l&apos;avis</Button>
                  </form>
                ) : (
                  <div className="text-center py-6">
                    <p className="mb-4 text-brand-dark/70">Vous devez être connecté pour laisser un commentaire.</p>
                    <Button variant="outline" onClick={() => router.push('/account')}>Se connecter</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
