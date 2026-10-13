import { ArrowUpRight, Hammer } from "lucide-react";
import { autresProjets, chantiers, enConstruction, projets } from "@/content/projects";
import { formaterNombre, indicateurs } from "@/lib/projets-select";
import { CatalogueProjets } from "./catalogue-projets";
import { Etat, Panneau, Point } from "./panneau";

export function Projets() {
  const chiffres = indicateurs(projets);

  return (
    <Panneau
      id="projets"
      titre={
        <>
          Ce que j&apos;ai construit, <span className="accent">et comment le vérifier</span>.
        </>
      }
      etiquette={
        <>
          <span>{projets.length} projets détaillés</span>
          <Point />
          <span>{formaterNombre(chiffres.tests)} tests exécutés</span>
          <Point />
          <span>{chiffres.enLigne} démos en ligne</span>
        </>
      }
      chapeau={
        <p>
          Pour chaque projet : le problème, ce qui a été construit, la pile, et les preuves. Les
          captures viennent des sites en ligne ; un dépôt privé est signalé comme tel, et un projet
          sans interface publique montre son fonctionnement plutôt qu&apos;une maquette.
        </p>
      }
    >
      <CatalogueProjets projets={projets} />

      <EnConstruction />
      <AutresRealisations />
    </Panneau>
  );
}

function EnConstruction() {
  return (
    <div data-reveal className="carte mt-6 flex flex-col gap-4 border-dashed p-6 sm:flex-row sm:items-center sm:p-8">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-plan-2 text-ocre">
        <Hammer aria-hidden="true" className="size-5" />
      </span>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="titrage text-2xl">{enConstruction.nom}</h3>
          <Etat valeur={enConstruction.statut} />
        </div>
        <p className="mt-2 leading-relaxed text-graphite">{enConstruction.description}</p>
      </div>
    </div>
  );
}

/** Le reste du parcours, en format court : réalisations antérieures et bibliothèques écrites de zéro. */
function AutresRealisations() {
  return (
    <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div data-reveal>
        <h3 className="etiquette mb-5">Réalisations antérieures</h3>
        <ul className="border-t border-trait">
          {autresProjets.map((p) => (
            <li key={p.nom} className="border-b border-trait py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="titrage text-xl">{p.nom}</span>
                <span className="donnee text-[0.75rem] text-graphite">{p.pile}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-graphite">{p.resume}</p>
              {p.lien ? (
                <a
                  href={p.lien.href}
                  target="_blank"
                  rel="noreferrer"
                  className="interface mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-methylene"
                >
                  <span className="lien">{p.lien.libelle}</span>
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div data-reveal data-reveal-retard={80}>
        <h3 className="etiquette mb-5">Écrits pour comprendre · zéro dépendance runtime</h3>
        <ul className="border-t border-trait">
          {chantiers.map((c) => (
            <li key={c.nom} className="border-b border-trait py-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="donnee text-[0.9375rem] font-medium">{c.nom}</span>
                <span className="etiquette">{c.langage}</span>
              </div>
              <p className="mt-1.5 leading-relaxed text-graphite">{c.description}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">
          Dépôts locaux, non publiés : je les présente volontiers en entretien, code à l&apos;écran.
        </p>
      </div>
    </div>
  );
}
