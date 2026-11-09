import { ArrowDown, ArrowUpRight, CalendarDays, Download, MapPin } from "lucide-react";
import { aideEmbauche, profile } from "@/content/profile";
import { projets } from "@/content/projects";
import type { Instantane } from "@/lib/github";
import { tempsRelatif } from "@/lib/github-select";
import { formaterNombre, indicateurs } from "@/lib/projets-select";
import { SchemaLivraison } from "./schema-livraison";

/**
 * Le haut de page répond en quatre secondes aux trois questions d'un
 * recruteur : qui, pour faire quoi, disponible quand. Les chiffres qui
 * suivent sont soit calculés depuis les fiches projet, soit lus en direct
 * sur GitHub — aucun n'est saisi à la main.
 */
export function Hero({ instantane }: { instantane: Instantane }) {
  const chiffres = indicateurs(projets);
  const tests = formaterNombre(chiffres.tests);

  return (
    <section id="haut" aria-labelledby="hero-titre" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
      <p className="lever interface inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-trait-fort bg-plan/70 px-3 py-1.5 text-[0.8125rem] text-graphite">
        <span aria-hidden="true" className="pulsation inline-block size-1.5 rounded-full bg-libre" />
        <span className="font-medium text-carbone">Disponible en alternance</span>
        <span aria-hidden="true">·</span>
        <span>dès {profile.disponibilite.debut.toLowerCase()}</span>
      </p>

      <h1
        id="hero-titre"
        className="titrage mt-7 max-w-5xl text-[clamp(2.4rem,7.4vw,5.6rem)]"
      >
        Full stack, DevOps et data.{" "}
        <span className="accent">Des systèmes qui tournent</span> en production.
      </h1>

      <p
        className="prose-technique mt-7 text-[1.125rem] leading-[1.7] text-graphite sm:text-[1.25rem]"
      >
        Je suis Raoul Bonsso, en Mastère Développement Full Stack &amp; DevOps à Sup de Vinci
        (Nantes). Je conçois, je teste et je mets en production des applications web, des API et
        des automatisations IA pour les PME — et je cherche l&apos;équipe où le faire en
        alternance, puis en CDI.
      </p>

      <div
        className="lever mt-9 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "340ms" }}
      >
        <a
          href={profile.contact.cv}
          target="_blank"
          rel="noreferrer"
          className="interface group inline-flex items-center gap-2 rounded-xl bg-carbone px-5 py-3 font-medium text-papier transition-opacity hover:opacity-85"
        >
          <Download aria-hidden="true" className="size-4" />
          Télécharger le CV
          <span className="sr-only"> (PDF, nouvel onglet)</span>
        </a>
        <a
          href={profile.contact.siteRecruteur}
          target="_blank"
          rel="noreferrer"
          className="interface group inline-flex items-center gap-2 rounded-xl border border-trait-fort px-5 py-3 font-medium transition-colors hover:bg-plan-2"
        >
          Site recruteur
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
        <a
          href="#projets"
          className="interface group inline-flex items-center gap-2 rounded-xl px-3 py-3 font-medium text-graphite transition-colors hover:text-carbone"
        >
          Voir les projets
          <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
        </a>
      </div>

      <Disponibilite />

      <div
        className="lever carte grille-points mt-12 p-3 sm:mt-16 sm:p-7"
        style={{ animationDelay: "520ms" }}
      >
        <SchemaLivraison tests={tests} />
      </div>

      <Bandeau instantane={instantane} chiffres={chiffres} tests={tests} />
    </section>
  );
}

/** La fiche pratique d'une alternance : ce qu'un service RH cherche d'abord. */
function Disponibilite() {
  const { disponibilite } = profile;
  const lignes = [
    { Icone: CalendarDays, cle: "Début", valeur: `${disponibilite.debut} · ${disponibilite.contrat.toLowerCase()}` },
    { Icone: CalendarDays, cle: "Rythme", valeur: disponibilite.rythme },
    { Icone: MapPin, cle: "Lieu", valeur: disponibilite.zone },
  ];

  return (
    <div className="lever mt-10 max-w-3xl" style={{ animationDelay: "420ms" }}>
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-trait bg-trait sm:grid-cols-3">
        {lignes.map(({ Icone, cle, valeur }) => (
          <div key={cle} className="relative bg-plan py-3.5 pr-4 pl-11">
            <Icone aria-hidden="true" className="absolute top-4 left-4 size-4 text-methylene" />
            <dt className="etiquette">{cle}</dt>
            <dd className="interface mt-1 text-[0.9375rem] leading-snug font-medium">{valeur}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">{aideEmbauche}</p>
    </div>
  );
}

/**
 * Deux familles de chiffres, et la source de chacune est écrite :
 * ceux des fiches projet (tests relevés en exécutant chaque suite) et ceux
 * de GitHub (lus en direct, revalidés toutes les heures).
 */
function Bandeau({
  instantane,
  chiffres,
  tests,
}: {
  instantane: Instantane;
  chiffres: ReturnType<typeof indicateurs>;
  tests: string;
}) {
  const projetsMesures = [
    { valeur: tests, unite: "tests automatisés", precision: `sur ${chiffres.projetsTestes} projets, suites exécutées` },
    { valeur: String(chiffres.enLigne), unite: "démos en ligne", precision: "à ouvrir dans un onglet" },
  ];
  const github = [
    { valeur: instantane.contributionsAnnee, unite: "contributions", precision: "12 derniers mois" },
    { valeur: instantane.depotsPublics, unite: "dépôts publics", precision: "sur le compte" },
  ];

  return (
    <div className="lever mt-12 sm:mt-16" style={{ animationDelay: "640ms" }}>
      <dl className="grid grid-cols-2 border-t border-trait lg:grid-cols-4">
        {[...projetsMesures, ...github.map((g) => ({ ...g, valeur: instantane.direct ? String(g.valeur) : "—" }))].map(
          ({ valeur, unite, precision }, i) => (
            <div
              key={unite}
              className={`border-b border-trait py-5 sm:py-6 ${i % 2 === 1 ? "border-l pl-4 sm:pl-6" : "pr-2"} ${
                i === 2 ? "lg:border-l lg:pl-6" : ""
              }`}
            >
              <dt className="sr-only">{unite}</dt>
              <dd className="donnee text-3xl leading-none font-medium sm:text-[2.6rem]">{valeur}</dd>
              <dd className="mt-2.5">
                <span className="interface block text-[0.9375rem] leading-snug">{unite}</span>
                <span className="etiquette mt-1 block !text-[0.625rem] !tracking-[0.1em]">{precision}</span>
              </dd>
            </div>
          ),
        )}
      </dl>
      <p className="etiquette mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 !tracking-[0.1em]">
        <span>Tests relevés le 13 octobre 2026</span>
        <span aria-hidden="true">·</span>
        {instantane.direct ? (
          <>
            <span aria-hidden="true" className="pulsation inline-block size-1.5 rounded-full bg-libre" />
            <span>GitHub en direct, relevé {tempsRelatif(instantane.recupereLe)}</span>
          </>
        ) : (
          <>
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-ocre" />
            <span>Flux GitHub momentanément indisponible</span>
          </>
        )}
      </p>
    </div>
  );
}
