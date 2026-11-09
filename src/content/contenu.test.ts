import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { experiences, trierParRecence } from "./parcours";
import { axes, profile } from "./profile";
import { A_COMPLETER } from "./profile";
import { autresProjets, projets } from "./projects";

/**
 * Cohérence du contenu. Ces tests protègent le parti pris de la page :
 * rien d'annoncé qui ne soit vérifiable, rien de vérifiable qui manque.
 */

const PUBLIC = join(process.cwd(), "public");

describe("projets", () => {
  it("ont des identifiants uniques", () => {
    const slugs = projets.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("montrent chacun deux ou trois captures, ou à défaut un schéma de fonctionnement", () => {
    for (const p of projets) {
      if (p.captures.length === 0) {
        expect(p.schema, `${p.slug} : ni capture ni schéma`).toBeDefined();
      } else {
        expect(p.captures.length, p.slug).toBeGreaterThanOrEqual(2);
        expect(p.captures.length, p.slug).toBeLessThanOrEqual(3);
      }
    }
  });

  it("pointent vers des captures qui existent, en webp de moins de 200 Ko", () => {
    for (const { src } of projets.flatMap((p) => p.captures)) {
      const fichier = join(PUBLIC, src);
      expect(existsSync(fichier), src).toBe(true);
      expect(src.endsWith(".webp"), src).toBe(true);
      expect(statSync(fichier).size, src).toBeLessThan(200 * 1024);
    }
  });

  it("décrivent chaque capture pour les lecteurs d'écran", () => {
    for (const c of projets.flatMap((p) => p.captures)) {
      expect(c.alt.trim().length, c.src).toBeGreaterThan(15);
    }
  });

  it("n'annoncent « en ligne » qu'avec un lien https", () => {
    for (const p of projets.filter((p) => p.statut === "en ligne")) {
      expect(p.liens.some((l) => l.href.startsWith("https://")), p.slug).toBe(true);
    }
  });

  /**
   * Un visiteur doit savoir pourquoi il ne trouve ni code ni démo :
   * un projet privé sans lien public porte une note qui l'explique.
   */
  it("expliquent l'absence de lien public par une note", () => {
    for (const p of projets.filter((p) => p.liens.length === 0)) {
      expect(p.note, p.slug).toBeTruthy();
      expect(p.code, p.slug).toBe("privé");
    }
  });

  it("ne mentionnent un lien vers le code que si le dépôt est public", () => {
    for (const p of projets.filter((p) => p.code === "privé")) {
      expect(p.liens.some((l) => l.href.includes("github.com")), p.slug).toBe(false);
    }
  });

  it("ne laissent passer aucun marqueur à compléter", () => {
    const texte = JSON.stringify([projets, autresProjets, experiences]);
    expect(texte).not.toContain(A_COMPLETER);
  });

  it("annoncent un nombre de tests identique à celui de leur fiche", () => {
    for (const p of projets.filter((p) => p.tests)) {
      const ligne = p.preuves.find((x) => x.cle === "Tests");
      expect(ligne?.valeur.startsWith(String(p.tests)), p.slug).toBe(true);
    }
  });
});

describe("axes du positionnement", () => {
  it("s'appuient chacun sur des projets réellement présentés", () => {
    const noms = new Set(projets.map((p) => p.nom));
    for (const axe of axes) {
      for (const preuve of axe.preuves) expect(noms.has(preuve), `${axe.id} → ${preuve}`).toBe(true);
    }
  });
});

describe("parcours", () => {
  it("est déjà ordonné du plus récent au plus ancien", () => {
    expect(trierParRecence(experiences)).toEqual(experiences);
  });

  it("trierParRecence ne mute pas la source", () => {
    const source = [{ debut: "2023-01" }, { debut: "2025-01" }];
    trierParRecence(source);
    expect(source[0].debut).toBe("2023-01");
  });
});

describe("profil", () => {
  it("expose des liens de contact absolus", () => {
    expect(profile.contact.cv).toMatch(/^https:\/\/.+\.pdf$/);
    expect(profile.contact.siteRecruteur).toMatch(/^https:\/\//);
  });
});
