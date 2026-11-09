import type { Domaine, Projet } from "@/content/projects";

/**
 * Logique pure de la section Projets : filtrer, compter, résumer.
 *
 * Les chiffres affichés en haut de page (tests, démos en ligne) sont
 * calculés ici à partir du contenu, jamais saisis à part : ajouter un
 * projet met le bandeau à jour, et il ne peut pas diverger des fiches.
 */

export type Filtre = Domaine | "tous";

export function filtrerParDomaine<P extends Pick<Projet, "domaines">>(
  projets: readonly P[],
  filtre: Filtre,
): P[] {
  if (filtre === "tous") return [...projets];
  return projets.filter((p) => p.domaines.includes(filtre));
}

export function compterParDomaine(
  projets: readonly Pick<Projet, "domaines">[],
): Record<Filtre, number> {
  const comptes: Record<Filtre, number> = {
    tous: projets.length,
    "full-stack": 0,
    devops: 0,
    data: 0,
    "automatisation-ia": 0,
  };
  for (const projet of projets) {
    // Un domaine déclaré deux fois sur un même projet ne compte qu'une fois.
    for (const domaine of new Set(projet.domaines)) comptes[domaine] += 1;
  }
  return comptes;
}

export type Indicateurs = {
  /** Somme des tests relevés en exécutant les suites. */
  tests: number;
  /** Nombre de projets dont la suite a été exécutée. */
  projetsTestes: number;
  /** Projets consultables en ligne par un visiteur. */
  enLigne: number;
  total: number;
};

export function indicateurs(
  projets: readonly Pick<Projet, "tests" | "statut" | "liens">[],
): Indicateurs {
  let tests = 0;
  let projetsTestes = 0;
  let enLigne = 0;

  for (const projet of projets) {
    if (typeof projet.tests === "number" && projet.tests > 0) {
      tests += projet.tests;
      projetsTestes += 1;
    }
    // « En ligne » exige les deux : le statut et un lien qu'on peut ouvrir.
    if (projet.statut === "en ligne" && projet.liens.some((l) => l.href.startsWith("https://"))) {
      enLigne += 1;
    }
  }

  return { tests, projetsTestes, enLigne, total: projets.length };
}

/**
 * Index de la vue suivante dans une galerie, en boucle.
 * `sens` vaut 1 (suivante) ou -1 (précédente).
 */
export function indexVoisin(courant: number, total: number, sens: 1 | -1): number {
  if (total <= 0) return 0;
  return (((courant + sens) % total) + total) % total;
}

/** Formate un nombre à la française : espace fine insécable comme séparateur de milliers. */
export function formaterNombre(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}
