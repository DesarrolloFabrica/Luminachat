import { useState } from "react";
import { motion } from "motion/react";
import { LogIn, Sparkles } from "lucide-react";
import { FloatingNav } from "../components/intro/FloatingNav";
import { SpatialCard } from "../components/intro/SpatialCard";
import { SPATIAL_BACKGROUND_IMAGE } from "../components/intro/SpatialCampusExperience";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailValid = email.endsWith("@cun.edu.co");
    const passwordValid = /^\d{10}$/.test(password);

    if (!emailValid) {
      setError("El correo debe terminar en @cun.edu.co");
      return;
    }

    if (!passwordValid) {
      setError("Error, asegúrate de escribir bien tu cédula");
      return;
    }

    setError("");
    onLogin();
  };

  const handlePasswordChange = (value: string) => {
    const numericOnly = value.replace(/\D/g, "");
    setPassword(numericOnly.slice(0, 10));
  };

  return (
    <div className="fixed inset-0 z-[100] min-h-[100dvh] w-full overflow-hidden">
      {/* Fondo inmersivo — mismo que intro / home */}
      <div className="absolute inset-0 z-0">
        <img
          src={SPATIAL_BACKGROUND_IMAGE}
          alt=""
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-950/30 to-slate-950/85" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[45vh] rounded-full opacity-35 blur-[100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #6366f155 0%, #3b82f633 40%, transparent 70%)",
          }}
        />
      </div>

      <FloatingNav />

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center p-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <SpatialCard depth="center" accentColor="#6366f1" className="p-8 md:p-10">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-200 mb-5">
                <Sparkles size={12} className="text-blue-300" />
                Campus Virtual CUN
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-300">
                Iniciar sesión
              </h1>
              <p className="mt-3 text-sm text-white/55">
                Accede a Luminachat con tu correo institucional
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2"
                >
                  Usuario
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="tucorreo@cun.edu.co"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/25 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2"
                >
                  Contraseña
                </label>
                <input
                  id="login-password"
                  type="password"
                  inputMode="numeric"
                  placeholder="Digita tu cédula (10 dígitos)"
                  required
                  maxLength={10}
                  autoComplete="off"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/25 transition-all"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-300 text-sm text-center bg-red-500/10 border border-red-400/20 rounded-xl py-2 px-3"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/35 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
              >
                <LogIn size={18} />
                Entrar
              </button>
            </form>

            <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-widest text-white/35">
              Powered by Gemini + CUN
            </p>
          </SpatialCard>
        </motion.div>
      </div>
    </div>
  );
}
