"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components1/common/Button";
import FormField from "../../../components1/common/FormField";
import { Card } from "../../../components1/common/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification simple
    if (email === "enseignant@exemple.com" && password === "1234") {
      router.push("/enseignant/dashboard");
    } else {
      alert("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion Enseignant</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>
      </Card>
    </div>
  );
}