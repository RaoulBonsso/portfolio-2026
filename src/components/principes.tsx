import { principes } from "@/content/profile";
import { Panneau, Point } from "./panneau";

/**
 * Les principes de travail.
 *
 * Chaque principe porte le nom du projet qui le prouve. C'est la contrainte
 * qui rend la section défendable : sans preuve rattachée, une affirmation
 * de méthode ne vaut pas mieux qu'une ligne de « qualités personnelles ».
 */
export function Principes() {
  return (
    <Panneau
      id="methode"
      titre="Comment je travaille"
      etiquette={
        <>
          <span>{principes.length} principes</span>
          <Point />
          <span>chacun adossé à une preuve dans un dépôt</span>
        </>
      }
      chapeau={
        <p>
          Ces quatre lignes ne sont pas des intentions : chacune est visible dans le code d&apos;un
          projet listé plus haut, et se vérifie en ouvrant le dépôt.
        </p>
      }
    >
      <ol className="grid gap-px border border-trait bg-trait sm:grid-cols-2">
        {principes.map((principe, i) => (
          <li
            key={principe.titre}
            data-reveal
            data-reveal-retard={i * 60}
            className="flex flex-col bg-papier p-6 sm:p-8"
          >
            <span className="donnee text-[0.75rem] text-trait-fort">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="titrage mt-3 text-xl">{principe.titre}</h3>
            <p className="mt-3.5 leading-[1.7] text-graphite">{principe.texte}</p>
            <p className="etiquette mt-auto pt-6">
              <span className="text-trait-fort">Preuve — </span>
              {principe.preuve}
            </p>
          </li>
        ))}
      </ol>
    </Panneau>
  );
}
