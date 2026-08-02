import { accroche, profile } from "@/content/profile";
import type { Instantane } from "@/lib/github";
import { tempsRelatif } from "@/lib/github-select";
import { BasculeTheme } from "./bascule-theme";

/**
 * La thèse de la page.
 *
 * Le pari : ouvrir sur des chiffres vérifiables plutôt que sur des adjectifs.
 * Un recruteur peut cliquer sur « GitHub » et recompter lui-même. C'est la
 * différence entre « passionné et rigoureux » et « 130 contributions sur
 * douze mois, 75 dépôts publics ».
 */
export function Hero({ instantane }: { instantane: Instantane }) {
  const lignes = ["Je construis", "des systèmes,", "pas des écrans."];

  return (
    <header className="relative pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="mb-16 flex items-start justify-between gap-6 sm:mb-24">
        <div>
          <p className="titrage text-[0.9375rem] tracking-tight sm:text-base">{profile.nom}</p>
          <p className="etiquette mt-1.5">Développeur full-stack</p>
        </div>
        <BasculeTheme />
      </div>

      <h1 className="titrage text-[clamp(2.6rem,10vw,6.5rem)]">
        {lignes.map((ligne, i) => (
          <span
            key={ligne}
            className="lever block"
            style={{ animationDelay: `${120 + i * 110}ms` }}
          >
            {ligne}
          </span>
        ))}
      </h1>

      <p
        className="lever prose-technique mt-8 text-[1.125rem] leading-[1.7] text-graphite sm:mt-10"
        style={{ animationDelay: "480ms" }}
      >
        {accroche.corps}
      </p>

      <div
        className="lever mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 sm:mt-12"
        style={{ animationDelay: "600ms" }}
      >
        <a
          href="https://aiguillage-delta.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="donnee group inline-flex items-center gap-2.5 bg-carbone px-4 py-2.5 text-[0.8125rem] text-papier transition-opacity hover:opacity-85"
        >
          Voir Aiguillage en ligne
          <Fleche />
        </a>
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noreferrer"
          className="donnee inline-flex items-center gap-2.5 border border-trait-fort px-4 py-2.5 text-[0.8125rem] transition-colors hover:border-carbone"
        >
          GitHub
          <Fleche />
        </a>
        <a
          href={`mailto:${profile.contact.email}`}
          className="donnee inline-flex items-center gap-2.5 px-1.5 py-2.5 text-[0.8125rem] text-graphite transition-colors hover:text-carbone"
        >
          <span className="lien">{profile.contact.email}</span>
        </a>
      </div>

      <Bandeau instantane={instantane} />
    </header>
  );
}

/**
 * Bandeau de service : quatre mesures réelles, alignées comme sur un tableau
 * d'affichage. Les chiffres sont en chasse fixe et tabulaires pour que les
 * colonnes ne dansent pas d'une valeur à l'autre.
 */
function Bandeau({ instantane }: { instantane: Instantane }) {
  const mesures = [
    { valeur: instantane.contributionsAnnee, unite: "contributions", precision: "12 derniers mois" },
    { valeur: instantane.commitsAnnee, unite: "commits", precision: "12 derniers mois" },
    { valeur: instantane.pullRequestsAnnee, unite: "pull requests", precision: "12 derniers mois" },
    { valeur: instantane.depotsPublics, unite: "dépôts publics", precision: "sur le compte" },
  ];

  return (
    <div className="lever mt-14 sm:mt-20" style={{ animationDelay: "720ms" }}>
      <p className="etiquette mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
        {instantane.direct ? (
          <>
            <span aria-hidden="true" className="pulsation inline-block h-1.5 w-1.5 bg-libre" />
            <span>Données GitHub en direct</span>
            <span aria-hidden="true" className="text-trait-fort">
              ·
            </span>
            <span>relevé {tempsRelatif(instantane.recupereLe)}</span>
          </>
        ) : (
          <>
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-ocre" />
            <span>Flux GitHub momentanément indisponible</span>
          </>
        )}
      </p>

      <dl className="grid grid-cols-2 border-t border-trait sm:grid-cols-4">
        {mesures.map(({ valeur, unite, precision }) => (
          <div
            key={unite}
            className="border-b border-trait px-1 py-5 not-first:border-l not-first:pl-5 sm:py-6"
          >
            <dd className="donnee text-3xl leading-none font-medium sm:text-[2.5rem]">
              {instantane.direct ? valeur : "—"}
            </dd>
            <dt className="mt-2.5">
              <span className="block text-[0.9375rem] leading-snug">{unite}</span>
              <span className="etiquette mt-1 block !text-[0.625rem] !tracking-[0.1em]">
                {precision}
              </span>
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Fleche() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
