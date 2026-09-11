"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes only knows the theme on the client
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-10 h-10" aria-hidden="true" />;

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={isDark ? "Thème clair" : "Thème sombre"}
      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors shadow-sm card-glow"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
