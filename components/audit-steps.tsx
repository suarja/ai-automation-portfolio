"use client";

import { useState } from "react";
import { Search, Code, CheckSquare } from "lucide-react";

export default function AuditSteps() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: <Search className="h-8 w-8 text-purple-400" />,
      title: "Audit gratuit (30 min)",
      description:
        "On identifie ensemble TA tâche répétitive la plus urgente à automatiser.",
      details:
        "Pendant cet appel, nous analysons ton workflow actuel, identifions les goulots d'étranglement et déterminons quelle tâche automatiser en priorité pour un impact maximum.",
    },
    {
      icon: <Code className="h-8 w-8 text-blue-400" />,
      title: "Création live",
      description:
        "En visio, je développe ton automatisation N8N/IA en direct.",
      details:
        "Tu assistes en temps réel à la création de ton workflow. Je t'explique chaque étape pour que tu comprennes parfaitement comment fonctionne ton automatisation.",
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-green-400" />,
      title: "Prêt à l'emploi",
      description:
        "Tu repars avec un workflow fonctionnel, testé et documenté.",
      details:
        "À la fin de notre session, tu disposes d'une solution clé en main que tu peux utiliser immédiatement. Je te fournis également une documentation simple pour que tu puisses la modifier si nécessaire.",
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
