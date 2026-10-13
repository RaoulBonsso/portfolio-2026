import { ArrowUpRight, Check, Lock } from "lucide-react";
import type { Projet } from "@/content/projects";
import { Galerie } from "./galerie";
import { Etat } from "./panneau";
import { SchemaProjet } from "./schema-projet";

/**
 * Fiche d'un projet — composant serveur. Seule la galerie est un îlot
 * client : le texte, les preuves et les liens arrivent en HTML pur.
 */
function adresseDe(projet: Projet): string {
  const principal = projet.liens.find((l) => l.primaire) ?? projet.liens[0];
  if (principal) return principal.href.replace(/^https:\/\//, "");
  return "localhost — build de production";
}

export function CarteProjet({ projet, inverse, prioritaire }: { projet: Projet; inverse: boolean; prioritaire: boolean }) {
  return (
    <article id={`projet-${projet.slug}`} aria-labelledby={`projet-${projet.slug}-titre`} className="grid scroll-mt-24 grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`min-w-0 lg:col-span-7 ${inverse ? "lg:order-2" : ""}`}>
        <div className="lg:sticky lg:top-24">
          {projet.captures.length > 0 ? (
            <Galerie nom={projet.nom} captures={projet.captures} adresse={adresseDe(projet)} prioritaire={prioritaire} />
          ) : projet.schema ? (
            <SchemaProjet nom={projet.nom} schema={projet.schema} />
          ) : null}
        </div>
      </div>

      <div className={`flex min-w-0 flex-col lg:col-span-5 ${inverse ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 id={`projet-${projet.slug}-titre`} className="titrage mr-1 text-[1.9rem] sm:text-[2.25rem]">
            {projet.nom}
          </h3>
          <Etat valeur={projet.statut} />
          {projet.code === "privé" ? (
            <span className="donnee inline-flex items-center gap-1 rounded-full border border-trait-fort px-2.5 py-0.5 text-[0.6875rem] tracking-wide text-graphite uppercase">
              <Lock aria-hidden="true" className="size-3" />
              code privé
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-[1.1875rem] leading-[1.5] text-carbone sm:text-[1.3125rem]">{projet.accroche}</p>

        <h4 className="etiquette mt-7">Le problème</h4>
        <p className="mt-2 leading-[1.7] text-graphite">{projet.probleme}</p>

        <h4 className="etiquette mt-7">Ce que j&apos;ai construit</h4>
        <ul className="mt-3 flex flex-col gap-2.5">
          {projet.construit.map((ligne) => (
            <li key={ligne} className="flex gap-3 leading-[1.6]">
              <Check aria-hidden="true" className="mt-1.5 size-3.5 shrink-0 text-methylene" />
              <span>{ligne}</span>
            </li>
          ))}
        </ul>

        <h4 className="etiquette mt-7">Preuves</h4>
        <dl className="mt-3 flex flex-col divide-y divide-trait rounded-xl border border-trait bg-plan">
          {projet.preuves.map(({ cle, valeur }) => (
            <div key={cle} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:gap-4">
              <dt className="etiquette shrink-0 sm:w-28 sm:pt-0.5">{cle}</dt>
              <dd className="donnee text-[0.8125rem] leading-snug text-carbone">{valeur}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Technologies de ${projet.nom}`}>
          {projet.pile.map((outil) => (
            <li key={outil} className="donnee rounded-md border border-trait px-2 py-0.5 text-[0.75rem] text-graphite">
              {outil}
            </li>
          ))}
        </ul>

        {projet.liens.length > 0 ? (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {projet.liens.map((lien) => (
              <a
                key={lien.href}
                href={lien.href}
                target="_blank"
                rel="noreferrer"
                className={`interface group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  lien.primaire
                    ? "bg-methylene text-papier hover:opacity-90"
                    : "border border-trait-fort hover:bg-plan-2"
                }`}
              >
                {lien.primaire ? "Ouvrir " : ""}
                {lien.libelle}
                <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only"> (nouvel onglet)</span>
              </a>
            ))}
          </div>
        ) : null}

        {projet.note ? (
          <p className="mt-5 flex gap-2.5 text-[0.9375rem] leading-snug text-graphite">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-ocre" />
            {projet.note}
          </p>
        ) : null}
      </div>
    </article>
  );
}
