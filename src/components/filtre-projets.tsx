"use client";

import { useState, type ReactNode } from "react";
import type { Filtre } from "@/lib/projets-select";

export type OptionFiltre = { id: Filtre; libelle: string; compte: number };

/**
 * Filtre du catalogue. Il ne re-rend aucune fiche : il pose un attribut
 * `data-filtre` sur la liste, et une règle CSS masque les fiches qui ne
 * déclarent pas le domaine (`data-domaines`). Les fiches restent des
 * composants serveur, lisibles et indexables sans JavaScript.
 */
export function FiltreProjets({ options, children }: { options: OptionFiltre[]; children: ReactNode }) {
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const visibles = options.find((o) => o.id === filtre)?.compte ?? 0;

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filtrer les projets par domaine" className="flex flex-wrap gap-2">
          {options.map(({ id, libelle, compte }) => {
            const actif = filtre === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={actif}
                onClick={() => setFiltre(id)}
                className={`interface inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  actif
                    ? "border-carbone bg-carbone text-papier"
                    : "border-trait-fort text-graphite hover:border-carbone hover:text-carbone"
                }`}
              >
                {libelle}
                <span className={`donnee text-[0.6875rem] ${actif ? "opacity-80" : ""}`}>{compte}</span>
              </button>
            );
          })}
        </div>
        <p className="etiquette" aria-live="polite">
          {visibles} projet{visibles > 1 ? "s" : ""} affiché{visibles > 1 ? "s" : ""}
        </p>
      </div>
      <div data-filtre={filtre} className="catalogue">
        {children}
      </div>
    </>
  );
}
