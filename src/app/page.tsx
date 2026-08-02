import { Activite } from "@/components/activite";
import { Chantiers } from "@/components/chantiers";
import { Contact, PiedDePage } from "@/components/contact";
import { Hero } from "@/components/hero";
import { ObservateurReveal } from "@/components/observateur-reveal";
import { Principes } from "@/components/principes";
import { Projets } from "@/components/projets";
import { Rail, type Section } from "@/components/rail";
import { chargerInstantane } from "@/lib/github";

/**
 * Page unique, rendue côté serveur.
 *
 * `chargerInstantane()` s'exécute sur le serveur : le jeton GitHub n'entre
 * jamais dans le HTML envoyé au navigateur. Le module est marqué
 * `server-only`, donc une importation depuis un composant client ferait
 * échouer la compilation — la garantie est tenue par le compilateur, pas
 * par la discipline.
 *
 * `revalidate` régénère la page au plus une fois par heure (ISR). Le
 * visiteur reçoit du HTML déjà prêt, jamais l'attente d'un appel réseau,
 * et l'API GitHub est sollicitée une fois par heure au lieu d'une fois
 * par visite. Cette clé de segment reste valide ici parce que Cache
 * Components n'est pas activé dans `next.config.ts`.
 */
export const revalidate = 3600;

const SECTIONS: Section[] = [
  { id: "projets", libelle: "Projets" },
  { id: "activite", libelle: "GitHub" },
  { id: "methode", libelle: "Méthode" },
  { id: "chantiers", libelle: "Chantiers" },
  { id: "contact", libelle: "Contact" },
];

export default async function Page() {
  const instantane = await chargerInstantane();

  return (
    <>
      <a
        href="#projets"
        className="donnee sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-carbone focus:px-4 focus:py-2 focus:text-papier"
      >
        Aller au contenu
      </a>

      <ObservateurReveal />
      <Rail sections={SECTIONS} />

      <div className="relative z-10 mx-auto w-full max-w-[68rem] px-5 sm:px-8 lg:px-12">
        <Hero instantane={instantane} />
        <main>
          <Projets />
          <Activite instantane={instantane} />
          <Principes />
          <Chantiers />
          <Contact />
        </main>
        <PiedDePage />
      </div>
    </>
  );
}
