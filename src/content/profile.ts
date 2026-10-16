/**
 * Faits vérifiés uniquement.
 *
 * Source principale : le CV d'octobre 2026 (Alternance_2026/source/cv.html).
 * Toute information non sourcée porte le marqueur A_COMPLETER : elle est
 * masquée en production et listée en développement — jamais inventée.
 */

export const A_COMPLETER = "[À COMPLÉTER]" as const;

export const SITE_RECRUTEUR = "https://raoul-bonsso-alternance.vercel.app";

export const profile = {
  nom: "Raoul Bonsso",
  alias: "Joyboy",
  githubLogin: "RaoulBonsso",
  titre: "Développeur full stack & DevOps",
  recherche: "Alternance, puis CDI — full stack, DevOps, data",
  formation: {
    intitule: "Mastère Développement Full Stack & DevOps (Bac+5)",
    ecole: "Sup de Vinci, Nantes",
    periode: "2025 – 2027",
    specialite: "Architecture et pilotage technique, cloud, Kubernetes, CI/CD, sécurité, méthodes Agile",
  },
  disponibilite: {
    contrat: "Contrat d'apprentissage de 12 mois",
    rythme: "1 semaine école / 3 semaines entreprise",
    debut: "Novembre 2026",
    zone: "Nantes",
    /** Le CV ne dit rien de la mobilité au-delà de Nantes : on ne la suppose pas. */
    mobilite: A_COMPLETER,
  },
  contact: {
    email: "bonssoraoul@gmail.com",
    github: "https://github.com/RaoulBonsso",
    linkedin: "https://www.linkedin.com/in/raoul-bonsso/",
    cv: `${SITE_RECRUTEUR}/cv-raoul-bonsso.pdf`,
    siteRecruteur: SITE_RECRUTEUR,
  },
} as const;

/** Note du CV, utile à une PME qui recrute un premier alternant. */
export const aideEmbauche =
  "Contrat débutant avant le 1er janvier 2027 : aide de l'État de 2 000 € pour une entreprise de moins de 250 salariés, formation financée par l'OPCO.";

/**
 * Les quatre axes du positionnement. Chaque axe renvoie à des projets
 * présentés plus bas : un axe sans projet pour le prouver n'a rien à faire ici.
 */
export type Axe = {
  id: "full-stack" | "devops" | "data" | "automatisation-ia";
  titre: string;
  texte: string;
  outils: string[];
  preuves: string[];
};

export const axes: Axe[] = [
  {
    id: "full-stack",
    titre: "Full stack",
    texte:
      "Applications web et mobiles, API REST conçues contrat d'abord, authentification. Du schéma de données à l'interface responsive.",
    outils: ["TypeScript", "React", "Next.js", "Node.js", "React Native (Expo)", "Zod", "OpenAPI"],
    preuves: ["Aiguillage", "Cap Certif", "Facture-e TPE"],
  },
  {
    id: "devops",
    titre: "DevOps",
    texte:
      "Conteneurs, intégration et déploiement continus, administration d'un VPS Linux : durcissement, sauvegardes, supervision.",
    outils: ["Docker", "Docker Compose", "GitHub Actions", "GitLab CI", "Vercel", "Linux", "systemd"],
    preuves: ["paper-trader", "Rouages", "Pack TPE n8n"],
  },
  {
    id: "data",
    titre: "Data",
    texte:
      "Modélisation, règles d'accès, isolation multi-tenant, données sourcées et validées au build plutôt que saisies à la main.",
    outils: ["PostgreSQL", "Firestore", "Supabase", "MongoDB", "SQLite", "Python"],
    preuves: ["Matinale", "Cap École", "paper-trader"],
  },
  {
    id: "automatisation-ia",
    titre: "Automatisation & IA pour PME",
    texte:
      "Workflows n8n testés comme du code, IA auto-hébergée ou API Claude, humain gardé dans la boucle et conformité RGPD dans le code.",
    outils: ["n8n", "Ollama", "API Claude", "LLM locaux", "Telegram", "Google Sheets"],
    preuves: ["Rouages", "Pack TPE n8n", "Matinale"],
  },
];

/**
 * Les principes de travail. Chacun est adossé à une preuve visible dans
 * un projet présenté sur la page, sinon il ne mérite pas d'y figurer.
 */
export const principes: { titre: string; texte: string; preuve: string }[] = [
  {
    titre: "Le contrat avant le code",
    texte:
      "La spécification OpenAPI est écrite avant le premier handler. Les tests valident les réponses contre les schémas publiés : servir un champ non documenté fait tomber la suite.",
    preuve: "Aiguillage",
  },
  {
    titre: "Le domaine ignore l'infrastructure",
    texte:
      "Les règles métier sont des fonctions pures, testées sans serveur ni base. Une évolution de la loi ou un changement de stockage ne touche aucune règle.",
    preuve: "Facture-e TPE · Cap Certif",
  },
  {
    titre: "Une automatisation se teste comme du code",
    texte:
      "Le code des nœuds n8n n'est jamais écrit dans l'éditeur : il vit dans une bibliothèque testée, puis il est injecté. Un JSON qui diverge de ses sources fait échouer un test.",
    preuve: "Rouages · Pack TPE n8n",
  },
  {
    titre: "L'IA propose, le code décide",
    texte:
      "Le modèle renvoie une proposition structurée ; les garde-fous, la taille d'un ordre ou l'envoi d'un message restent dans du code relu et testé.",
    preuve: "paper-trader · Rouages",
  },
  {
    titre: "L'isolation par les règles",
    texte:
      "Dans un SaaS multi-tenant, la séparation des clients est portée par les règles de la base, pas par la discipline des requêtes : un filtre oublié ne peut rien exposer.",
    preuve: "Matinale",
  },
  {
    titre: "Une donnée inconnue reste inconnue",
    texte:
      "Un champ non vérifié vaut null avec sa raison, et un test échoue quand une donnée vieillit. Cette page applique la même règle à mon propre parcours.",
    preuve: "Cap École · ce portfolio",
  },
];
