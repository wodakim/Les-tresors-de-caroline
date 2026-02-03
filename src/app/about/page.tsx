import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">

      {/* Intro Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-bg">
          {/* Placeholder for Caroline's photo */}
          <Image
            src="https://placehold.co/800x1000/612251/FFF?text=Caroline"
            alt="Caroline Mouchard"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
           <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-purple leading-tight">
             L&apos;âme derrière <br/>
             <span className="text-brand-gold italic">Les Trésors</span>
           </h1>
           <div className="w-20 h-1.5 bg-brand-gold rounded-full" />

           <div className="prose prose-lg text-brand-dark/80 font-light leading-relaxed space-y-6">
             <p>
               <span className="text-4xl float-left mr-2 font-serif text-brand-gold leading-none">J</span>
               e m’appelle Caroline, et la mode a toujours été pour moi bien plus qu’un simple vêtement. C’est une façon de s’exprimer, de prendre confiance en soi et de révéler sa personnalité au quotidien.
             </p>
             <p>
               À travers ma boutique en ligne de prêt-à-porter, j’ai voulu créer un univers qui me ressemble : des pièces tendances, faciles à porter, pensées pour sublimer toutes les femmes, sans compromis entre style et confort.
             </p>
           </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-brand-light rounded-3xl p-12 md:p-20 text-center space-y-12">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-purple font-bold">Mes Valeurs & Ma Promesse</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
             <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✨</div>
             <h3 className="font-serif text-xl font-bold text-brand-purple mb-2">Sélection Unique</h3>
             <p className="text-sm text-gray-600">Chaque collection est choisie avec soin, privilégiant des coupes modernes et des détails qui font la différence.</p>
           </div>

           <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
             <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌿</div>
             <h3 className="font-serif text-xl font-bold text-brand-purple mb-2">Confort & Style</h3>
             <p className="text-sm text-gray-600">Des matières agréables pour vous sentir belle et forte, du matin au soir, sans compromis.</p>
           </div>

           <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
             <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🤍</div>
             <h3 className="font-serif text-xl font-bold text-brand-purple mb-2">Confiance en Soi</h3>
             <p className="text-sm text-gray-600">Mon objectif est simple : vous proposer des vêtements qui révèlent votre vraie personnalité.</p>
           </div>
        </div>
      </div>

      {/* Signature */}
      <div className="text-center pt-8">
        <p className="font-serif text-2xl italic text-brand-gold">Bienvenue dans mon univers</p>
        <p className="mt-4 font-bold text-brand-purple uppercase tracking-widest text-sm">- Caroline Mouchard</p>
        <div className="mt-8 flex justify-center gap-4">
           <a href="https://fr.linkedin.com/in/caroline-mouchard-777520167" target="_blank" rel="noopener noreferrer" className="text-brand-purple hover:text-brand-gold transition-colors">
             <span className="sr-only">LinkedIn</span>
             {/* LinkedIn Icon */}
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           </a>
        </div>
      </div>

    </div>
  );
}
