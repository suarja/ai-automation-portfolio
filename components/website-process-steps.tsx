"use client";

import { useState } from "react";
import { Search, Palette, Code, Rocket } from "lucide-react";

export default function WebsiteProcessSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Search className="h-8 w-8 text-purple-400" />,
      title: "Stratégie & Vision",
      description:
        "Définissons ensemble tes objectifs et la structure idéale pour ton site.",
      details:
        "Nous commençons par clarifier tes besoins, ton public cible et tes objectifs. Cette étape cruciale permet de définir la structure, les fonctionnalités et le style visuel qui correspondront parfaitement à ton projet.",
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-400" />,
      title: "Design avec l'IA",
      description:
        "Utilise l'IA pour générer un design professionnel qui te ressemble.",
      details:
        "Tu apprends à utiliser les outils d'IA pour créer un design sur-mesure : maquettes, images, logos, palettes de couleurs... Le tout sans compétences en graphisme et avec un résultat professionnel.",
    },
    {
      icon: <Code className="h-8 w-8 text-indigo-400" />,
      title: "Développement assisté",
      description:
        "L'IA génère le code pendant que tu te concentres sur le contenu.",
      details:
        "Grâce à nos templates et à l'IA, le code de ton site est généré automatiquement. Tu n'as qu'à te concentrer sur ton contenu et tes fonctionnalités, sans te soucier des aspects techniques.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-400" />,
      title: "Mise en ligne & Optimisation",
      description: "Ton site est publié, optimisé et prêt à conquérir le web.",
      details:
        "Nous finalisons ton site avec les optimisations SEO, performance et sécurité. Tu apprends à le mettre en ligne et à le gérer toi-même. Le résultat : un site professionnel, rapide et parfaitement adapté à tes besoins.",
    },
  ];

  return (
    <div className="relative">
      {/* Ligne de connexion */}
      <div className="absolute left-[39px] top-12 bottom-12 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 hidden md:block"></div>

      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative ${
              activeStep === index
                ? "scale-105 transform transition-all duration-300"
                : ""
            }`}
            onMouseEnter={() => setActiveStep(index)}
            onClick={() => setActiveStep(index)}
          >
            <div
              className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 ${
                activeStep === index
                  ? "bg-[#1a1a1a] border-[#333] shadow-[0_5px_20px_rgba(0,0,0,0.3)]"
                  : "bg-[#151515] border-[#222]"
              }`}
            >
              <div className="flex-shrink-0 flex justify-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-br from-purple-900/30 to-indigo-900/30 shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                      : "bg-[#1a1a1a]"
                  }`}
                >
                  {step.icon}
                </div>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300 font-medium mb-4">
                  {step.description}
                </p>
                <div
                  className={`text-gray-400 transition-all duration-300 ${
                    activeStep === index
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 md:max-h-40 md:opacity-100"
                  } overflow-hidden`}
                >
                  {step.details}
                </div>
              </div>

              <div className="flex-shrink-0 flex items-center justify-center md:justify-end">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    activeStep === index
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white"
                      : "bg-[#222] text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
