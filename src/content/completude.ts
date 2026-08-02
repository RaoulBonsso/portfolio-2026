import { A_COMPLETER } from "./profile";

/**
 * Gestion des champs non encore renseignés.
 *
 * Règle du projet : on n'invente jamais un fait sur le parcours de Joyboy.
 * Un champ inconnu porte le marqueur A_COMPLETER dans `profile.ts`.
 *
 * Restait à trancher ce qu'on en fait à l'écran. Trois options :
 *   1. afficher « [À COMPLÉTER] » en production — honnête, mais un recruteur
 *      qui ouvre la page voit un chantier ;
 *   2. inventer une valeur plausible — exclu ;
 *   3. masquer le champ en production, le montrer en développement.
 *
 * C'est la troisième qui est retenue. Le marqueur reste la source unique de
 * vérité, Joyboy voit les trous quand il travaille en local, et la page
 * publique ne montre que des faits vérifiables. Un champ absent ne ment pas ;
 * un champ inventé, si.
 */

/** Vrai si la valeur porte une information réelle. */
export function estRempli(valeur: string): boolean {
  return valeur.trim().length > 0 && valeur !== A_COMPLETER;
}

/** La valeur si elle est renseignée, sinon `null` — à traiter comme « ne rien rendre ». */
export function visible(valeur: string): string | null {
  return estRempli(valeur) ? valeur : null;
}

/**
 * Chemins pointés de tous les champs restés à compléter.
 * Sert au panneau d'audit affiché en développement.
 */
export function champsManquants(source: object, prefixe = ""): string[] {
  const trouves: string[] = [];

  for (const [cle, valeur] of Object.entries(source)) {
    const chemin = prefixe ? `${prefixe}.${cle}` : cle;

    if (typeof valeur === "string") {
      if (!estRempli(valeur)) trouves.push(chemin);
    } else if (valeur && typeof valeur === "object") {
      trouves.push(...champsManquants(valeur, chemin));
    }
  }

  return trouves;
}
