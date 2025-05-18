"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question: "Est-ce vraiment gratuit ?",
      answer:
        "Oui, l'audit et la création du premier workflow sont totalement gratuits. C'est un audit exploratoire pour comprendre tes vrais besoins et affiner mes futures offres. Il n'y a aucune obligation d'achat par la suite.",
    },
    {
      question: "J'ai peu de compétences tech : est-ce pour moi ?",
      answer:
        "Absolument ! Je t'accompagne pas à pas, sans jargon technique. L'objectif est de te fournir une solution que tu pourras utiliser facilement, même si tu n'as aucune compétence technique. Tout est expliqué simplement.",
    },
    {
      question: "Que se passe-t-il après l'audit ?",
      answer:
        "Tu repars avec un workflow prêt à l'emploi, et la possibilité de poursuivre sur un forfait complet si ça te plaît. Si tu souhaites aller plus loin, je te présenterai les options disponibles, mais sans aucune pression.",
    },
    {
      question: "Quels types de tâches peut-on automatiser ?",
      answer:
        "Presque tout ! Gestion d'emails, création de contenu, suivi de prospects, facturation, onboarding client, collecte de données, publication sur les réseaux sociaux... Lors de l'audit, nous identifierons ensemble la tâche qui te fera gagner le plus de temps.",
    },
    {
      question:
        "Combien de temps faut-il pour mettre en place l'automatisation ?",
      answer:
        "Dès notre premier appel de 30 minutes, nous commençons la création. Dans les 7 jours suivants, ton workflow est finalisé, testé et prêt à l'emploi. La plupart des automatisations simples sont même terminées en 2-3 jours.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className={`border ${
            openIndex === index
              ? "border-purple-500/30 bg-[#151515]"
              : "border-[#222] bg-[#111]"
          } rounded-xl overflow-hidden transition-all duration-300`}
        >
          <button
            className="w-full text-left p-6 flex justify-between items-center"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-lg font-medium">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="p-6 pt-0 text-gray-300">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
