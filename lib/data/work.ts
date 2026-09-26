import { CANDIDATE_CONTENT } from "@/lib/candidate-content";

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  id: string;
  title: string;
  role: string;
  period: string;
  context: string;
  highlights: string[];
  stack: string[];
  links?: WorkLink[];
}

// The candidate-facing experience summary follows the current CV.
export const WORK_ITEMS: WorkItem[] = CANDIDATE_CONTENT.fr.work;
export const AI_PRACTICES: string[] = CANDIDATE_CONTENT.fr.about.ai;
