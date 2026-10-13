import { Bot, Database, Layers, Server, type LucideIcon } from "lucide-react";
import { axes, type Axe } from "@/content/profile";
import { projets } from "@/content/projects";
import { Panneau, Point } from "./panneau";

const ICONES: Record<Axe["id"], LucideIcon> = {
  "full-stack": Layers,
  devops: Server,
  data: Database,
  "automatisation-ia": Bot,
};

const ANCRES = new Map(projets.map((p) => [p.nom, p.slug]));

/**
 * Le positionnement en quatre axes. Chaque carte se termine par les projets
 * qui la prouvent, liés à leur fiche : une compétence sans preuve n'est
 * qu'un mot-clé.
 */
export function Axes() {
  return (
    <Panneau
      id="competences"
      titre="Quatre métiers, une même exigence"
      etiquette={
        <>
          <span>Compétences</span>
          <Point />
          <span>chaque axe renvoie aux projets qui le prouvent</span>
        </>
      }
      chapeau={
        <p>
          Je ne choisis pas entre le code, l&apos;infrastructure et la donnée : un logiciel utile
          pour une PME a besoin des trois, et de plus en plus d&apos;automatisation autour.
        </p>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {axes.map((axe, i) => {
          const Icone = ICONES[axe.id];
          return (
            <li key={axe.id} data-reveal data-reveal-retard={i * 70} className="carte flex flex-col p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-methylene-doux text-methylene">
                  <Icone aria-hidden="true" className="size-5" />
                </span>
                <h3 className="titrage text-xl sm:text-2xl">{axe.titre}</h3>
              </div>
              <p className="mt-4 leading-relaxed text-graphite">{axe.texte}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Outils — ${axe.titre}`}>
                {axe.outils.map((outil) => (
                  <li
                    key={outil}
                    className="donnee rounded-md border border-trait bg-papier px-2 py-0.5 text-[0.75rem] text-graphite"
                  >
                    {outil}
                  </li>
                ))}
              </ul>
              <p className="interface mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-6 text-sm">
                <span className="etiquette">Preuves</span>
                {axe.preuves.map((nom, j) => (
                  <span key={nom} className="inline-flex items-center gap-2">
                    {j > 0 ? <span aria-hidden="true" className="text-graphite">·</span> : null}
                    <a href={`#projet-${ANCRES.get(nom)}`} className="font-medium text-methylene">
                      <span className="lien">{nom}</span>
                    </a>
                  </span>
                ))}
              </p>
            </li>
          );
        })}
      </ul>
    </Panneau>
  );
}
