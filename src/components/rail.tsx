"use client";

import { useEffect, useState } from "react";

export type Section = { id: string; libelle: string };

/**
 * Index latéral avec suivi de la section courante.
 *
 * Le suivi utilise IntersectionObserver plutôt qu'un écouteur de défilement :
 * pas de calcul de position à chaque pixel, donc pas de saccade sur mobile.
 * La marge basse (-55%) fait basculer le repère quand la section franchit
 * le haut de l'écran, ce qui correspond à ce que l'œil considère « courant ».
 */
export function Rail({ sections }: { sections: Section[] }) {
  const [courante, setCourante] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observateur = new IntersectionObserver(
      (entrees) => {
        const visible = entrees
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setCourante(visible.target.id);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const noeud = document.getElementById(id);
      if (noeud) observateur.observe(noeud);
    }

    return () => observateur.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections de la page"
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-full w-56 flex-col justify-center pl-8 xl:flex"
    >
      <ol className="pointer-events-auto flex flex-col gap-3">
        {sections.map(({ id, libelle }) => {
          const active = courante === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active ? "true" : undefined}
                className="group flex items-center gap-3 py-0.5"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-500 ${
                    active
                      ? "w-8 bg-methylene"
                      : "w-3 bg-trait-fort group-hover:w-6 group-hover:bg-graphite"
                  }`}
                />
                <span
                  className={`etiquette transition-colors duration-300 ${
                    active ? "!text-carbone" : "group-hover:!text-carbone"
                  }`}
                >
                  {libelle}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
