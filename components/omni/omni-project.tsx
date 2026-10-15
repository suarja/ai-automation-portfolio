import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { OMNI_ARTICLE_PATH, OMNI_DESCRIPTION } from "@/lib/omni";
import { OmniCapture } from "./omni-capture";
import styles from "./omni.module.css";

export function OmniProject() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className={styles.project}>
        <SiteHeader locale="fr" languageFallbackToHome />
        <header>
          <h1>Omni Desktop</h1>
          <p className={styles.intro}>{OMNI_DESCRIPTION}</p>
          <div className={styles.meta}>
            <span><strong>Mon rôle</strong> · Conception et développement</span>
            <span><strong>Plateforme</strong> · macOS</span>
            <span>En développement</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full"><a href="#parcours">Explorer l’interface <ArrowDown aria-hidden="true" /></a></Button>
            <Button asChild variant="outline" className="rounded-full"><Link href={OMNI_ARTICLE_PATH}>Lire le récit de conception <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </header>
        <div className="mt-8">
          <OmniCapture image="project" priority>OmniProject dans l’application installée. Les relations entre le projet, ses sources et ses agents restent visibles. Capture réelle du 15 octobre 2026.</OmniCapture>
        </div>
        <section className={styles.split} aria-label="Du besoin au produit">
          <div className={styles.panel}>
            <h2>Le problème utilisateur</h2>
            <p>Chaque agent peut créer ses skills. D’un projet à l’autre, les recettes s’accumulent, les copies divergent et les sources externes évoluent. Comment voir qui utilise quoi et décider où répercuter une amélioration&nbsp;?</p>
          </div>
          <div className={styles.panel}>
            <h2>La réponse d’Omni</h2>
            <p>Omni relie les marketplaces, les skills, les projets et les agents dans une application locale. J’y rassemble leur gestion pour rendre visibles les provenances et les installations, examiner les changements et retrouver les mêmes méthodes entre projets.</p>
          </div>
        </section>
        <section className={styles.role} aria-labelledby="omni-role">
          <h2 id="omni-role">Ce que j’ai pris en charge</h2>
          <p>J’ai conçu les parcours, développé l’application et beaucoup itéré sur la manière de représenter ces relations. Comment garder une seule skill identifiable quand elle existe dans plusieurs projets et plusieurs agents&nbsp;? Le canevas, les regroupements et les fiches latérales répondent à cette question.</p>
          <p className="mt-4 text-sm text-muted-foreground">React · TypeScript · Electron · Vitest · MCP</p>
        </section>
        <section className={styles.section} id="parcours">
          <h2>Du projet au contenu, sans perdre le fil</h2>
          <div className={styles.sequence}>
            <div><h3>Le projet donne le contexte</h3><p>Les sources et les instructions entourent le projet. Le canevas rend leurs liens visibles avant d’entrer dans le détail.</p></div>
            <OmniCapture image="project">Les regroupements distinguent les provenances, les instructions et les ressources propres au projet.</OmniCapture>
          </div>
          <div className={styles.sequence}>
            <div><h3>Une skill, plusieurs agents</h3><p>Chaque skill occupe un seul nœud. Les pastilles indiquent sa présence dans Claude Code et Codex, sans répéter son nom dans deux cartes.</p></div>
            <OmniCapture image="skills">La présence dans chaque agent se lit sur la skill elle-même.</OmniCapture>
          </div>
          <div className={styles.sequence}>
            <div><h3>Le détail reste à côté</h3><p>Une fiche latérale rassemble le rôle du skill, sa provenance, ses installations et son contenu. Le canevas reste visible pendant la lecture.</p></div>
            <OmniCapture image="reader">Le lecteur donne le détail sans remplacer tout l’écran.</OmniCapture>
          </div>
        </section>
        <section className={styles.closing}>
          <div><h2>Pourquoi cette interface&nbsp;?</h2><p>Le passage à un canevas, le choix d’un nœud par skill et la place des fiches latérales : je raconte les décisions derrière ces écrans.</p></div>
          <Button asChild variant="outline" className="shrink-0 rounded-full"><Link href={OMNI_ARTICLE_PATH}>Lire l’article <ArrowRight aria-hidden="true" /></Link></Button>
        </section>
        <p className={styles.status}>Omni est un projet en développement. Les captures montrent le parcours de lecture de l’application installée. Les parcours complets de mise à jour des copies restent en cours de travail.</p>
        <footer className={styles.footer}><Link href="/">Jason Suárez</Link><span>Projet indépendant · 2026</span></footer>
      </div>
    </main>
  );
}
