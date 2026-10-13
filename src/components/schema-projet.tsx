import type { Schema } from "@/content/projects";

/**
 * Pour un projet sans interface publique : son fonctionnement, étape par
 * étape, tiré du README. Plutôt qu'une maquette qui ferait croire à un
 * écran inexistant, on montre le mécanisme — c'est ce qui se défend en
 * entretien.
 */
export function SchemaProjet({ nom, schema }: { nom: string; schema: Schema }) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="carte grille-points relative overflow-hidden !rounded-2xl px-5 py-6 sm:px-8 sm:py-8">
        <p className="etiquette mb-5 flex items-center gap-2">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ocre" />
          Schéma de fonctionnement
        </p>
        <ol className="relative flex flex-col gap-3" aria-label={`Fonctionnement de ${nom}`}>
          <svg
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[1.15rem] h-[calc(100%-2.5rem)] w-px overflow-visible"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--trait-fort)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="100%" stroke="var(--methylene)" strokeWidth="1.5" className="trace-flux" />
          </svg>
          {schema.etapes.map((etape, i) => (
            <li key={etape.titre} className="relative flex items-center gap-4">
              <span className="donnee relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-trait-fort bg-plan text-[0.75rem] text-methylene">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 flex-1 flex-col rounded-xl border border-trait bg-plan px-4 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="donnee text-[0.875rem] font-medium text-carbone">{etape.titre}</span>
                <span className="interface text-[0.875rem] text-graphite">{etape.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="text-[0.9375rem] leading-snug text-graphite">{schema.legende}</figcaption>
    </figure>
  );
}
