import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <h1 className="font-serif text-6xl font-bold text-brand-gold">404</h1>
      <h2 className="font-serif text-3xl font-bold text-brand-purple">Page introuvable</h2>
      <p className="text-brand-dark/60 max-w-md">
        Désolé, la page que vous cherchez semble avoir disparu de nos rayons.
      </p>
      <Link href="/">
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </div>
  );
}
