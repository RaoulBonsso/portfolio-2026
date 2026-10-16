/**
 * Projets mis en avant.
 *
 * Règle absolue : chaque phrase de ce fichier est tirée du README, du code ou
 * du site en ligne du projet concerné. Rien n'est extrapolé.
 *
 * Les nombres de tests ont été obtenus le 13 octobre 2026 en exécutant la
 * suite de chaque dépôt (`vitest run`, `node --test` ou `pytest`), pas en
 * recopiant un badge. Un projet sans suite exécutée n'annonce aucun chiffre.
 */

export type Domaine = "full-stack" | "devops" | "data" | "automatisation-ia";

export const DOMAINES: { id: Domaine; libelle: string }[] = [
  { id: "full-stack", libelle: "Full stack" },
  { id: "devops", libelle: "DevOps" },
  { id: "data", libelle: "Data" },
  { id: "automatisation-ia", libelle: "Automatisation & IA" },
];

export type Lien = { libelle: string; href: string; primaire?: boolean };

/** Une capture prise sur le site en ligne (ou en local, et c'est alors écrit). */
export type Capture = { src: string; alt: string; legende: string };

/** Un projet sans interface publique montre son fonctionnement, pas une maquette. */
export type Schema = { etapes: { titre: string; detail: string }[]; legende: string };

/** Les états réels, pas marketing. */
export type Statut = "en ligne" | "en service" | "non publié" | "en cours";

export type Projet = {
  slug: string;
  nom: string;
  /** Une ligne : ce que ça fait, pas comment. */
  accroche: string;
  /** Le problème réel auquel le projet répond. */
  probleme: string;
  /** Ce qui a été construit, en phrases courtes et vérifiables. */
  construit: string[];
  /** Les preuves : tests exécutés, contrôles, liens. */
  preuves: { cle: string; valeur: string }[];
  pile: string[];
  domaines: Domaine[];
  statut: Statut;
  /** Visibilité du code source. Un dépôt privé est annoncé comme tel. */
  code: "public" | "privé";
  /** Nombre de tests relevés en exécutant la suite ; absent si non mesuré. */
  tests?: number;
  liens: Lien[];
  captures: Capture[];
  schema?: Schema;
  /** Note d'honnêteté affichée sous les liens (code privé, capture locale…). */
  note?: string;
};

export const projets: Projet[] = [
  {
    slug: "rouages",
    nom: "Rouages",
    accroche:
      "Sept automatisations n8n pour PME, et un site qui montre chacune nœud par nœud, rendue depuis son vrai fichier.",
    probleme:
      "Dans une PME, le temps ne se perd pas dans les outils mais entre eux : le mail qu'il faut lire pour savoir qu'il ne servait à rien, la facture qu'on n'ose pas relancer, le bug signalé quatre fois, l'action décidée en réunion que personne n'a notée.",
    construit: [
      "Sept workflows : Brief de 7h30, Radar à bugs, Signal (veille), Encaisse (relances), Après-réunion, Jour 1 prêt (onboarding), Pouls (disponibilité).",
      "La logique des nœuds Code est écrite et testée à part, puis injectée dans n8n par un constructeur : rien n'est codé dans l'éditeur.",
      "Chaque workflow est vérifié contre les définitions réelles de n8n 2.42, extraites de l'image Docker officielle, avant d'être livré.",
      "Site Next.js 16 qui dessine le canevas de chaque workflow depuis son JSON, avec un parcours étape par étape.",
      "IA branchée par un nœud compatible OpenAI : Ollama auto-hébergé par défaut (0 € par appel), Claude ou Mistral en changeant une ligne.",
    ],
    preuves: [
      { cle: "Tests", valeur: "150 (Vitest) : logique n8n, contenu, géométrie" },
      { cle: "Import", valeur: "Vérifié dans un n8n 2.42.3 jetable, sans réseau" },
      { cle: "Livraison", valeur: "Workflows inactifs à l'import, sans aucun secret" },
    ],
    pile: ["n8n", "Next.js 16", "TypeScript", "Tailwind CSS 4", "motion", "Vitest", "Docker", "Ollama"],
    domaines: ["automatisation-ia", "full-stack", "devops"],
    statut: "en ligne",
    code: "privé",
    tests: 150,
    liens: [{ libelle: "rouages.vercel.app", href: "https://rouages.vercel.app", primaire: true }],
    captures: [
      {
        src: "/projets/rouages-accueil.webp",
        alt: "Page d'accueil de Rouages : titre « Des rouages qui vous rendent des heures » et schéma animé d'un workflow.",
        legende: "Accueil : un workflow miniature animé, du déclencheur aux brouillons.",
      },
      {
        src: "/projets/rouages-canevas.webp",
        alt: "Canevas du workflow Encaisse : nœuds Google Sheets, Code et Telegram reliés, étape 1 sur 5 en surbrillance.",
        legende: "Le canevas du workflow Encaisse, rendu depuis son fichier n8n, étape par étape.",
      },
      {
        src: "/projets/rouages-workflow.webp",
        alt: "Fiche du Brief de 7h30 : le problème, ce que fait le workflow et trois indicateurs.",
        legende: "Une fiche : le problème, ce que fait le workflow, l'hypothèse de calcul affichée.",
      },
    ],
    note: "Dépôt privé : les workflows complets font partie d'une offre. Code montré volontiers en entretien.",
  },
  {
    slug: "rampe",
    nom: "Rampe",
    accroche: "Une CI sérieuse sur chaque dépôt en une commande : qualité, secrets, failles des dépendances, déploiement avec retour arrière.",
    probleme:
      "Sur 50 dépôts, 7 avaient une CI. Copier un fichier de pipeline de projet en projet, c'est corriger la même faille cinquante fois, ou jamais ; et des tests écrits pour l'émulateur Firestore n'avaient jamais tourné faute du bon JDK sur le poste.",
    construit: [
      "Cinq workflows GitHub Actions réutilisables : qualité Node (Java 21 et émulateurs Firebase en option, Playwright), qualité Python (uv, Ruff, pytest), sécurité, déploiement VPS, appel du garde-fou n8n.",
      "Sécurité : gitleaks ne scanne que les nouveaux commits (l'historique d'un vieux projet ne bloque pas, une nouvelle fuite si), osv-scanner lit tous les lockfiles ; outils épinglés lancés en conteneur, aucune action tierce n'a accès au code.",
      "Déploiement VPS par SSH avec hôte vérifié, contrôle de santé HTTP et retour automatique au commit précédent si la santé ne revient pas.",
      "Un installeur lit le dépôt (pile, scripts présents, émulateurs, tests E2E) et écrit un ci.yml d'une dizaine de lignes ; mode autonome pour les dépôts publics.",
      "Site vitrine Next.js 16 : un pipeline animé rejoue un déploiement sain, puis une santé KO et son retour arrière.",
    ],
    preuves: [
      { cle: "Tests", valeur: "26 : installeur (20) et site (6), plus actionlint et shellcheck en CI" },
      { cle: "Adoption", valeur: "8 dépôts branchés le premier jour, CI verte" },
      { cle: "Effet", valeur: "28 tests d'émulateur Firestore exécutés pour la première fois, et passés" },
    ],
    pile: ["GitHub Actions", "Bash", "Docker", "gitleaks", "osv-scanner", "Next.js 16", "Tailwind CSS 4", "Vitest"],
    domaines: ["devops"],
    statut: "en service",
    code: "privé",
    tests: 26,
    liens: [],
    captures: [
      {
        src: "/projets/rampe-accueil.webp",
        alt: "Accueil de Rampe : titre « Une CI sérieuse sur chaque dépôt. En une commande. » et pipeline animé checkout, qualité, sécurité, déploiement, santé.",
        legende: "Le pipeline du hero rejoue un déploiement sain.",
      },
      {
        src: "/projets/rampe-rollback.webp",
        alt: "Journal du pipeline : santé en HTTP 502, retour arrière vers le commit précédent, puis prod rétablie.",
        legende: "Puis une santé KO : retour arrière automatique, prod rétablie.",
      },
      {
        src: "/projets/rampe-workflows.webp",
        alt: "Les cinq workflows réutilisables présentés en cartes : qualité Node, qualité Python, secrets et failles, déploiement VPS, garde-fou n8n.",
        legende: "Les cinq briques, appelées avec uses:.",
      },
    ],
    note: "Captures prises en local : le site n'est pas encore publié. Dépôt privé, montré volontiers en entretien.",
  },
  {
    slug: "aiguillage",
    nom: "Aiguillage",
    accroche:
      "Une API de distribution ferroviaire traitée comme un produit : contrat OpenAPI d'abord, portail de documentation généré, console d'administration.",
    probleme:
      "Une API livrée seule est inutilisable. Entre les données d'un transporteur et les canaux de vente qui les revendent, il faut un contrat stable, une documentation fiable et de quoi piloter les accès.",
    construit: [
      "API v1 de 4 opérations REST, authentifiées par clé, avec quotas et erreurs au format RFC 9457 (problem+json).",
      "Portail de documentation généré depuis spec/openapi.yaml : aucun texte écrit à la main, exemples exécutables en direct.",
      "Console d'administration : émission et révocation des clés, suivi des quotas, journal d'appels.",
      "Authentification, quotas et journal d'usage vivent dans une enveloppe unique qu'aucune route ne réimplémente.",
    ],
    preuves: [
      { cle: "Tests", valeur: "54, dont 18 tests de contrat (Vitest)" },
      { cle: "Contrat", valeur: "OpenAPI 3.1, réponses validées par Ajv contre les schémas publiés" },
      { cle: "Décisions", valeur: "6 ADR documentées, chacune avec son coût" },
    ],
    pile: ["Next.js 16", "TypeScript", "OpenAPI 3.1", "Zod", "Ajv", "Vitest", "Tailwind CSS 4"],
    domaines: ["full-stack"],
    statut: "en ligne",
    code: "public",
    tests: 54,
    liens: [
      { libelle: "aiguillage-delta.vercel.app", href: "https://aiguillage-delta.vercel.app", primaire: true },
      { libelle: "Code source", href: "https://github.com/RaoulBonsso/aiguillage" },
    ],
    captures: [
      {
        src: "/projets/aiguillage-docs.webp",
        alt: "Portail de documentation d'Aiguillage : liste des opérations GET et description de /api/v1/offers.",
        legende: "Le portail de documentation, généré depuis le contrat OpenAPI.",
      },
      {
        src: "/projets/aiguillage-admin.webp",
        alt: "Console d'administration : clés actives, offres au catalogue, formulaire d'émission de clé et tableau des clés.",
        legende: "La console : émission et révocation des clés, consommation des quotas.",
      },
      {
        src: "/projets/aiguillage-accueil.webp",
        alt: "Page d'accueil d'Aiguillage présentant l'API de distribution ferroviaire.",
        legende: "L'accueil du produit. Transporteurs, lignes et tarifs sont fictifs.",
      },
    ],
  },
  {
    slug: "cap-certif",
    nom: "Cap Certif",
    accroche:
      "Trouver les certifications gratuites qui comptent pour un métier cible, et tenir un programme semaine par semaine jusqu'à l'examen.",
    probleme:
      "Les certifications gratuites existent, mais leur valeur aux yeux d'un recruteur, leurs conditions de gratuité et leurs dates limites sont éparpillées. Sans plan, on en commence trois et on n'en passe aucune.",
    construit: [
      "Catalogue de 34 certifications data, finance et DevOps/cloud, dont 22 réellement gratuites, notées A/B/C avec la raison de chaque note.",
      "Générateur de programme : prérequis d'abord (tri topologique), puis échéance, valeur et durée ; une seule certification active ; une semaine légère toutes les quatre.",
      "Jours protégés, périodes de repos, avertissements (examen après l'échéance du voucher, plus de 7 h par semaine) et export agenda .ics.",
      "Fonctionne sans compte (stockage local) ; avec Firebase, connexion Google et reprise du programme commencé en invité.",
      "Catalogue versionné et validé par zod : un test échoue si le fichier généré n'est plus à jour.",
    ],
    preuves: [
      { cle: "Tests", valeur: "164 (Vitest)" },
      { cle: "Navigateur", valeur: "Parcours Playwright en mobile, dont 360 px sans débordement" },
      { cle: "Sécurité", valeur: "Règles Firestore testées sur émulateur, suite dédiée" },
    ],
    pile: ["Next.js 16", "TypeScript strict", "Tailwind CSS 4", "Firebase Auth", "Firestore", "zod", "Vitest", "Playwright"],
    domaines: ["full-stack", "data"],
    statut: "en ligne",
    code: "privé",
    tests: 164,
    liens: [{ libelle: "cap-certif.vercel.app", href: "https://cap-certif.vercel.app", primaire: true }],
    captures: [
      {
        src: "/projets/cap-certif-programme.webp",
        alt: "Générateur de programme : choix du métier cible, étapes de certification datées et total d'heures.",
        legende: "Le générateur : métier cible, temps disponible, plan daté semaine par semaine.",
      },
      {
        src: "/projets/cap-certif-catalogue.webp",
        alt: "Catalogue filtrable des certifications avec domaine, gratuité et valeur recruteur.",
        legende: "Le catalogue filtrable ; les filtres se partagent par URL.",
      },
      {
        src: "/projets/cap-certif-accueil.webp",
        alt: "Accueil de Cap Certif : « Les certifications gratuites qui comptent vraiment pour ton métier ».",
        legende: "L'accueil et les vouchers à saisir avant expiration.",
      },
    ],
  },
  {
    slug: "pack-tpe-n8n",
    nom: "Pack TPE n8n",
    accroche:
      "Cinq automatisations qui font gagner des clients aux commerces de quartier, avec la conformité RGPD écrite dans le code.",
    probleme:
      "Un commerce de quartier perd des clients sans le voir : un avis Google jamais demandé, un appel manqué jamais rappelé, une demande du site restée sans réponse, un ancien client oublié.",
    construit: [
      "Demande d'avis après la visite avec une seule relance, SMS à l'appelant en moins d'une minute après un appel manqué, réveil des clients dormants, collecte des demandes du site, bilan mensuel chiffré.",
      "Conformité française dans le code : soft opt-in plafonné à 36 mois, purge du journal au-delà de 12 mois, liste d'opposition partagée, mention STOP, fenêtre d'envoi commerciale, données minimisées avant l'IA.",
      "Logique métier pure dans lib/, développée en TDD, injectée dans les nœuds Code ; un test échoue si un JSON commité ne correspond plus aux sources.",
      "Validateur qui refuse $env et toute clé d'API en clair ; vérification contre les définitions réelles de n8n 2.42.",
    ],
    preuves: [
      { cle: "Tests", valeur: "154 (node:test), aucune dépendance npm" },
      { cle: "Vérification", valeur: "Six niveaux, jusqu'à l'exécution dans un n8n jetable" },
      { cle: "Secrets", valeur: "Credentials référencées par nom, configurations clients ignorées par git" },
    ],
    pile: ["n8n", "Node.js", "node:test", "Google Sheets", "Brevo (SMS)", "Ollama", "API Claude"],
    domaines: ["automatisation-ia", "devops"],
    statut: "non publié",
    code: "privé",
    tests: 154,
    liens: [],
    captures: [],
    schema: {
      legende: "Pas d'interface publique : voici comment un workflow est fabriqué, d'après le README.",
      etapes: [
        { titre: "lib/", detail: "Logique métier pure, en TDD" },
        { titre: "sources/", detail: "Description de chaque workflow" },
        { titre: "Constructeur", detail: "Injecte le code dans les nœuds" },
        { titre: "Validateur", detail: "Refuse $env et les clés en clair" },
        { titre: "n8n 2.42", detail: "Import vérifié, prêt à brancher" },
      ],
    },
    note: "Dépôt privé, sans démo publique : ce sont les livrables d'une offre aux TPE.",
  },
  {
    slug: "facture-e-tpe",
    nom: "Facture-e TPE",
    accroche:
      "Un diagnostic gratuit qui dit à un artisan, en douze questions, ce que la réforme de la facture électronique change pour lui.",
    probleme:
      "Depuis le 1er septembre 2026, toute entreprise française doit pouvoir recevoir des factures électroniques, et les TPE devront les émettre au 1er septembre 2027. La plupart des artisans ne savent pas qu'ils sont déjà concernés.",
    construit: [
      "Diagnostic en douze questions : score de préparation sur 100, calendrier personnalisé, checklist classée par urgence, estimation plafonnée du risque d'amende, résultat imprimable.",
      "Chaque règle cite sa source officielle (DGFiP, Service-Public, Légifrance).",
      "Moteur réduit à une fonction pure, diagnostiquer(reponses, aujourdhui) : une évolution de la loi tient dans un seul fichier de données.",
      "Version en marque blanche pour les experts-comptables, et trois guides de référencement sourcés.",
    ],
    preuves: [
      { cle: "Tests", valeur: "131 (Vitest) : moteur, validation, API, composants" },
      { cle: "Navigateur", valeur: "Parcours Playwright en mobile : diagnostic, marque blanche, guide" },
      { cle: "Mode démo", valeur: "Fonctionne sans aucune clé" },
    ],
    pile: ["Next.js 16", "React 19", "Tailwind CSS 4", "shadcn / Base UI", "zod", "Firestore", "Vitest"],
    domaines: ["full-stack"],
    statut: "non publié",
    code: "privé",
    tests: 131,
    liens: [],
    captures: [
      {
        src: "/projets/facture-resultat.webp",
        alt: "Résultat du diagnostic : score 58 sur 100, situation, calendrier personnalisé.",
        legende: "Le résultat : score, cas particulier expliqué, calendrier personnalisé.",
      },
      {
        src: "/projets/facture-diagnostic.webp",
        alt: "Première question du diagnostic : taille de l'entreprise, en gros boutons.",
        legende: "Une question par écran, pensée pour le téléphone.",
      },
      {
        src: "/projets/facture-accueil.webp",
        alt: "Accueil : « Prêt pour la facture électronique ? » et les trois dates à retenir.",
        legende: "L'accueil et les trois dates de la réforme.",
      },
    ],
    note: "Pas encore publié : captures prises sur un build de production lancé en local.",
  },
  {
    slug: "matinale",
    nom: "Matinale",
    accroche:
      "Un SaaS de veille multi-tenant : chaque espace de travail choisit ses sources et reçoit chaque matin un digest résumé.",
    probleme:
      "Un outil de veille mono-utilisateur ne passe pas à l'échelle d'une agence. Le risque d'un SaaS multi-tenant est connu : un filtre oublié dans une requête, et un client lit les données d'un autre.",
    construit: [
      "Tout vit sous workspaces/{id}/ : l'appartenance se prouve par l'existence du document membre, et l'isolation est portée par les règles Firestore, pas par le code applicatif.",
      "Matrice de rôles et permissions, quotas par plan commercial, garde serveur requireMember qui vérifie appartenance et droit.",
      "Sources de veille déclarées comme du code dans un registre : un client choisit une clé, jamais une URL, ce qui ferme la porte à la SSRF par construction.",
      "Dix sources portées et vérifiées ; résumé par Ollama auto-hébergé (plan gratuit) ou l'API Claude (plans payants).",
    ],
    preuves: [
      { cle: "Tests", valeur: "110 (Vitest)" },
      { cle: "Décision", valeur: "ADR-001 sur l'isolation multi-tenant" },
      { cle: "Méthode", valeur: "Roadmap implémentée chaque jour en TDD sur dev" },
    ],
    pile: ["Next.js 16", "TypeScript", "Firebase Auth", "Firestore", "Ollama", "API Claude", "Vitest"],
    domaines: ["full-stack", "data", "automatisation-ia"],
    statut: "en cours",
    code: "privé",
    tests: 110,
    liens: [],
    captures: [],
    schema: {
      legende: "Phase 1 en cours, sans interface publique : le parcours d'une donnée, d'après le README.",
      etapes: [
        { titre: "Espace", detail: "workspaces/{id}/" },
        { titre: "Membre", detail: "members/{uid} prouve l'accès" },
        { titre: "Règles", detail: "Firestore refuse par défaut" },
        { titre: "Sources", detail: "Registre en code, sans URL libre" },
        { titre: "Digest", detail: "Résumé Ollama ou Claude" },
      ],
    },
    note: "En construction, dépôt privé. Socle multi-tenant et authentification en place.",
  },
  {
    slug: "paper-trader",
    nom: "paper-trader",
    accroche:
      "Un bot de trading fictif piloté par Claude, où les garde-fous de risque sont appliqués par le code, jamais par le modèle.",
    probleme:
      "Confier une décision à un modèle de langage est risqué s'il a la main sur le compte. Il fallait tester des stratégies sur de vrais cours, sans argent réel, avec des règles de risque que le modèle ne peut pas contourner.",
    construit: [
      "Chaîne en cinq temps : cours Alpaca, indicateurs (SMA, RSI, plus haut et plus bas), proposition de Claude en JSON, lecture stricte, validation par risk.py.",
      "Claude n'a aucun accès au compte : risk.py valide la proposition et calcule seul la quantité à partir du stop.",
      "Le stop est posé chez le courtier dès l'entrée (ordre bracket) : si le bot tombe, les positions restent protégées.",
      "Paper uniquement : l'URL du courtier est une constante du code, pas une variable d'environnement.",
      "Service systemd sur VPS, un tour toutes les 15 minutes, notifications et commandes Telegram ; le déploiement refuse de démarrer s'il manque une variable.",
    ],
    preuves: [
      { cle: "Tests", valeur: "108 (pytest)" },
      { cle: "Exploitation", valeur: "systemd, redémarrage automatique, .env en chmod 600" },
      { cle: "Traçabilité", valeur: "Chaque décision journalisée en JSONL" },
    ],
    pile: ["Python", "uv", "pytest", "API Alpaca", "Claude (CLI)", "Telegram", "systemd", "Linux"],
    domaines: ["data", "automatisation-ia", "devops"],
    statut: "en service",
    code: "privé",
    tests: 108,
    liens: [],
    captures: [],
    schema: {
      legende: "Pas d'interface web : la chaîne de décision, telle que décrite dans le README.",
      etapes: [
        { titre: "Alpaca", detail: "Compte paper, cours réels" },
        { titre: "Indicateurs", detail: "SMA, RSI, extrêmes" },
        { titre: "Claude", detail: "Propose, en JSON" },
        { titre: "risk.py", detail: "Valide et dimensionne" },
        { titre: "Ordre bracket", detail: "Stop posé chez le courtier" },
      ],
    },
    note: "Dépôt privé, argent fictif uniquement. Tourne en continu sur un VPS.",
  },
  {
    slug: "cap-ecole",
    nom: "Cap École",
    accroche:
      "Choisir une formation data pour la rentrée 2027 et préparer sa candidature, à partir de données sourcées et datées.",
    probleme:
      "Coûts, alternance, voies d'admission, dates limites : l'information sur les formations data est dispersée, souvent périmée, et rarement adaptée à un étudiant étranger déjà en France.",
    construit: [
      "Catalogue de 30 formations, dont 12 en Pays de la Loire et Bretagne, filtrable par type, région, alternance, coût, niveau et voie d'admission ; filtres dans l'URL.",
      "Comparateur de deux ou trois formations qui fonctionne sans JavaScript, via un formulaire GET.",
      "Calendrier 2027 et rétro-planning personnel : chaque échéance préparée à J-60, J-30, J-14 et J-3.",
      "Rien d'inventé : un champ inconnu vaut null et sa raison est consignée ; un test échoue si une formation n'a pas été revérifiée depuis 120 jours.",
    ],
    preuves: [
      { cle: "Tests", valeur: "71 (Vitest) : domaine, données, fraîcheur, composants" },
      { cle: "Données", valeur: "Validées par zod au build : une donnée invalide casse le build" },
      { cle: "Coût", valeur: "Aucune base de données, aucun service payant" },
    ],
    pile: ["Next.js 16", "React 19", "Tailwind CSS 4", "zod 4", "Vitest"],
    domaines: ["data", "full-stack"],
    statut: "en ligne",
    code: "privé",
    tests: 71,
    liens: [{ libelle: "cap-ecole.vercel.app", href: "https://cap-ecole.vercel.app", primaire: true }],
    captures: [
      {
        src: "/projets/cap-ecole-calendrier.webp",
        alt: "Rétro-planning : deux formations cochées et leurs échéances classées par mois.",
        legende: "Le rétro-planning : chaque échéance préparée à rebours.",
      },
      {
        src: "/projets/cap-ecole-formations.webp",
        alt: "Catalogue des formations data avec ses filtres.",
        legende: "Le catalogue de 30 formations et ses filtres.",
      },
      {
        src: "/projets/cap-ecole-accueil.webp",
        alt: "Accueil de Cap École.",
        legende: "L'accueil.",
      },
    ],
  },
];

/**
 * Projet en cours de construction, présenté sobrement : on n'annonce ni
 * pile ni chiffre tant qu'ils ne sont pas dans un dépôt.
 */
export const enConstruction = {
  nom: "Sillage",
  description:
    "Un SaaS de pilotage de recherche d'alternance, en cours de construction. Il sera présenté ici quand il aura un dépôt et une démo à montrer.",
  statut: "en cours" as const,
};

/**
 * Réalisations antérieures, présentées en format court. Les faits viennent
 * des dépôts et des sites concernés.
 */
export type ProjetBref = { nom: string; resume: string; pile: string; lien?: Lien };

export const autresProjets: ProjetBref[] = [
  {
    nom: "ELYAS",
    resume:
      "Site vitrine bilingue d'un photographe, avec un back-office maison pilotable depuis un téléphone. Livré au client.",
    pile: "Next.js · Firebase · next-intl",
    lien: { libelle: "elyas-one.vercel.app", href: "https://elyas-one.vercel.app" },
  },
  {
    nom: "Mon planning",
    resume:
      "Application Android qui lit un planning photographié et le redessine : heures totales, semaines ISO, chevauchements.",
    pile: "Expo · React Native · SQLite",
    lien: { libelle: "Code source", href: "https://github.com/RaoulBonsso/scan-planning" },
  },
  {
    nom: "ZenFlow",
    resume:
      "Application mobile de bien-être : méditation guidée, respiration animée, habitudes et série quotidienne. APK public.",
    pile: "Expo · React Native · Supabase",
    lien: { libelle: "Fiche et APK", href: "https://github.com/RaoulBonsso/zenflow-releases" },
  },
  {
    nom: "SyndicateNexus",
    resume:
      "Plateforme de microservices polyglottes (Node.js, Python, Java, Rust) qui orchestre des agents IA, construite en public.",
    pile: "Node.js · Python · Java · Rust · Docker",
    lien: { libelle: "Code source", href: "https://github.com/RaoulBonsso/syndicate-nexus" },
  },
];

/**
 * Bibliothèques écrites de zéro, sans dépendance runtime.
 * Dépôts locaux — pas encore publiés.
 */
export type Chantier = { nom: string; langage: string; description: string };

export const chantiers: Chantier[] = [
  {
    nom: "kvstore",
    langage: "Rust",
    description:
      "Key-value store persistant, log-structuré façon Bitcask : append-only, index en mémoire, intégrité vérifiée par CRC32.",
  },
  {
    nom: "taskqueue",
    langage: "Python",
    description:
      "File de tâches persistante sur SQLite : at-least-once, visibility timeout, file des messages morts, tests de concurrence entre processus.",
  },
  {
    nom: "rulekit",
    langage: "TypeScript",
    description:
      "Moteur de règles métier avec son propre langage : lexer, parser, AST et évaluateur écrits à la main.",
  },
];
