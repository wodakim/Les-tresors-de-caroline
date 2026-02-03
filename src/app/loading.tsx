export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
         <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full"></div>
         <div className="absolute inset-0 border-4 border-brand-gold rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="font-serif text-brand-purple animate-pulse">Chargement...</p>
    </div>
  );
}
