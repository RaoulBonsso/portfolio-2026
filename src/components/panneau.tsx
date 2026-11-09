import type { ReactNode } from "react";
import type { Statut } from "@/content/projects";

/**
 * Un panneau = une section de la page.
 *
 * L'en-tête porte une étiquette monospace qui contient toujours une
 * information vraie (une source, un décompte, une date) plutôt qu'un
 * numéro d'ordre décoratif.
 */
export function Panneau({
  id,
  titre,
  etiquette,
  chapeau,
  children,
}: {
  id: string;
  titre: ReactNode;
  etiquette: ReactNode;
  chapeau?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titre`} className="relative border-t border-trait py-20 sm:py-28">
      <header data-reveal className="mb-10 sm:mb-14">
        <p className="etiquette mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 !text-methylene">
          {etiquette}
        </p>
        <h2 id={`${id}-titre`} className="titrage max-w-4xl text-[2.1rem] sm:text-5xl md:text-[3.5rem]">
          {titre}
        </h2>
        {chapeau ? (
          <div className="prose-technique mt-5 text-[1.0625rem] leading-relaxed text-graphite sm:text-lg">
            {chapeau}
          </div>
        ) : null}
      </header>
      {children}
    </section>
  );
}

/** Petit séparateur monospace, pour composer les étiquettes. */
export function Point() {
  return (
    <span aria-hidden="true" className="opacity-60">
      ·
    </span>
  );
}

/** Pastille d'état. La couleur est sémantique, jamais décorative. */
export function Etat({ valeur }: { valeur: Statut }) {
  const style =
    valeur === "en ligne" || valeur === "en service"
      ? "text-libre border-libre/40"
      : valeur === "non publié"
        ? "text-methylene border-methylene/40"
        : "text-ocre border-ocre/40";

  return (
    <span
      className={`donnee inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.6875rem] tracking-wide uppercase ${style}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {valeur}
    </span>
  );
}
