"use client";
import { useState, useEffect } from "react";

interface MathCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function MathCaptcha({ onVerify }: MathCaptchaProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10));
    setNum2(Math.floor(Math.random() * 10));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnswer(val);
    if (parseInt(val) === num1 + num2) {
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-w-xs">
      <label className="block text-sm font-bold text-brand-purple mb-2">
        Question de sécurité : {num1} + {num2} = ?
      </label>
      <input
        type="number"
        className="w-full px-4 py-2 rounded border border-gray-300 focus:border-brand-purple outline-none"
        value={answer}
        onChange={handleChange}
        placeholder="Votre réponse"
        required
      />
    </div>
  );
}
