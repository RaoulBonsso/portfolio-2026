import type { Instantane } from "@/lib/github";
import { tempsRelatif, type Calendrier, type Depot, type Langage } from "@/lib/github-select";
import { DefilementFin } from "./defilement-fin";
import { Panneau, Point } from "./panneau";

/**
 * Tout ce panneau est rendu côté serveur à partir d'un instantané GitHub
 * revalidé toutes les heures. Rien n'est saisi à la main : si un dépôt est
 * poussé demain, il apparaît ici sans qu'une ligne de code change.
 */
export function Activite({ instantane }: { instantane: Instantane }) {
  return (
    <Panneau
      id="activite"
      titre="Ce que dit le compte GitHub"
      etiquette={
        <>
          <span>source : api.github.com/graphql</span>
          <Point />
          <span>revalidation horaire</span>
          <Point />
          <span>relevé {tempsRelatif(instantane.recupereLe)}</span>
        </>
      }
      chapeau={
        <p>
          Un portfolio peut affirmer n&apos;importe quoi. Cette section est branchée sur l&apos;API
          GitHub, appelée depuis le serveur avec un jeton qui n&apos;atteint jamais le navigateur.
          Les proportions de langages sont calculées sur le volume réel de code des dépôts publics
          — pas sur une liste de logos choisie pour faire bonne impression.
        </p>
      }
    >
      {!instantane.direct ? (
        <p className="donnee border border-ocre/40 px-4 py-3 text-[0.8125rem] text-ocre">
          Le flux GitHub n&apos;a pas répondu lors du dernier rendu. Les projets ci-dessus restent
          consultables directement sur github.com/RaoulBonsso.
        </p>
      ) : (
        <div className="flex flex-col gap-16">
          <Langages langages={instantane.langages} />
          <CalendrierContributions calendrier={instantane.calendrier} total={instantane.contributionsAnnee} />
          <Depots depots={instantane.depots} />
        </div>
      )}
    </Panneau>
  );
}

function Langages({ langages }: { langages: Langage[] }) {
  if (langages.length === 0) return null;
  const maxPart = Math.max(...langages.map((l) => l.part), 1);

  return (
    <div data-reveal>
      <h3 className="etiquette mb-6">Répartition du code publié</h3>

      {/* Barre agrégée : la vue d'ensemble avant le détail. */}
      <div
        className="flex h-2.5 w-full overflow-hidden border border-trait"
        role="img"
        aria-label={`Répartition : ${langages.map((l) => `${l.nom} ${l.part} %`).join(", ")}`}
      >
        {langages.map((langage, i) => (
          <span
            key={langage.nom}
            style={{
              width: `${langage.part}%`,
              backgroundColor: `var(--grille-${Math.max(1, 4 - Math.floor(i / 2))})`,
            }}
          />
        ))}
      </div>

      <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {langages.map((langage) => (
          <li key={langage.nom} className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 translate-y-[-1px] rounded-full border border-trait-fort"
              style={langage.couleur ? { backgroundColor: langage.couleur } : undefined}
            />
            <span className="w-28 shrink-0 truncate text-[0.9375rem]">{langage.nom}</span>
            <span className="relative h-px flex-1 bg-trait">
              <span
                className="absolute inset-y-0 left-0 bg-methylene"
                style={{ width: `${(langage.part / maxPart) * 100}%` }}
              />
            </span>
            <span className="donnee w-9 shrink-0 text-right text-[0.8125rem] text-graphite">
              {langage.part}%
            </span>
            <span className="donnee w-16 shrink-0 text-right text-[0.6875rem] text-graphite">
              {langage.depots} dép.
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LEGENDE = ["Aucune", "Faible", "Modérée", "Soutenue", "Intense"];

function CalendrierContributions({ calendrier, total }: { calendrier: Calendrier; total: number }) {
  if (calendrier.jours.length === 0) return null;

  return (
    <div data-reveal>
      <h3 className="etiquette mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span>Contributions sur douze mois</span>
        <Point />
        <span>{total} au total</span>
        <Point />
        <span>jour le plus dense : {calendrier.max}</span>
      </h3>

      <DefilementFin label="Calendrier des contributions, sur douze mois" className="-mx-1 px-1 pb-2">
        <div
          className="grid w-max grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: "repeat(7, 0.6875rem)" }}
        >
          {calendrier.jours.map((jour) => (
            <span
              key={jour.date}
              title={`${jour.compte} contribution${jour.compte > 1 ? "s" : ""} le ${jour.date}`}
              className="h-[0.6875rem] w-[0.6875rem]"
              style={{ backgroundColor: `var(--grille-${jour.niveau})` }}
            />
          ))}
        </div>
      </DefilementFin>

      <div className="mt-4 flex items-center gap-2">
        <span className="etiquette !text-[0.625rem]">Intensité</span>
        {LEGENDE.map((libelle, niveau) => (
          <span key={libelle} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-[0.5625rem] w-[0.5625rem]"
              style={{ backgroundColor: `var(--grille-${niveau})` }}
            />
            <span className="sr-only">{libelle}</span>
          </span>
        ))}
        <span className="etiquette !text-[0.625rem] !tracking-normal">faible → forte</span>
      </div>
    </div>
  );
}

function Depots({ depots }: { depots: Depot[] }) {
  if (depots.length === 0) return null;

  return (
    <div data-reveal>
      <h3 className="etiquette mb-6">Derniers dépôts poussés</h3>

      <ul className="border-t border-trait">
        {depots.map((depot) => (
          <li key={depot.nom}>
            <a
              href={depot.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-2 border-b border-trait py-4 transition-colors hover:bg-plan sm:flex-row sm:items-baseline sm:gap-6 sm:px-2 sm:-mx-2"
            >
              <span className="donnee flex min-w-0 items-baseline gap-2.5 text-[0.9375rem] sm:w-64 sm:shrink-0">
                <span className="truncate">{depot.nom}</span>
                <span
                  aria-hidden="true"
                  className="translate-y-[-1px] text-[0.6875rem] text-graphite opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ↗
                </span>
              </span>

              <span className="min-w-0 flex-1 text-[0.9375rem] leading-snug text-graphite">
                {depot.description ?? <span className="italic">Sans description</span>}
              </span>

              <span className="flex shrink-0 items-center gap-4">
                {depot.langage ? (
                  <span className="donnee flex items-center gap-1.5 text-[0.75rem] text-graphite">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full border border-trait-fort"
                      style={
                        depot.langage.couleur ? { backgroundColor: depot.langage.couleur } : undefined
                      }
                    />
                    {depot.langage.nom}
                  </span>
                ) : null}
                <span className="donnee w-24 text-right text-[0.75rem] text-graphite">
                  {tempsRelatif(depot.pousseLe)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://github.com/RaoulBonsso?tab=repositories"
        target="_blank"
        rel="noreferrer"
        className="donnee mt-6 inline-flex items-center gap-2 text-[0.8125rem] text-methylene"
      >
        <span className="lien">Tous les dépôts sur GitHub</span>
        <span aria-hidden="true" className="text-[0.6875rem]">
          ↗
        </span>
      </a>
    </div>
  );
}
