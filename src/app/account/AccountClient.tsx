"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Package, Settings, HelpCircle, LogOut, Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AccountClient() {
  const router = useRouter();
  const { user, login, logout, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "help">("orders");

  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Admin Check Simulation
    if (email === "admin@lestresorsdecaroline.com" && password === "admin") {
      // Set a cookie or local storage token ideally, but for now just redirect
      document.cookie = "admin=true; path=/";
      router.push("/admin");
      return;
    }
    // User Login Simulation
    if (email && password) {
       login(email);
    }
  };

  if (isLoading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-brand-purple">Chargement...</div>;
  }

  if (!user) {
    return (
      <div className="py-20 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-gold">
          <h1 className="font-serif text-3xl font-bold text-brand-purple text-center mb-8">
            {authMode === "login" ? "Connexion" : "Inscription"}
          </h1>

          <form className="space-y-6" onSubmit={handleLogin}>
            {authMode === "register" && (
               <Input placeholder="Votre Nom" />
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full">
              {authMode === "login" ? "Se connecter" : "Créer un compte"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-brand-dark/70">
            {authMode === "login" ? (
              <p>Pas encore de compte ? <button onClick={() => setAuthMode("register")} className="text-brand-purple font-bold hover:underline">S&apos;inscrire</button></p>
            ) : (
              <p>Déjà un compte ? <button onClick={() => setAuthMode("login")} className="text-brand-purple font-bold hover:underline">Se connecter</button></p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-center text-gray-400">
            <p>Pour démo admin : admin@lestresorsdecaroline.com / admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 space-y-2">
        <div className="p-6 bg-brand-light rounded-xl mb-6 text-center">
           <div className="w-20 h-20 bg-brand-purple text-white rounded-full flex items-center justify-center text-2xl font-serif font-bold mx-auto mb-3">
             {user.name.charAt(0)}
           </div>
           <h3 className="font-bold text-brand-purple">{user.name}</h3>
           <p className="text-xs text-brand-dark/60">Cliente Fidèle</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-left",
              activeTab === "orders" ? "bg-brand-purple text-white" : "text-brand-purple hover:bg-brand-light"
            )}
          >
            <Package size={20} /> Mes Commandes
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-left",
              activeTab === "profile" ? "bg-brand-purple text-white" : "text-brand-purple hover:bg-brand-light"
            )}
          >
            <Settings size={20} /> Paramètres
          </button>
          <button
            onClick={() => setActiveTab("help")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-left",
              activeTab === "help" ? "bg-brand-purple text-white" : "text-brand-purple hover:bg-brand-light"
            )}
          >
            <HelpCircle size={20} /> Aide & Support
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-left text-red-500 hover:bg-red-50"
          >
            <LogOut size={20} /> Déconnexion
          </button>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-brand-gold/10 p-8 min-h-[500px]">
        {activeTab === "orders" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-purple mb-6">Mes Commandes</h2>
            <div className="text-center py-20 text-brand-dark/50 bg-gray-50 rounded-xl">
              <Package size={48} className="mx-auto mb-4 opacity-20" />
              <p>Vous n&apos;avez pas encore passé de commande.</p>
              <Button variant="outline" className="mt-4" onClick={() => router.push('/shop')}>Commencer le shopping</Button>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-md">
            <h2 className="font-serif text-2xl font-bold text-brand-purple mb-6">Mon Profil</h2>
            <form className="space-y-4">
               <Input label="Nom complet" defaultValue={user.name} />
               <Input label="Email" defaultValue={user.email} />
               <Button className="mt-4">Enregistrer les modifications</Button>
            </form>
          </div>
        )}

        {activeTab === "help" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-purple mb-6">Aide & Support</h2>
            <div className="space-y-6">
               <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                 <h3 className="font-bold text-blue-900 mb-2">Besoin d&apos;aide ?</h3>
                 <p className="text-blue-800/80 text-sm mb-4">Consultez notre FAQ ou contactez notre service client.</p>
                 <Button variant="outline" className="border-blue-200 text-blue-800 hover:bg-blue-100">Contacter le support</Button>
               </div>

               {/* Bug Report Button as requested */}
               <div className="border-t pt-6">
                 <p className="text-sm text-brand-dark/60 mb-4">Vous avez rencontré un problème technique ?</p>
                 <Button variant="ghost" className="text-brand-purple hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 flex items-center gap-2">
                   <Bug size={18} /> Signaler un bug
                 </Button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
