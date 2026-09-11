import Link from "next/link";
import { Shield, Home, Github } from "lucide-react";

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col items-center">
          {/* Navigation du footer */}
          <nav className="mb-6">
            <ul className="flex flex-wrap justify-center gap-6">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home size={16} className="mr-2" />
                  <span>Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Shield size={16} className="mr-2" />
                  <span>Confidentialité</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/suarja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={16} className="mr-2" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Ligne de séparation */}
          <div className="w-24 h-px bg-border mb-6"></div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} – Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
