/**
 * Parcours professionnel et formation.
 *
 * Source unique : le CV d'octobre 2026. Les formulations sont réécrites
 * pour dire ce que chaque poste a apporté, mais aucun fait ni aucun chiffre
 * n'est ajouté. Les chiffres sont ceux que le CV déclare ; ils ne proviennent
 * pas d'un dépôt public et la page le dit.
 */

export type Experience = {
  poste: string;
  entreprise: string;
  /** Mois de début, au format AAAA-MM, pour trier sans ambiguïté. */
  debut: string;
  /** Période telle qu'affichée. */
  periode: string;
  contexte: string;
  apports: { texte: string; resultat?: string }[];
  pile: string[];
};

export const experiences: Experience[] = [
  {
    poste: "Développeur mobile & qualité logicielle",
    entreprise: "Chouic",
    debut: "2025-10",
    periode: "oct. 2025 – 2026",
    contexte: "Développement mobile et accompagnement technique de l'équipe, en contexte Agile.",
    apports: [
      {
        texte:
          "Refonte des environnements conteneurisés et de l'outillage DevOps, pour accélérer les déploiements.",
        resultat: "≈ 40 % de temps de déploiement en moins",
      },
      {
        texte:
          "Qualité logicielle : résolution d'incidents, rédaction des spécifications et écriture des tests unitaires.",
        resultat: "couverture de tests > 85 %",
      },
    ],
    pile: ["Mobile", "Docker", "DevOps", "Tests unitaires", "Agile"],
  },
  {
    poste: "Développeur full stack & DevOps",
    entreprise: "Koss Sarl",
    debut: "2024-04",
    periode: "avr. – juil. 2024",
    contexte: "Conception et maintenance de composants logiciels pour un catalogue produit.",
    apports: [
      {
        texte: "Composants conçus et maintenus pour un catalogue de grande taille.",
        resultat: "plus de 5 000 références",
      },
      {
        texte:
          "Mise en place de l'intégration et du déploiement continus avec GitHub Actions, déploiement conteneurisé sur VPS Linux.",
        resultat: "disponibilité de 99,9 %",
      },
    ],
    pile: ["GitHub Actions", "Docker", "Linux"],
  },
  {
    poste: "Développeur mobile full stack",
    entreprise: "Thrust Techno Corp",
    debut: "2023-06",
    periode: "juin – août 2023",
    contexte: "Développement full stack orienté mobile : API sécurisées et intégration continue.",
    apports: [
      {
        texte: "Conception d'API REST sécurisées par JWT sur une base PostgreSQL hébergée dans le cloud.",
        resultat: "temps de réponse < 200 ms",
      },
      { texte: "Mise en place des pipelines d'intégration continue sous GitLab CI." },
    ],
    pile: ["API REST", "JWT", "PostgreSQL", "GitLab CI"],
  },
];

export type Formation = { diplome: string; ecole: string; periode: string; detail?: string };

export const formations: Formation[] = [
  {
    diplome: "Mastère Développement Full Stack & DevOps (Bac+5)",
    ecole: "Sup de Vinci, Nantes",
    periode: "2025 – 2027",
    detail: "Architecture et pilotage technique, cloud, Kubernetes, CI/CD, sécurité, méthodes Agile.",
  },
  {
    diplome: "Bachelor Systèmes d'Information",
    ecole: "3IL Groupe, Limoges",
    periode: "2022 – 2023",
  },
];

export const langues = [{ langue: "Anglais", niveau: "B2 — documentation et échanges techniques" }];

/** Trie du plus récent au plus ancien, sans muter la source. */
export function trierParRecence<T extends { debut: string }>(liste: readonly T[]): T[] {
  return [...liste].sort((a, b) => b.debut.localeCompare(a.debut));
}
