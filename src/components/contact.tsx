import { ArrowUpRight, Download, Mail } from "lucide-react";
import { champsManquants, visible } from "@/content/completude";
import { profile } from "@/content/profile";
import { Monogramme } from "./en-tete";

/**
 * Clôture de la page : un appel clair, et tous les moyens de joindre.
 *
 * Les lignes dont la valeur n'est pas connue ne sont pas rendues (voir
 * `completude.ts`). La section s'adapte à ce qui est réellement renseigné,
 * sans jamais afficher de champ vide ni de valeur inventée.
 */
export function Contact() {
  const { disponibilite, contact } = profile;

  const fiche = [
    { cle: "Contrat", valeur: visible(disponibilite.contrat) },
    { cle: "Début", valeur: visible(disponibilite.debut) },
    { cle: "Rythme", valeur: visible(disponibilite.rythme) },
    { cle: "Lieu", valeur: visible(disponibilite.zone) },
    { cle: "Mobilité", valeur: visible(disponibilite.mobilite) },
    { cle: "Formation", valeur: visible(`${profile.formation.intitule} — ${profile.formation.ecole}`) },
  ].filter((ligne): ligne is { cle: string; valeur: string } => Boolean(ligne.valeur));

  const liens = [
    { libelle: "Site recruteur", href: visible(contact.siteRecruteur) },
    { libelle: "LinkedIn", href: visible(contact.linkedin) },
    { libelle: "GitHub", href: visible(contact.github) },
  ].flatMap((l) => (l.href ? [{ libelle: l.libelle, href: l.href }] : []));

  const sujet = encodeURIComponent("Alternance développeur full stack — prise de contact");

  return (
    <section id="contact" aria-labelledby="contact-titre" className="border-t border-trait py-20 sm:py-28">
      <div data-reveal className="carte halo relative overflow-hidden !rounded-3xl p-7 sm:p-12 lg:p-14">
        <p className="etiquette !text-methylene">Contact · réponse sous 24 h</p>
        <h2 id="contact-titre" className="titrage mt-4 max-w-3xl text-[2.2rem] sm:text-6xl">
          Une alternance dès novembre ? <span className="accent">Parlons-en.</span>
        </h2>
        <p className="prose-technique mt-5 text-lg leading-relaxed text-graphite">
          Je cherche une équipe où contribuer dès les premières semaines — produit web, API,
          infrastructure ou automatisation — et progresser vers l&apos;expertise, puis un CDI.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}?subject=${sujet}`}
            className="interface inline-flex max-w-full items-center gap-2.5 rounded-xl bg-methylene px-5 py-3.5 font-medium text-papier transition-opacity hover:opacity-90"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{contact.email}</span>
          </a>
          <a
            href={contact.cv}
            target="_blank"
            rel="noreferrer"
            className="interface inline-flex items-center gap-2.5 rounded-xl border border-trait-fort px-5 py-3.5 font-medium transition-colors hover:bg-plan-2"
          >
            <Download aria-hidden="true" className="size-4" />
            Télécharger le CV
            <span className="sr-only"> (PDF, nouvel onglet)</span>
          </a>
        </div>

        <div className="mt-12 grid gap-10 border-t border-trait pt-8 lg:grid-cols-12">
          <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:col-span-8">
            {fiche.map(({ cle, valeur }) => (
              <div key={cle}>
                <dt className="etiquette">{cle}</dt>
                <dd className="interface mt-1 leading-snug font-medium">{valeur}</dd>
              </div>
            ))}
          </dl>
          <ul className="flex flex-col gap-2 lg:col-span-4">
            {liens.map((lien) => (
              <li key={lien.href}>
                <a
                  href={lien.href}
                  target="_blank"
                  rel="noreferrer"
                  className="interface group flex items-center justify-between gap-3 rounded-xl border border-trait bg-papier/60 px-4 py-3 font-medium transition-colors hover:border-trait-fort"
                >
                  {lien.libelle}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-graphite transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AuditCompletude />
    </section>
  );
}

/**
 * Panneau d'audit — développement uniquement.
 *
 * Next.js élimine ce bloc du bundle de production : la condition porte sur
 * `process.env.NODE_ENV`, remplacé par une constante à la compilation.
 */
function AuditCompletude() {
  if (process.env.NODE_ENV === "production") return null;

  const manquants = champsManquants(profile);
  if (manquants.length === 0) return null;

  return (
    <aside className="mt-10 rounded-xl border border-dashed border-ocre/50 p-5">
      <p className="etiquette !text-ocre">
        Développement uniquement · {manquants.length} champ{manquants.length > 1 ? "s" : ""} à compléter
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="interface flex items-center gap-2.5 text-sm text-graphite">
          <Monogramme className="size-6" />
          {profile.nom} · {new Date().getFullYear()}
        </p>
        <p className="etiquette !tracking-[0.08em]">
          Next.js 16 · TypeScript · Tailwind CSS 4 · motion · données GitHub rendues côté serveur
        </p>
      </div>
    </footer>
  );
}
