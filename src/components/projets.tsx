import { projets, type Projet } from "@/content/projects";
import { Etat, Panneau, Point } from "./panneau";

export function Projets() {
  const vedettes = projets.filter((p) => p.vedette);
  const autres = projets.filter((p) => !p.vedette);

  return (
    <Panneau
      id="projets"
      titre="Ce que j'ai construit"
      etiquette={
        <>
          <span>{projets.length} projets retenus</span>
          <Point />
          <span>chaque affirmation est vérifiable dans le dépôt</span>
        </>
      }
    >
      <div className="flex flex-col">
        {vedettes.map((projet, i) => (
          <CarteVedette key={projet.slug} projet={projet} rang={i} />
        ))}
      </div>

      <div className="mt-14 grid gap-px border border-trait bg-trait sm:grid-cols-2">
        {autres.map((projet) => (
          <CarteBreve key={projet.slug} projet={projet} />
        ))}
      </div>
    </Panneau>
  );
}

function CarteVedette({ projet, rang }: { projet: Projet; rang: number }) {
  return (
    <article
      data-reveal
      data-reveal-retard={rang * 60}
      className="grid gap-8 border-t border-trait py-10 first:border-t-0 first:pt-0 sm:py-14 lg:grid-cols-12 lg:gap-10"
    >
      <div className="lg:col-span-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="titrage text-2xl sm:text-[1.75rem]">{projet.nom}</h3>
          <Etat valeur={projet.statut} />
        </div>

        <dl className="mt-6 flex flex-col gap-2.5">
          {projet.faits.map(({ cle, valeur }) => (
            <div key={cle} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
              <dt className="etiquette shrink-0 sm:w-[9.5rem] sm:pt-0.5">{cle}</dt>
              <dd className="donnee text-[0.8125rem] leading-snug text-carbone">{valeur}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
          {projet.liens.map((lien) => (
            <a
              key={lien.href}
              href={lien.href}
              target="_blank"
              rel="noreferrer"
              className={`donnee inline-flex items-center gap-2 text-[0.8125rem] ${
                lien.primaire ? "text-methylene" : "text-graphite"
              }`}
            >
              <span className="lien">{lien.libelle}</span>
              <span aria-hidden="true" className="text-[0.6875rem]">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="lg:col-span-8">
        <p className="text-[1.1875rem] leading-[1.55] text-carbone sm:text-[1.3125rem]">
          {projet.resume}
        </p>
        <p className="mt-5 max-w-[62ch] leading-[1.72] text-graphite">{projet.detail}</p>
        <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
          {projet.pile.map((outil) => (
            <li
              key={outil}
              className="donnee border border-trait px-2 py-1 text-[0.75rem] text-graphite"
            >
              {outil}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CarteBreve({ projet }: { projet: Projet }) {
  const principal = projet.liens.find((l) => l.primaire) ?? projet.liens[0];

  return (
    <article data-reveal className="flex flex-col bg-papier p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="titrage text-xl">{projet.nom}</h3>
        <Etat valeur={projet.statut} />
      </div>

      <p className="mt-4 leading-relaxed text-graphite">{projet.resume}</p>

      <dl className="mt-5 flex flex-col gap-1.5">
        {projet.faits.map(({ cle, valeur }) => (
          <div key={cle} className="flex flex-wrap gap-x-3">
            <dt className="etiquette w-[8.5rem] shrink-0 pt-0.5">{cle}</dt>
            <dd className="donnee text-[0.8125rem] text-carbone">{valeur}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {projet.pile.map((outil) => (
          <li key={outil} className="donnee text-[0.75rem] text-graphite">
            {outil}
          </li>
        ))}
      </ul>

      {principal ? (
        <a
          href={principal.href}
          target="_blank"
          rel="noreferrer"
          className="donnee mt-auto inline-flex items-center gap-2 pt-7 text-[0.8125rem] text-methylene"
        >
          <span className="lien">{principal.libelle}</span>
          <span aria-hidden="true" className="text-[0.6875rem]">
            ↗
          </span>
        </a>
      ) : null}
    </article>
  );
}
