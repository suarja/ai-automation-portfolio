import { Sparkles } from "lucide-react";
import { AI_PRACTICES } from "@/lib/data/work";

export default function AiPractices() {
  return (
    <div className="card-glow relative overflow-hidden rounded-3xl border border-border shadow-card backdrop-blur-sm bg-gradient-to-br from-primary/10 to-card">
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Ma façon de travailler avec l'IA</h3>
        </div>
        <ul className="space-y-3 text-soft">
          {AI_PRACTICES.map((practice) => (
            <li key={practice} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400" />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-transparent to-black opacity-0 dark:opacity-20"></div>
    </div>
  );
}
