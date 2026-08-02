import type { ReactNode } from "react";

/**
 * Un panneau = une section de la page.
 *
 * L'en-tête porte une étiquette monospace qui contient toujours une
 * information vraie (une source, un décompte, une date) plutôt qu'un
 * numéro d'ordre décoratif. Un numéro n'apprend rien ; « 6 dépôts,
 * source api.github.com » situe le lecteur.
 */
export function Panneau({
  id,
  titre,
  etiquette,
  chapeau,
  children,
  bordure = true,
}: {
  id: string;
  titre: string;
  etiquette: ReactNode;
  chapeau?: ReactNode;
  children: ReactNode;
  bordure?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      className={`relative py-16 sm:py-24 ${bordure ? "border-t border-trait" : ""}`}
    >
      <header data-reveal className="mb-10 sm:mb-14">
        <p className="etiquette mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">{etiquette}</p>
        <h2 id={`${id}-titre`} className="titrage text-3xl sm:text-4xl md:text-[2.75rem]">
          {titre}
        </h2>
        {chapeau ? (
          <div className="prose-technique mt-5 text-[1.0625rem] leading-relaxed text-graphite">
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
    <span aria-hidden="true" className="text-trait-fort">
      ·
    </span>
  );
}

/** Pastille d'état. La couleur est sémantique, jamais décorative. */
export function Etat({ valeur }: { valeur: "en ligne" | "livré" | "en cours" }) {
  const style =
    valeur === "en ligne"
      ? "text-libre border-libre/40"
      : valeur === "livré"
        ? "text-methylene border-methylene/40"
        : "text-ocre border-ocre/40";

  return (
    <span
      className={`donnee inline-flex shrink-0 items-center gap-1.5 border px-2 py-0.5 text-[0.6875rem] tracking-wide uppercase ${style}`}
    >
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-current" />
      {valeur}
    </span>
  );
}
