import { useState } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

// Validación correo: debe terminar en @cun
    const emailValid = email.endsWith("@cun.edu.co");

    // Validación contraseña: solo números y exactamente 10 dígitos
    const passwordValid = /^\d{10}$/.test(password);

    if (!emailValid) { //si el correo no es valido 
      setError("El correo debe terminar en @cun.edu.co");
      return;
    }

    if (!passwordValid) { //si el password no es digitos 
      setError("Error, asegurate de escribir bien tu cedula");
      return;
    }

    setError("");
    onLogin();

  };
  
    // Permitir solo números en el input contraseña
  const handlePasswordChange = (value: string) => {
    const numericOnly = value.replace(/\D/g, ""); // elimina todo lo que no sea número
    setPassword(numericOnly.slice(0, 10)); // máximo 9 dígitos
  };

  return (
  <div
    className="fixed inset-0 flex items-center justify-center p-6 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('https://h6ajra25jkx2cstu.public.blob.vercel-storage.com/Whisk_8fdd12d4a302572a8f34767d04506dcceg%20%281%29.png')"
    }}
  >
        {/* Overlay oscuro elegante */}
    <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[5px]" />
      
      <div className="w-full max-w-md bg-slate-500 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl p-10 text-white">

        <h2 className="text-3xl sm:text font-bold mb-6 text-center tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-50 from-20% via-indigo-300 to-purple-300">
          Iniciar Sesión
        </h2>


        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Usuario
            </label>
            <input
              type="email"
              placeholder="tucorreo@cun.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 required disabled:text-gray-500 disabled:text-fas focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-white/70">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Digita tu cedula"
              required
              maxLength = {10}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
          </div>


          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Entrar
          </button>

        </form>
      </div>
    </div>
  );
}