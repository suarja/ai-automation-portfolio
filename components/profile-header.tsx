import Image from "next/image";
import SocialIcon from "./social-icon";

export default function ProfileHeader() {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 overflow-hidden rounded-full border-2 border-gray-700 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
        <Image
          src="/images/profile.png"
          alt="Photo de profil"
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="mt-4 text-3xl font-bold">Jason Suárez</h1>

      <p className="mt-2 text-gray-400 max-w-md">
        Le temps, c'est de l'argent. Automatise les deux.
      </p>

      <div className="flex gap-3 mt-4">
        <SocialIcon
          icon="tiktok"
          href="https://tiktok.com/@swarecito"
          label="TikTok"
        />
        <SocialIcon
          icon="youtube"
          href="https://youtube.com/@swarecito"
          label="YouTube"
        />
        <SocialIcon
          icon="linkedin"
          href="https://linkedin.com/in/jason-suarez"
          label="LinkedIn"
        />
      </div>
    </header>
  );
}
