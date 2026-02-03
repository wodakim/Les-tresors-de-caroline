"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/db";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Edit, Trash2, X, Image as ImageIcon, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminClient() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  // Fetch Products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Basic protection check
    if (!document.cookie.includes("admin=true")) {
      router.push("/account");
      return;
    }
    fetchProducts();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAdd = () => {
    setCurrentProduct({
      name: "",
      description: "",
      price: 0,
      category: "Robes",
      sizes: ["S", "M", "L"],
      colors: [],
      material: "",
      image: "https://placehold.co/600x800",
    });
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !currentProduct.id;
    const url = isNew ? "/api/products" : `/api/products/${currentProduct.id}`;
    const method = isNew ? "POST" : "PUT";

    // Format data
    const payload = {
       ...currentProduct,
       // ensure arrays are arrays (if managed as comma separated strings in form)
       // For simplicity in this demo, I'll assume they are managed correctly or I'll parse them here if I use text inputs.
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setIsEditing(false);
    fetchProducts();
  };

  const handleLogout = () => {
    document.cookie = "admin=; Max-Age=0; path=/";
    router.push("/account");
  };

  if (isEditing) {
    return (
      <div className="py-12 px-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
           <h1 className="font-serif text-3xl font-bold text-brand-purple">
             {currentProduct.id ? "Modifier le produit" : "Nouveau produit"}
           </h1>
           <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-gray-700">
             <X size={24} />
           </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-brand-gold/20">
          <Input
            label="Nom du produit"
            value={currentProduct.name}
            onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Prix (€)"
              type="number"
              step="0.01"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})}
              required
            />
            <Input
              label="Catégorie"
              value={currentProduct.category}
              onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-serif text-brand-purple font-medium ml-1">Description</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-brand-gold/30 outline-none focus:border-brand-purple min-h-[100px]"
              value={currentProduct.description}
              onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
            />
          </div>

          <Input
             label="Matière"
             value={currentProduct.material}
             onChange={(e) => setCurrentProduct({...currentProduct, material: e.target.value})}
          />

          {/* Image URL Mock */}
          <Input
             label="URL de l'image"
             value={currentProduct.image}
             onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
          />

          {/* Simple Size/Color inputs as comma separated strings for MVP */}
          <Input
             label="Tailles (séparées par des virgules)"
             value={currentProduct.sizes?.join(", ")}
             onChange={(e) => setCurrentProduct({...currentProduct, sizes: e.target.value.split(",").map(s => s.trim())})}
          />

          <Input
             label="Couleurs (séparées par des virgules)"
             value={currentProduct.colors?.join(", ")}
             onChange={(e) => setCurrentProduct({...currentProduct, colors: e.target.value.split(",").map(s => s.trim())})}
          />

          <div className="pt-4 flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Annuler</Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save size={18} /> Enregistrer
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-purple">Dashboard Admin</h1>
          <p className="text-brand-dark/60">Gérez vos produits et stocks.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
             <LogOut size={18} className="mr-2" /> Quitter
           </Button>
           <Button onClick={handleAdd} className="flex items-center gap-2">
             <Plus size={18} /> Ajouter un produit
           </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-brand-gold/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-light text-brand-purple font-serif">
              <tr>
                <th className="p-4 font-bold">Image</th>
                <th className="p-4 font-bold">Nom</th>
                <th className="p-4 font-bold">Catégorie</th>
                <th className="p-4 font-bold">Prix</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="w-12 h-16 relative rounded bg-gray-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt="" className="object-cover w-full h-full" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{product.name}</td>
                  <td className="p-4 text-brand-dark/70">{product.category}</td>
                  <td className="p-4 font-bold text-brand-purple">{product.price} €</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-brand-purple hover:bg-brand-light rounded-full transition-colors"
                      title="Modifier"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && !isLoading && (
           <div className="p-8 text-center text-gray-400">Aucun produit trouvé.</div>
        )}
      </div>
    </div>
  );
}
