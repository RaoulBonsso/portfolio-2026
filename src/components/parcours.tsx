import { Briefcase, GraduationCap, Languages } from "lucide-react";
import { experiences, formations, langues } from "@/content/parcours";
import { Panneau, Point } from "./panneau";

/**
 * Expériences en entreprise, formulées en apport et en résultat.
 * Les résultats chiffrés sont ceux du CV : ils ne se vérifient pas dans un
 * dépôt public, et l'étiquette de section le dit plutôt que de le taire.
 */
export function Parcours() {
  return (
    <Panneau
      id="parcours"
      titre={
        <>
          En entreprise, <span className="accent">ce que j&apos;ai apporté</span>.
        </>
      }
      etiquette={
        <>
          <span>{experiences.length} expériences</span>
          <Point />
          <span>résultats tels que déclarés sur mon CV</span>
        </>
      }
    >
      <ol className="relative flex flex-col gap-5">
        {experiences.map((xp, i) => (
          <li key={`${xp.entreprise}-${xp.debut}`} data-reveal data-reveal-retard={i * 70} className="carte grid gap-6 p-6 sm:p-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="donnee text-[0.8125rem] text-methylene">{xp.periode}</p>
              <h3 className="titrage mt-2 text-2xl">{xp.poste}</h3>
              <p className="interface mt-1.5 flex items-center gap-2 text-graphite">
                <Briefcase aria-hidden="true" className="size-4" />
                {xp.entreprise}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Environnement — ${xp.entreprise}`}>
                {xp.pile.map((outil) => (
                  <li key={outil} className="donnee rounded-md border border-trait px-2 py-0.5 text-[0.75rem] text-graphite">
                    {outil}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[1.0625rem] leading-relaxed">{xp.contexte}</p>
              <ul className="mt-5 flex flex-col gap-3">
                {xp.apports.map((apport) => (
                  <li
                    key={apport.texte}
                    className="flex flex-col gap-2 rounded-xl border border-trait bg-papier px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="leading-snug text-graphite">{apport.texte}</span>
                    {apport.resultat ? (
                      <span className="donnee shrink-0 rounded-md bg-methylene-doux px-2.5 py-1 text-[0.8125rem] font-medium text-methylene sm:text-right">
                        {apport.resultat}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-8">
          <h3 className="etiquette mb-5 flex items-center gap-2">
            <GraduationCap aria-hidden="true" className="size-4" />
            Formation
          </h3>
          <ul className="border-t border-trait">
            {formations.map((f) => (
              <li key={f.diplome} className="grid gap-1 border-b border-trait py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                <span className="donnee pt-1 text-[0.8125rem] text-methylene">{f.periode}</span>
                <span>
                  <span className="titrage block text-xl">{f.diplome}</span>
                  <span className="interface mt-1 block text-graphite">{f.ecole}</span>
                  {f.detail ? <span className="mt-2 block leading-relaxed text-graphite">{f.detail}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal data-reveal-retard={80} className="lg:col-span-4">
          <h3 className="etiquette mb-5 flex items-center gap-2">
            <Languages aria-hidden="true" className="size-4" />
            Langues
          </h3>
          <ul className="border-t border-trait">
            {langues.map((l) => (
              <li key={l.langue} className="border-b border-trait py-5">
                <span className="titrage block text-xl">{l.langue}</span>
                <span className="mt-1 block text-graphite">{l.niveau}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panneau>
  );
}
