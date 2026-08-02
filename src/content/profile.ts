/**
 * Faits vérifiés uniquement.
 * Toute information non sourcée est marquée A_COMPLETER et s'affiche
 * visiblement comme un champ à remplir — jamais inventée.
 */

export const A_COMPLETER = "[À COMPLÉTER]" as const;

export const profile = {
  nom: "Raoul Bonsso",
  alias: "Joyboy",
  githubLogin: "RaoulBonsso",
  /** Ce qu'il cherche. Source : brief direct. */
  recherche: "Alternance — développement full-stack",
  /** Source : README ZenFlow (« Projet Académique M1 — SUP de VINCI »). */
  formation: {
    intitule: "Master 1 — SUP de VINCI",
    periode: A_COMPLETER,
    specialite: A_COMPLETER,
  },
  disponibilite: {
    rythme: A_COMPLETER,
    debut: A_COMPLETER,
    zone: A_COMPLETER,
  },
  contact: {
    email: "bonssoraoul@gmail.com",
    github: "https://github.com/RaoulBonsso",
    linkedin: A_COMPLETER,
    cv: A_COMPLETER,
  },
} as const;

/**
 * La phrase d'accroche. Elle doit tenir en une lecture de 4 secondes
 * et être défendable ligne par ligne en entretien.
 */
export const accroche = {
  titre: "Je construis des systèmes, pas des écrans.",
  corps:
    "Développeur full-stack en recherche d'alternance. Ce qui m'intéresse est " +
    "la couche qu'on ne voit pas : un contrat d'API écrit avant le code, un moteur " +
    "de règles avec son propre analyseur syntaxique, une file de tâches qui survit " +
    "au crash. J'écris les tests d'abord — pas par discipline affichée, parce que " +
    "c'est la seule façon que je connaisse de refactorer sans peur.",
};

/**
 * Les principes de travail. Chacun doit être adossé à une preuve
 * visible ailleurs sur la page, sinon il ne mérite pas d'y figurer.
 */
export const principes: { titre: string; texte: string; preuve: string }[] = [
  {
    titre: "Le contrat avant le code",
    texte:
      "La spécification OpenAPI est commitée avant le premier handler. Les tests " +
      "valident les réponses contre les schémas publiés, pas contre mes attentes : " +
      "servir un champ non documenté fait tomber la suite.",
    preuve: "Aiguillage",
  },
  {
    titre: "Le domaine ignore l'infrastructure",
    texte:
      "Les règles métier se testent sans serveur ni base de données. Conséquence " +
      "directe : une suite complète en moins d'une seconde, et un changement de " +
      "persistance qui ne touche aucune règle.",
    preuve: "Aiguillage · taskqueue",
  },
  {
    titre: "Écrit une fois, jamais réimplémenté",
    texte:
      "Authentification, quotas, en-têtes de limitation et journal d'usage vivent " +
      "dans une enveloppe unique. Aucune route ne les réimplémente, donc aucune " +
      "route ne peut les oublier.",
    preuve: "Aiguillage",
  },
  {
    titre: "Les limites sont assumées, pas cachées",
    texte:
      "Quand un stockage est en mémoire, c'est écrit dans le README avec l'ADR qui " +
      "l'explique et l'interface dessinée pour recevoir l'adaptateur durable. " +
      "Un compromis documenté vaut mieux qu'une promesse tenue à moitié.",
    preuve: "Aiguillage — ADR-3",
  },
];
