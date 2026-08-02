import { champsManquants, visible } from "@/content/completude";
import { profile } from "@/content/profile";
import { Panneau, Point } from "./panneau";

/**
 * Clôture de la page : ce qu'il cherche, et comment le joindre.
 *
 * Les lignes dont la valeur n'est pas connue ne sont pas rendues (voir
 * `completude.ts`). La section s'adapte donc à ce qui est réellement
 * renseigné, sans jamais afficher de champ vide ni de valeur inventée.
 */
export function Contact() {
  const formation = [visible(profile.formation.intitule), visible(profile.formation.specialite)]
    .filter(Boolean)
    .join(" — ");

  const dispo = [
    { cle: "Rythme", valeur: visible(profile.disponibilite.rythme) },
    { cle: "Début", valeur: visible(profile.disponibilite.debut) },
    { cle: "Zone", valeur: visible(profile.disponibilite.zone) },
    { cle: "Formation", valeur: formation || null },
    { cle: "Période", valeur: visible(profile.formation.periode) },
  ].filter((ligne): ligne is { cle: string; valeur: string } => Boolean(ligne.valeur));

  const liens: { libelle: string; href: string; primaire?: boolean }[] = (
    [
      { libelle: profile.contact.email, href: `mailto:${profile.contact.email}`, primaire: true },
      { libelle: "github.com/RaoulBonsso", href: profile.contact.github },
      { libelle: "LinkedIn", href: visible(profile.contact.linkedin) },
      { libelle: "Curriculum vitæ", href: visible(profile.contact.cv) },
    ] as { libelle: string; href: string | null; primaire?: boolean }[]
  ).flatMap((lien) => (lien.href ? [{ ...lien, href: lien.href }] : []));

  return (
    <Panneau
      id="contact"
      titre="Parlons-en"
      etiquette={
        <>
          <span>{profile.recherche}</span>
          <Point />
          <span>réponse sous 24 h</span>
        </>
      }
      chapeau={
        <p>
          Je cherche une alternance en développement full-stack. Le plus simple pour se faire une
          idée : ouvrir un dépôt et lire le code — tout ce qui est cité sur cette page est public,
          sauf mention contraire.
        </p>
      }
    >
      <div data-reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ul className="flex flex-col gap-3">
            {liens.map((lien) => (
              <li key={lien.libelle}>
                <a
                  href={lien.href}
                  {...(lien.href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noreferrer" })}
                  className={`donnee inline-flex items-baseline gap-2.5 ${
                    lien.primaire ? "text-[1.25rem] text-carbone sm:text-[1.5rem]" : "text-graphite"
                  }`}
                >
                  <span className="lien">{lien.libelle}</span>
                  <span aria-hidden="true" className="text-[0.6875rem]">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {dispo.length > 0 ? (
          <dl className="flex flex-col gap-2.5 border-t border-trait pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0">
            {dispo.map(({ cle, valeur }) => (
              <div key={cle} className="flex flex-wrap gap-x-4">
                <dt className="etiquette w-24 shrink-0 pt-0.5">{cle}</dt>
                <dd className="donnee text-[0.875rem] text-carbone">{valeur}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      <AuditCompletude />
    </Panneau>
  );
}

/**
 * Panneau d'audit — développement uniquement.
 *
 * Next.js élimine ce bloc du bundle de production : la condition porte sur
 * `process.env.NODE_ENV`, remplacé par une constante à la compilation. Le
 * texte des champs manquants ne part donc jamais chez le visiteur.
 */
function AuditCompletude() {
  if (process.env.NODE_ENV === "production") return null;

  const manquants = champsManquants(profile);
  if (manquants.length === 0) return null;

  return (
    <aside className="mt-14 border border-dashed border-ocre/50 p-5">
      <p className="etiquette !text-ocre">
        Développement uniquement · {manquants.length} champs à compléter
      </p>
      <p className="mt-2 text-[0.9375rem] text-graphite">
        Ces champs sont masqués en production plutôt qu&apos;inventés. Renseigne-les dans{" "}
        <code className="donnee text-[0.8125rem] text-carbone">src/content/profile.ts</code>.
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {manquants.map((chemin) => (
          <li key={chemin} className="donnee text-[0.8125rem] text-ocre">
            {chemin}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function PiedDePage() {
  return (
    <footer className="border-t border-trait py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <p className="etiquette">
          {profile.nom} · {new Date().getFullYear()}
        </p>
        <p className="etiquette !tracking-normal">
          Next.js · TypeScript · Tailwind v4 · données GitHub en direct, rendues côté serveur
        </p>
      </div>
    </footer>
  );
}
