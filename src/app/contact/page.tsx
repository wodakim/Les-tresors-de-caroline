"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import MathCaptcha from "@/components/ui/MathCaptcha";
import { sanitizeInput } from "@/lib/security";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      alert("Veuillez résoudre la question de sécurité.");
      return;
    }

    const cleanData = {
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
    };

    console.log("Sending data:", cleanData);
    alert("Votre message a été envoyé avec succès !");
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-serif text-4xl font-bold text-brand-purple">Contactez-moi</h1>
        <p className="text-brand-dark/70 max-w-2xl mx-auto">
          Une question sur une pièce ? Besoin d&apos;un conseil style ? N&apos;hésitez pas à m&apos;écrire, je serai ravie de vous répondre.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-gold/10 space-y-6">
             <h3 className="font-serif text-2xl font-bold text-brand-purple">Informations</h3>

             <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-light rounded-full text-brand-purple">
                   <Mail size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-brand-dark">Email</p>
                   <a href="mailto:contact@lestresorsdecaroline.com" className="text-brand-gold hover:underline">contact@lestresorsdecaroline.com</a>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-light rounded-full text-brand-purple">
                   <Phone size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-brand-dark">Téléphone</p>
                   <p className="text-gray-600">+33 6 00 00 00 00</p>
                 </div>
               </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-brand-light rounded-full text-brand-purple">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <p className="font-bold text-brand-dark">Localisation</p>
                   <p className="text-gray-600">France (Boutique en ligne)</p>
                 </div>
               </div>
             </div>
           </div>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-brand-gold">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Prénom"
                placeholder="Votre prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
              <Input
                label="Nom"
                placeholder="Votre nom"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <Input
              label="Sujet"
              placeholder="L'objet de votre message"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />

            <div className="space-y-1">
              <label className="text-sm font-serif text-brand-purple font-medium ml-1">Message</label>
              <textarea
                className="w-full px-4 py-3 rounded-lg border border-brand-gold/30 bg-white/50 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-brand-purple/40 text-brand-purple min-h-[150px]"
                placeholder="Votre message..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              ></textarea>
            </div>

            <MathCaptcha onVerify={setIsCaptchaValid} />

            <Button type="submit" className="w-full">Envoyer le message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
