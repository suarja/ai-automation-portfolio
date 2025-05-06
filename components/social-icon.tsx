import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";

interface SocialIconProps {
  icon: string;
  href: string;
  label: string;
}

export default function SocialIcon({ icon, href, label }: SocialIconProps) {
  const renderIcon = () => {
    switch (icon) {
      case "instagram":
        return <Instagram size={18} />;
      case "tiktok":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        );
      case "youtube":
        return <Youtube size={18} />;
      case "linkedin":
        return <Linkedin size={18} />;
      default:
        return <span>?</span>;
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center hover:bg-[#222] transition-colors border border-[#222] shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
      aria-label={label}
    >
      {renderIcon()}
    </Link>
  );
}
