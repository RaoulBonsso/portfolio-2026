"use client";

import { useEffect } from "react";

/**
 * Un seul observateur pour toute la page.
 *
 * L'alternative — un composant client par élément à révéler — aurait
 * transformé chaque section en frontière client/serveur. Ici les sections
 * restent des composants serveur : elles posent un attribut `data-reveal`,
 * ce module s'occupe du reste.
 */
export function ObservateurReveal() {
  useEffect(() => {
    const cibles = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cibles.forEach((cible) => (cible.dataset.reveal = "vu"));
      return;
    }

    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          const cible = entree.target as HTMLElement;
          const retard = Number(cible.dataset.revealRetard ?? 0);
          window.setTimeout(() => (cible.dataset.reveal = "vu"), retard);
          observateur.unobserve(cible);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    cibles.forEach((cible) => observateur.observe(cible));
    return () => observateur.disconnect();
  }, []);

  return null;
}
