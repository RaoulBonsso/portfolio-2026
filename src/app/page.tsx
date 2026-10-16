import { Activite } from "@/components/activite";
import { Axes } from "@/components/axes";
import { Contact, PiedDePage } from "@/components/contact";
import { EnTete, type Section } from "@/components/en-tete";
import { Hero } from "@/components/hero";
import { ObservateurReveal } from "@/components/observateur-reveal";
import { Parcours } from "@/components/parcours";
import { Principes } from "@/components/principes";
import { Projets } from "@/components/projets";
import { profile } from "@/content/profile";
import { chargerInstantane } from "@/lib/github";
import { SITE } from "@/lib/site";

/**
 * Page unique, rendue côté serveur.
 *
 * `chargerInstantane()` s'exécute sur le serveur : le jeton GitHub n'entre
 * jamais dans le HTML envoyé au navigateur (module `server-only`).
 *
 * `revalidate` régénère la page au plus une fois par heure (ISR) : le
 * visiteur reçoit du HTML déjà prêt, et l'API GitHub est sollicitée une
 * fois par heure au lieu d'une fois par visite.
 */
export const revalidate = 3600;

const SECTIONS: Section[] = [
  { id: "projets", libelle: "Projets" },
  { id: "parcours", libelle: "Parcours" },
  { id: "competences", libelle: "Compétences" },
  { id: "activite", libelle: "GitHub" },
  { id: "contact", libelle: "Contact" },
];

/** Données structurées : ce que les moteurs de recherche lisent de la page. */
const PERSONNE = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.nom,
  jobTitle: profile.titre,
  url: SITE,
  email: `mailto:${profile.contact.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Nantes", addressCountry: "FR" },
  alumniOf: [{ "@type": "EducationalOrganization", name: "Sup de Vinci" }],
  sameAs: [profile.contact.github, profile.contact.linkedin, profile.contact.siteRecruteur],
  knowsAbout: ["Next.js", "TypeScript", "Node.js", "Python", "Docker", "CI/CD", "Firebase", "PostgreSQL", "n8n"],
};

export default async function Page() {
  const instantane = await chargerInstantane();

  return (
    <>
      <a
        href="#contenu"
        className="interface sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-carbone focus:px-4 focus:py-2 focus:text-papier"
      >
        Aller au contenu
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSONNE).replace(/</g, "\\u003c") }}
      />

      <ObservateurReveal />
      <EnTete sections={SECTIONS} />

      <div className="relative">
        <div className="halo pointer-events-none absolute inset-x-0 top-0 h-[90vh]" aria-hidden="true" />
        <div className="trame" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          <main id="contenu" tabIndex={-1} className="outline-none">
            <Hero instantane={instantane} />
            <Projets />
            <Parcours />
            <Axes />
            <Activite instantane={instantane} />
            <Principes />
            <Contact />
          </main>
          <PiedDePage />
        </div>
      </div>
    </>
  );
}
