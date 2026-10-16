import { describe, expect, it } from "vitest";
import {
  agregerLangages,
  construireCalendrier,
  selectionnerDepots,
  tempsRelatif,
  type DepotBrut,
} from "./github-select";

function depot(partiel: Partial<DepotBrut> & { name: string }): DepotBrut {
  return {
    description: null,
    url: `https://github.com/x/${partiel.name}`,
    homepageUrl: null,
    isArchived: false,
    isFork: false,
    pushedAt: "2026-07-01T00:00:00Z",
    stargazerCount: 0,
    primaryLanguage: null,
    languages: { edges: [] },
    ...partiel,
  };
}

const lang = (name: string, size: number) => ({ size, node: { name, color: "#000" } });

describe("selectionnerDepots", () => {
  it("écarte les forks et les dépôts archivés", () => {
    const resultat = selectionnerDepots(
      [
        depot({ name: "vrai", description: "un vrai projet" }),
        depot({ name: "fork", description: "copié", isFork: true }),
        depot({ name: "vieux", description: "rangé", isArchived: true }),
      ],
      { limite: 10 },
    );

    expect(resultat.map((d) => d.nom)).toEqual(["vrai"]);
  });

  it("écarte les dépôts vides : ni description, ni langage, ni étoile", () => {
    const resultat = selectionnerDepots(
      [
        depot({ name: "coquille-vide" }),
        depot({ name: "decrit", description: "il a une description" }),
        depot({ name: "code", primaryLanguage: { name: "Rust", color: "#dea584" } }),
      ],
      { limite: 10 },
    );

    expect(resultat.map((d) => d.nom).sort()).toEqual(["code", "decrit"]);
  });

  it("trie du plus récemment poussé au plus ancien", () => {
    const resultat = selectionnerDepots(
      [
        depot({ name: "b", description: "x", pushedAt: "2026-01-01T00:00:00Z" }),
        depot({ name: "a", description: "x", pushedAt: "2026-07-01T00:00:00Z" }),
        depot({ name: "c", description: "x", pushedAt: "2025-01-01T00:00:00Z" }),
      ],
      { limite: 10 },
    );

    expect(resultat.map((d) => d.nom)).toEqual(["a", "b", "c"]);
  });

  it("respecte la limite demandée", () => {
    const depots = Array.from({ length: 20 }, (_, i) =>
      depot({ name: `p${i}`, description: "x" }),
    );

    expect(selectionnerDepots(depots, { limite: 6 })).toHaveLength(6);
  });

  it("exclut les dépôts déjà présentés en vedette pour ne pas les répéter", () => {
    const resultat = selectionnerDepots(
      [depot({ name: "aiguillage", description: "x" }), depot({ name: "autre", description: "x" })],
      { limite: 10, exclure: ["aiguillage"] },
    );

    expect(resultat.map((d) => d.nom)).toEqual(["autre"]);
  });

  it("compare les noms exclus sans tenir compte de la casse", () => {
    const resultat = selectionnerDepots([depot({ name: "ZenFlow", description: "x" })], {
      limite: 10,
      exclure: ["zenflow"],
    });

    expect(resultat).toEqual([]);
  });
});

describe("agregerLangages", () => {
  it("additionne les octets d'un même langage à travers les dépôts", () => {
    const resultat = agregerLangages([
      depot({ name: "a", description: "x", languages: { edges: [lang("TypeScript", 100)] } }),
      depot({ name: "b", description: "x", languages: { edges: [lang("TypeScript", 300)] } }),
    ]);

    expect(resultat[0]).toMatchObject({ nom: "TypeScript", octets: 400, depots: 2 });
  });

  it("classe par volume décroissant et calcule une part qui somme à 100", () => {
    const resultat = agregerLangages([
      depot({
        name: "a",
        description: "x",
        languages: { edges: [lang("Python", 250), lang("Go", 750)] },
      }),
    ]);

    expect(resultat.map((l) => l.nom)).toEqual(["Go", "Python"]);
    expect(resultat.map((l) => l.part)).toEqual([75, 25]);
  });

  it("ignore les forks et les archives, comme la sélection de dépôts", () => {
    const resultat = agregerLangages([
      depot({ name: "a", description: "x", languages: { edges: [lang("Rust", 100)] } }),
      depot({ name: "f", isFork: true, languages: { edges: [lang("Java", 9999)] } }),
    ]);

    expect(resultat.map((l) => l.nom)).toEqual(["Rust"]);
  });

  it("renvoie une liste vide plutôt que de diviser par zéro", () => {
    expect(agregerLangages([])).toEqual([]);
  });
});

describe("construireCalendrier", () => {
  const semaine = (comptes: number[]) => ({
    contributionDays: comptes.map((c, i) => ({
      date: `2026-01-0${i + 1}`,
      contributionCount: c,
    })),
  });

  it("aplatit les semaines en une suite de jours", () => {
    const resultat = construireCalendrier([semaine([0, 1]), semaine([2, 3])]);
    expect(resultat.jours.map((j) => j.compte)).toEqual([0, 1, 2, 3]);
  });

  it("attribue le niveau 0 à un jour sans contribution", () => {
    const resultat = construireCalendrier([semaine([0, 4])]);
    expect(resultat.jours[0].niveau).toBe(0);
  });

  it("répartit les jours actifs sur quatre niveaux jusqu'au maximum", () => {
    const resultat = construireCalendrier([semaine([1, 4, 8, 12])]);
    expect(resultat.jours.map((j) => j.niveau)).toEqual([1, 2, 3, 4]);
    expect(resultat.max).toBe(12);
  });

  it("survit à un calendrier vide", () => {
    expect(construireCalendrier([])).toEqual({ jours: [], max: 0, semaines: 0 });
  });
});

describe("tempsRelatif", () => {
  const maintenant = new Date("2026-08-01T12:00:00Z");

  it("dit « à l'instant » sous une minute", () => {
    expect(tempsRelatif("2026-08-01T11:59:30Z", maintenant)).toBe("à l'instant");
  });

  it("compte en heures dans la journée", () => {
    expect(tempsRelatif("2026-08-01T09:00:00Z", maintenant)).toBe("il y a 3 h");
  });

  it("compte en jours au-delà de 24 h", () => {
    expect(tempsRelatif("2026-07-29T12:00:00Z", maintenant)).toBe("il y a 3 j");
  });

  it("bascule en mois puis en années", () => {
    expect(tempsRelatif("2026-05-01T12:00:00Z", maintenant)).toBe("il y a 3 mois");
    expect(tempsRelatif("2024-08-01T12:00:00Z", maintenant)).toBe("il y a 2 ans");
  });

  it("gère le singulier", () => {
    expect(tempsRelatif("2026-07-31T12:00:00Z", maintenant)).toBe("il y a 1 j");
    expect(tempsRelatif("2025-08-01T12:00:00Z", maintenant)).toBe("il y a 1 an");
  });
});
