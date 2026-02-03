import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/db";

export default async function Home() {
  // Fetch products directly
  const products = await getProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-brand-dark/20 z-10" />
        <div className="absolute inset-0 z-0">
           {/* Placeholder for Hero Image - simulating a fashion banner */}
           <Image
             src="https://placehold.co/1920x1080/612251/FFF?text=Univers+Caroline"
             alt="Les Trésors de Caroline"
             fill
             className="object-cover"
             priority
           />
        </div>

        <div className="relative z-20 text-center space-y-6 max-w-3xl px-4">
          <div className="w-40 h-40 mx-auto relative rounded-full border-4 border-brand-gold shadow-2xl overflow-hidden bg-white mb-6">
             <Image src="/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-bold drop-shadow-lg">
            Les Trésors de Caroline
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md">
            L&apos;élégance à la française, une touche artistique pour révéler votre féminité.
          </p>
          <div className="pt-8">
            <Link href="/shop">
              <Button size="lg" variant="secondary" className="shadow-xl">
                Découvrir la collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction / Values Snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-purple font-bold">
          Bienvenue dans mon univers
        </h2>
        <div className="w-24 h-1 bg-brand-gold mx-auto" />
        <p className="text-lg text-brand-dark/80 max-w-3xl mx-auto leading-relaxed">
          &quot;La mode a toujours été pour moi bien plus qu’un simple vêtement. C’est une façon de s’exprimer, de prendre confiance en soi et de révéler sa personnalité au quotidien.&quot;
        </p>
        <Link href="/about">
          <Button variant="outline">En savoir plus</Button>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl text-brand-purple font-bold">Nouveautés</h2>
            <p className="text-brand-gold mt-2">Les dernières pièces de la collection</p>
          </div>
          <Link href="/shop" className="text-brand-purple hover:text-brand-gold font-medium transition-colors border-b border-brand-purple hover:border-brand-gold pb-1">
            Voir tout
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / Artistic Banner */}
      <section className="bg-brand-purple text-white py-20 px-4 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
           <h2 className="font-serif text-3xl md:text-4xl font-bold">Restez inspirée</h2>
           <p className="text-white/80 text-lg">Inscrivez-vous pour recevoir nos exclusivités et conseils de style.</p>
           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
             <input
                type="email"
                placeholder="Votre email"
                className="flex-grow px-6 py-3 rounded-full text-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-gold"
             />
             <Button variant="secondary">S&apos;inscrire</Button>
           </div>
        </div>
      </section>
    </div>
  );
}
