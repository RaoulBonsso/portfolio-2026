import { describe, expect, it } from "vitest";
import { A_COMPLETER } from "./profile";
import { champsManquants, estRempli, visible } from "./completude";

describe("estRempli", () => {
  it("reconnaît une vraie valeur", () => {
    expect(estRempli("Master 1 — SUP de VINCI")).toBe(true);
  });

  it("rejette le marqueur de champ à compléter", () => {
    expect(estRempli(A_COMPLETER)).toBe(false);
  });

  it("rejette une chaîne vide ou blanche : un espace n'est pas une information", () => {
    expect(estRempli("")).toBe(false);
    expect(estRempli("   ")).toBe(false);
  });
});

describe("visible", () => {
  it("laisse passer une vraie valeur", () => {
    expect(visible("bonssoraoul@gmail.com")).toBe("bonssoraoul@gmail.com");
  });

  /**
   * Le cœur du contrat : en production, un champ non renseigné disparaît de
   * la page. Il ne s'affiche jamais sous forme de « [À COMPLÉTER] » devant
   * un recruteur, et il n'est jamais remplacé par une valeur inventée.
   */
  it("efface un champ à compléter plutôt que de l'afficher ou de l'inventer", () => {
    expect(visible(A_COMPLETER)).toBeNull();
  });
});

describe("champsManquants", () => {
  it("liste le chemin des champs restés à compléter", () => {
    const source = {
      nom: "Raoul Bonsso",
      formation: { intitule: "Master 1", periode: A_COMPLETER },
      contact: { email: "a@b.c", linkedin: A_COMPLETER },
    };

    expect(champsManquants(source).sort()).toEqual(["contact.linkedin", "formation.periode"]);
  });

  it("ne renvoie rien quand tout est renseigné", () => {
    expect(champsManquants({ a: "x", b: { c: "y" } })).toEqual([]);
  });

  it("ignore ce qui n'est pas du texte", () => {
    expect(champsManquants({ n: 42, ok: true, texte: A_COMPLETER })).toEqual(["texte"]);
  });
});
