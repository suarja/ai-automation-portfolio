"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function WebsiteFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      question:
        "Je n'ai aucune compétence technique, est-ce que je peux quand même créer un site professionnel ?",
      answer:
        "Absolument ! Notre méthode est spécialement conçue pour les non-techniciens. L'IA s'occupe des aspects techniques pendant que tu te concentres sur ta vision et ton contenu. Notre accompagnement pas à pas te guide à chaque étape, sans jargon technique.",
    },
    {
      question: "En combien de temps vais-je avoir un site fonctionnel ?",
      answer:
        "La plupart de nos clients ont un site complet et fonctionnel en 10 à 14 jours. Tout dépend de la complexité de ton projet et du temps que tu peux y consacrer. Avec 3-4 heures par semaine, tu peux avoir un site professionnel en deux semaines.",
    },
    {
      question:
        "Est-ce que mon site sera vraiment professionnel ou aura-t-il l'air amateur ?",
      answer:
        "Les sites créés avec notre méthode sont indiscernables de ceux réalisés par des agences web professionnelles. Nous utilisons les mêmes technologies modernes (Next.js, Tailwind CSS) que les meilleures agences, et l'IA nous permet de créer des designs uniques et sur-mesure, pas des templates génériques.",
    },
    {
      question: "Comment se déroule l'accompagnement personnalisé ?",
      answer:
        "Tu bénéficies de 4 sessions de coaching en visioconférence (2h au total) réparties sur les 14 jours. Entre ces sessions, tu as accès à notre groupe privé pour poser tes questions et obtenir de l'aide rapidement. Nous sommes là pour t'accompagner à chaque étape et résoudre tous les blocages que tu pourrais rencontrer.",
    },
    {
      question:
        "Est-ce que je pourrai modifier mon site moi-même après sa création ?",
      answer:
        "C'est tout l'intérêt de notre approche ! Tu apprends à gérer ton site de A à Z. À la fin de la formation, tu seras autonome pour ajouter du contenu, modifier le design, et même ajouter de nouvelles fonctionnalités. Fini la dépendance aux développeurs pour chaque petite modification.",
    },
    {
      question: "Quels types de sites puis-je créer avec cette méthode ?",
      answer:
        "Notre méthode s'adapte à presque tous les types de sites : site vitrine, portfolio, blog, e-commerce, site de réservation, membership... La seule limite est les applications très complexes qui nécessiteraient un développement sur mesure approfondi.",
    },
    {
      question: "Y a-t-il une garantie de satisfaction ?",
      answer:
        "Oui ! Nous offrons une garantie satisfait ou remboursé de 14 jours. Si tu estimes que la formation ne correspond pas à tes attentes après avoir suivi les deux premières sessions, nous te remboursons intégralement.",
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
