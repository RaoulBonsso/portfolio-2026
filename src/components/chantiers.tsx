import { chantiers } from "@/content/projects";
import { Panneau, Point } from "./panneau";

/**
 * Bibliothèques écrites de zéro pour comprendre un mécanisme de l'intérieur.
 *
 * Elles ne sont pas publiées : c'est écrit noir sur blanc plutôt que suggéré
 * par un lien absent. Annoncer un dépôt qu'un recruteur ne peut pas ouvrir
 * serait pire que de ne rien annoncer.
 */
export function Chantiers() {
  return (
    <Panneau
      id="chantiers"
      titre="Ce que j'écris pour comprendre"
      etiquette={
        <>
          <span>{chantiers.length} bibliothèques</span>
          <Point />
          <span>zéro dépendance runtime</span>
          <Point />
          <span>dépôts locaux, non publiés</span>
        </>
      }
      chapeau={
        <p>
          Trois briques écrites à la main, sans framework, pour voir ce qu&apos;il y a sous les
          abstractions qu&apos;on utilise tous les jours : un moteur de stockage, une file de tâches,
          un petit langage. Elles vivent en local et ne sont pas encore publiées — je les présente
          volontiers en entretien, code à l&apos;écran.
        </p>
      }
    >
      <ul className="border-t border-trait">
        {chantiers.map((chantier, i) => (
          <li
            key={chantier.nom}
            data-reveal
            data-reveal-retard={i * 60}
            className="grid gap-2 border-b border-trait py-6 sm:grid-cols-12 sm:gap-6"
          >
            <div className="sm:col-span-3">
              <h3 className="donnee text-[0.9375rem] text-carbone">{chantier.nom}</h3>
              <p className="etiquette mt-1.5">{chantier.langage}</p>
            </div>
            <div className="sm:col-span-9">
              <p className="text-[1.0625rem] leading-snug text-carbone">{chantier.description}</p>
              <p className="mt-2 max-w-[62ch] leading-relaxed text-graphite">{chantier.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panneau>
  );
}
