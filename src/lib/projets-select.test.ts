import { describe, expect, it } from "vitest";
import type { Domaine, Projet } from "@/content/projects";
import {
  compterParDomaine,
  filtrerParDomaine,
  formaterNombre,
  indexVoisin,
  indicateurs,
} from "./projets-select";

type Mini = Pick<Projet, "domaines" | "tests" | "statut" | "liens"> & { slug: string };

function projet(slug: string, domaines: Domaine[], extra: Partial<Mini> = {}): Mini {
  return { slug, domaines, statut: "en cours", liens: [], ...extra };
}

const echantillon: Mini[] = [
  projet("a", ["full-stack", "data"], {
    tests: 10,
    statut: "en ligne",
    liens: [{ libelle: "site", href: "https://a.example" }],
  }),
  projet("b", ["devops"], { tests: 5 }),
  projet("c", ["data", "automatisation-ia"]),
];

describe("filtrerParDomaine", () => {
  it("renvoie tout, dans l'ordre éditorial, pour le filtre « tous »", () => {
    expect(filtrerParDomaine(echantillon, "tous").map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });

  it("ne garde que les projets qui déclarent le domaine", () => {
    expect(filtrerParDomaine(echantillon, "data").map((p) => p.slug)).toEqual(["a", "c"]);
  });

  it("renvoie une liste vide plutôt que d'échouer quand rien ne correspond", () => {
    expect(filtrerParDomaine([projet("x", ["devops"])], "data")).toEqual([]);
  });

  it("ne mute pas la source", () => {
    const source = [...echantillon];
    filtrerParDomaine(source, "tous").pop();
    expect(source).toHaveLength(3);
  });
});

describe("compterParDomaine", () => {
  it("compte chaque domaine et le total", () => {
    expect(compterParDomaine(echantillon)).toEqual({
      tous: 3,
      "full-stack": 1,
      devops: 1,
      data: 2,
      "automatisation-ia": 1,
    });
  });

  it("ne compte pas deux fois un domaine déclaré en double", () => {
    expect(compterParDomaine([projet("d", ["data", "data"])]).data).toBe(1);
  });
});

describe("indicateurs", () => {
  it("additionne les tests mesurés et compte les projets testés", () => {
    const r = indicateurs(echantillon);
    expect(r.tests).toBe(15);
    expect(r.projetsTestes).toBe(2);
    expect(r.total).toBe(3);
  });

  it("ignore un projet sans suite mesurée : pas de chiffre, pas de contribution", () => {
    expect(indicateurs([projet("e", ["data"], { tests: undefined })]).tests).toBe(0);
  });

  /**
   * Un projet n'est compté « en ligne » que si un visiteur peut l'ouvrir :
   * le statut seul ne suffit pas, il faut un lien https.
   */
  it("exige un statut en ligne ET un lien ouvrable", () => {
    const sansLien = projet("f", ["data"], { statut: "en ligne" });
    const horsLigne = projet("g", ["data"], {
      statut: "en cours",
      liens: [{ libelle: "x", href: "https://g.example" }],
    });
    expect(indicateurs([sansLien, horsLigne]).enLigne).toBe(0);
    expect(indicateurs(echantillon).enLigne).toBe(1);
  });
});

describe("indexVoisin", () => {
  it("avance et boucle à la fin", () => {
    expect(indexVoisin(0, 3, 1)).toBe(1);
    expect(indexVoisin(2, 3, 1)).toBe(0);
  });

  it("recule et boucle au début", () => {
    expect(indexVoisin(0, 3, -1)).toBe(2);
  });

  it("reste à zéro sur une galerie vide", () => {
    expect(indexVoisin(0, 0, 1)).toBe(0);
  });
});

describe("formaterNombre", () => {
  it("sépare les milliers à la française", () => {
    expect(formaterNombre(1234).replace(/\s/g, " ")).toBe("1 234");
  });
});
