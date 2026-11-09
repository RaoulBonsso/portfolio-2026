import { principes } from "@/content/profile";
import { Panneau, Point } from "./panneau";

/**
 * Les principes de travail. Chacun porte le nom du projet qui le prouve :
 * sans preuve rattachée, une affirmation de méthode ne vaut pas mieux
 * qu'une ligne de « qualités personnelles ».
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
          <span>chacun adossé à un projet de cette page</span>
        </>
      }
      chapeau={
        <p>
          Ce ne sont pas des intentions : chacune de ces règles est visible dans le code d&apos;un
          projet présenté plus haut, et se défend en entretien, fichier ouvert.
        </p>
      }
    >
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-trait bg-trait sm:grid-cols-2 lg:grid-cols-3">
        {principes.map((principe, i) => (
          <li key={principe.titre} data-reveal data-reveal-retard={(i % 3) * 70} className="flex flex-col bg-plan p-6 sm:p-7">
            <span className="donnee text-[0.75rem] text-methylene">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="titrage mt-3 text-xl">{principe.titre}</h3>
            <p className="mt-3 leading-[1.7] text-graphite">{principe.texte}</p>
            <p className="etiquette mt-auto pt-6">
              Preuve — <span className="text-carbone">{principe.preuve}</span>
            </p>
          </li>
        ))}
      </ol>
    </Panneau>
  );
}
