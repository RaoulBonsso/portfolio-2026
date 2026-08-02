/**
 * Projets mis en avant.
 *
 * Règle absolue : chaque phrase de ce fichier est tirée du README, du code ou
 * de la spec du projet concerné. Rien n'est extrapolé. Si un chiffre est cité
 * (nombre de tests, version), il provient du dépôt.
 */

export type Lien = { libelle: string; href: string; primaire?: boolean };

export type Projet = {
  slug: string;
  nom: string;
  /** Une ligne. Ce que ça fait, pas comment. */
  resume: string;
  /** Le paragraphe qui distingue le projet d'un CRUD. */
  detail: string;
  /** Les faits durs, affichés en tableau. */
  faits: { cle: string; valeur: string }[];
  pile: string[];
  liens: Lien[];
  /** Statut réel, pas marketing. */
  statut: "en ligne" | "livré" | "en cours";
  /** Mis en avant en grand format. */
  vedette?: boolean;
};

export const projets: Projet[] = [
  {
    slug: "aiguillage",
    nom: "Aiguillage",
    resume:
      "Une API de distribution ferroviaire traitée comme un produit : le contrat OpenAPI d'abord, une implémentation vérifiée contre lui, un portail de documentation généré depuis ce contrat, et une console d'administration pour piloter les accès.",
    detail:
      "Entre les données brutes d'un transporteur et le voyageur qui achète son billet, il y a une chaîne de distribution. Aiguillage occupe le maillon du milieu : exposer horaires, tarifs et disponibilités à des canaux de vente tiers. Trois livrables comme dans une vraie équipe « API-as-a-Product » — l'API v1 sous /api/v1, le portail de doc sous /docs généré depuis spec/openapi.yaml, et la console d'admin sous /admin pour émettre et révoquer les clés. Le portail ne contient aucun texte écrit à la main : il lit le contrat. La boucle complète du Spec Driven Development, vérifiée mécaniquement des deux côtés.",
    faits: [
      { cle: "Opérations REST", valeur: "4, authentifiées par clé" },
      { cle: "Tests", valeur: "54, dont 18 tests de contrat" },
      { cle: "Erreurs", valeur: "RFC 9457 (problem+json)" },
      { cle: "Validation", valeur: "Ajv contre les schémas publiés" },
      { cle: "Décisions", valeur: "6 ADR documentées, chacune avec son coût" },
    ],
    pile: ["Next.js 16", "TypeScript", "OpenAPI", "Zod", "Ajv", "Vitest", "Tailwind v4"],
    liens: [
      { libelle: "Démo live", href: "https://aiguillage-delta.vercel.app", primaire: true },
      { libelle: "Code source", href: "https://github.com/RaoulBonsso/aiguillage" },
    ],
    statut: "en ligne",
    vedette: true,
  },
  {
    slug: "mon-planning",
    nom: "Mon planning",
    resume:
      "Une application Android qui lit un planning de travail en photo et le redessine dans le téléphone : vue par mois, vue par semaines ISO, total d'heures, détection des créneaux qui se chevauchent.",
    detail:
      "Un planning de travail arrive en feuille papier, en tableau photocopié ou en capture floue. Le recopier à la main est fastidieux, compter ses heures en fin de mois l'est davantage. Deux décisions portent le projet. D'abord, le modèle de vision est contraint par un responseSchema, pas par une consigne en prose : il ne peut répondre qu'en JSON conforme, là où le texte libre obligerait à deviner la structure à coups d'expressions régulières — c'est précisément là que ce genre d'application casse. Ensuite, un créneau mal lu n'invalide jamais tout le scan : la normalisation sépare les créneaux retenus des créneaux écartés, et affiche lequel a été rejeté et pourquoi. Sur quinze lignes dont une illisible, l'utilisateur récupère les quatorze autres. Le dossier domain/ ne connaît ni React Native, ni SQLite, ni le réseau : les 38 tests s'exécutent en 170 ms sous Node, sans émulateur.",
    faits: [
      { cle: "Tests", valeur: "38, logique métier pure, 170 ms" },
      { cle: "Cas tordus", valeur: "Nuit 22h→6h, semaine ISO à cheval, 1ᵉʳ janvier" },
      { cle: "Stockage", valeur: "SQLite locale — les créneaux ne quittent pas l'appareil" },
      { cle: "Lecture", valeur: "Modèle de vision, schéma JSON imposé" },
      { cle: "Limites", valeur: "Documentées : pas d'édition, pas d'export, pas de sync" },
    ],
    pile: ["Expo", "React Native", "TypeScript", "SQLite", "Vitest"],
    liens: [{ libelle: "Code source", href: "https://github.com/RaoulBonsso/scan-planning", primaire: true }],
    statut: "livré",
    vedette: true,
  },
  {
    slug: "syndicate-nexus",
    nom: "SyndicateNexus",
    resume:
      "Une plateforme de microservices polyglottes qui orchestre une fédération d'agents IA pour automatiser le développement, l'opérationnel et le support technique.",
    detail:
      "Six services, quatre langages, un seul flux. Un orchestrateur Node.js route les intentions et tient l'état des missions sur WebSocket ; un cortex Python planifie via LangGraph avec mémoire vectorielle ; un service Java Spring Boot génère et révise le code ; un moniteur Rust collecte les métriques et détecte les anomalies ; un scribe Python produit specs et ADR ; un front Next.js montre les agents travailler en temps réel. Communication par API et par événements, conteneurisée, avec CI/CD GitHub Actions et publication sur GHCR. Construit en public sur 21 jours, avec un tracker dédié.",
    faits: [
      { cle: "Services", valeur: "6 agents spécialisés" },
      { cle: "Langages", valeur: "Node.js · Python · Java · Rust · TypeScript" },
      { cle: "Transport", valeur: "REST, événements, WebSocket" },
      { cle: "Format", valeur: "21 jours, build in public" },
    ],
    pile: ["Node.js", "Python", "LangGraph", "Java / Spring Boot", "Rust", "Next.js", "Docker", "PostgreSQL", "Redis"],
    liens: [
      { libelle: "Tracker live", href: "https://syndicate-nexus-tracker.vercel.app", primaire: true },
      { libelle: "Code source", href: "https://github.com/RaoulBonsso/syndicate-nexus" },
    ],
    statut: "en cours",
    vedette: true,
  },
  {
    slug: "zenflow",
    nom: "ZenFlow",
    resume:
      "Application mobile de bien-être : méditation guidée avec lecteur audio complet, respiration animée, tracker d'habitudes persistant et tableau de bord avec série quotidienne.",
    detail:
      "Projet académique M1 livré sous forme d'APK Android public. Le lecteur audio gère lecture/pause, curseur de progression et statistiques de temps ; la respiration guidée est une animation « ripple » calée sur les cycles d'inspiration et d'expiration ; les habitudes sont persistées côté Supabase avec barre de progression, et le tableau de bord agrège citation du jour (API externe), temps de méditation et streak. Charte graphique « Zen » définie en amont — vert sauge, bleu océan, lavande — et appliquée comme un vrai design system, pas comme une palette choisie au fil de l'eau.",
    faits: [
      { cle: "Plateforme", valeur: "Android — APK public en téléchargement" },
      { cle: "SDK", valeur: "Expo SDK 56" },
      { cle: "Écrans clés", valeur: "Méditation, respiration, habitudes, tableau de bord, profil" },
      { cle: "Cadre", valeur: "Projet académique M1 — SUP de VINCI" },
    ],
    pile: ["Expo", "React Native", "React Navigation", "NativeWind", "Supabase", "TypeScript"],
    liens: [
      {
        libelle: "Télécharger l'APK",
        href: "https://github.com/RaoulBonsso/zenflow-releases/releases/latest",
        primaire: true,
      },
      { libelle: "Fiche du projet", href: "https://github.com/RaoulBonsso/zenflow-releases" },
    ],
    statut: "livré",
    vedette: true,
  },
  {
    slug: "elyas",
    nom: "ELYAS",
    resume:
      "Site vitrine pour un photographe, avec un back-office maison pensé pour être piloté entièrement depuis un téléphone.",
    detail:
      "Le concept tient en une contrainte : le client doit pouvoir ajouter une photo n'importe où, écrire le texte qui l'accompagne et choisir la disposition du bloc, depuis son mobile, sans passer par un CMS tiers. D'où un back-office intégré protégé par Firebase Auth, sept dispositions prédéfinies choisies bloc par bloc, et un rendu bilingue FR/EN via next-intl. Le parti pris visuel — « le mur vivant » — fait cohabiter des photos de ratios différents, certaines plein cadre, d'autres en passe-partout, qui se réorganisent du multi-colonnes desktop au flux unique mobile.",
    faits: [
      { cle: "Administration", valeur: "Back-office maison, mobile-first" },
      { cle: "Authentification", valeur: "Firebase Auth, compte unique client" },
      { cle: "Dispositions", valeur: "7 layouts choisis par bloc" },
      { cle: "Langues", valeur: "FR / EN via next-intl" },
    ],
    pile: ["Next.js", "Firebase", "next-intl", "next-themes", "Framer Motion", "Tailwind CSS"],
    liens: [{ libelle: "Voir le site", href: "https://elyas-one.vercel.app", primaire: true }],
    statut: "en cours",
  },
  {
    slug: "anime-me",
    nom: "AnimeMe",
    resume:
      "Transformation de photos en illustrations stylisées, avec plusieurs fournisseurs de génération d'images comparés sur le coût réel et la fidélité au sujet.",
    detail:
      "Le travail intéressant n'est pas l'appel d'API mais l'arbitrage : quatre fournisseurs évalués, coût mesuré par image plutôt qu'estimé, et un périmètre volontairement resserré à une personne par photo parce que c'est là que la fidélité tient. Un projet où la décision produit a été de dire non à une fonctionnalité plutôt que de la livrer approximative.",
    faits: [
      { cle: "Fournisseurs évalués", valeur: "4, comparés sur coût et fidélité" },
      { cle: "Périmètre assumé", valeur: "Une personne par photo" },
    ],
    pile: ["Next.js", "React", "APIs de génération d'images"],
    liens: [{ libelle: "Voir le site", href: "https://anime-me-site.vercel.app", primaire: true }],
    statut: "en cours",
  },
];

/**
 * Bibliothèques et outils construits de zéro, sans dépendance runtime.
 * Dépôts locaux — pas encore publiés. Description tirée du manifeste
 * de chaque projet (Cargo.toml, pyproject.toml, package.json).
 */
export type Chantier = {
  nom: string;
  langage: string;
  description: string;
  detail: string;
};

export const chantiers: Chantier[] = [
  {
    nom: "kvstore",
    langage: "Rust",
    description: "Un mini key-value store persistant, log-structuré (façon Bitcask).",
    detail:
      "Écriture en append-only, index en mémoire, intégrité des enregistrements vérifiée par CRC32. Édition 2024, deux dépendances.",
  },
  {
    nom: "taskqueue",
    langage: "Python",
    description:
      "File de tâches persistante et fiable — SQLite, at-least-once, visibility timeout, DLQ.",
    detail:
      "Zéro dépendance runtime. Suite de tests couvrant le cycle de vie, les reprises, le timeout de visibilité et la concurrence — y compris entre processus.",
  },
  {
    nom: "rulekit",
    langage: "TypeScript",
    description:
      "Moteur de règles métier avec son propre DSL : lexer → parser → AST → évaluateur.",
    detail:
      "Zéro dépendance runtime. La chaîne complète d'un petit langage, écrite à la main pour comprendre ce qu'un parser fait vraiment.",
  },
];
