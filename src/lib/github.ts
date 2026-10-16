import "server-only";

import {
  agregerLangages,
  construireCalendrier,
  selectionnerDepots,
  type Calendrier,
  type Depot,
  type DepotBrut,
  type Langage,
} from "./github-select";

/**
 * Couche réseau — volontairement mince.
 *
 * Le jeton ne quitte jamais le serveur : ce module importe `server-only`,
 * ce qui fait échouer la compilation si un composant client tente de
 * l'importer. C'est une garantie du compilateur, pas une convention.
 *
 * Une seule requête GraphQL rapporte profil, dépôts, langages et calendrier
 * de contributions. La variante REST aurait demandé un appel par dépôt pour
 * les langages — 75 requêtes contre une.
 */

const LOGIN = "RaoulBonsso";
const REVALIDATION_SECONDES = 3600;

export type Instantane = {
  /** false = l'API n'a pas répondu ; la page se replie sur des valeurs neutres. */
  direct: boolean;
  login: string;
  nom: string | null;
  avatar: string | null;
  url: string;
  membreDepuis: string | null;
  depotsPublics: number;
  abonnes: number;
  commitsAnnee: number;
  pullRequestsAnnee: number;
  contributionsAnnee: number;
  depots: Depot[];
  langages: Langage[];
  calendrier: Calendrier;
  recupereLe: string;
};

const REQUETE = `
query Instantane($login: String!) {
  user(login: $login) {
    login
    name
    avatarUrl
    url
    createdAt
    followers { totalCount }
    repositories(
      first: 100
      ownerAffiliations: OWNER
      privacy: PUBLIC
      isFork: false
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      totalCount
      nodes {
        name
        description
        url
        homepageUrl
        isArchived
        isFork
        pushedAt
        stargazerCount
        primaryLanguage { name color }
        languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

/** Dépôts déjà racontés en détail plus haut dans la page : inutile de les répéter. */
const DEJA_PRESENTES = [
  "aiguillage",
  "zenflow",
  "zenflow-releases",
  "syndicate-nexus",
  "scan-planning",
];

const instantaneVide: Instantane = {
  direct: false,
  login: LOGIN,
  nom: null,
  avatar: null,
  url: `https://github.com/${LOGIN}`,
  membreDepuis: null,
  depotsPublics: 0,
  abonnes: 0,
  commitsAnnee: 0,
  pullRequestsAnnee: 0,
  contributionsAnnee: 0,
  depots: [],
  langages: [],
  calendrier: { jours: [], max: 0, semaines: 0 },
  recupereLe: new Date(0).toISOString(),
};

export async function chargerInstantane(): Promise<Instantane> {
  const jeton = process.env.GITHUB_TOKEN;
  if (!jeton) {
    console.warn("[github] GITHUB_TOKEN absent — la section temps réel se replie.");
    return { ...instantaneVide, recupereLe: new Date().toISOString() };
  }

  try {
    const reponse = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${jeton}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-raoul-bonsso",
      },
      body: JSON.stringify({ query: REQUETE, variables: { login: LOGIN } }),
      next: { revalidate: REVALIDATION_SECONDES, tags: ["github"] },
    });

    if (!reponse.ok) throw new Error(`GitHub a répondu ${reponse.status}`);

    const charge = (await reponse.json()) as {
      data?: { user?: UtilisateurGraphQL | null };
      errors?: { message: string }[];
    };

    if (charge.errors?.length) throw new Error(charge.errors.map((e) => e.message).join(" · "));
    const utilisateur = charge.data?.user;
    if (!utilisateur) throw new Error("Utilisateur introuvable");

    return depuisGraphQL(utilisateur);
  } catch (erreur) {
    console.error("[github] récupération impossible :", erreur);
    return { ...instantaneVide, recupereLe: new Date().toISOString() };
  }
}

type UtilisateurGraphQL = {
  login: string;
  name: string | null;
  avatarUrl: string;
  url: string;
  createdAt: string;
  followers: { totalCount: number };
  repositories: { totalCount: number; nodes: DepotBrut[] };
  contributionsCollection: {
    totalCommitContributions: number;
    totalPullRequestContributions: number;
    contributionCalendar: {
      totalContributions: number;
      weeks: { contributionDays: { date: string; contributionCount: number }[] }[];
    };
  };
};

function depuisGraphQL(u: UtilisateurGraphQL): Instantane {
  const noeuds = u.repositories.nodes ?? [];
  const contributions = u.contributionsCollection;

  return {
    direct: true,
    login: u.login,
    nom: u.name,
    avatar: u.avatarUrl,
    url: u.url,
    membreDepuis: u.createdAt,
    depotsPublics: u.repositories.totalCount,
    abonnes: u.followers.totalCount,
    commitsAnnee: contributions.totalCommitContributions,
    pullRequestsAnnee: contributions.totalPullRequestContributions,
    contributionsAnnee: contributions.contributionCalendar.totalContributions,
    depots: selectionnerDepots(noeuds, { limite: 6, exclure: DEJA_PRESENTES }),
    langages: agregerLangages(noeuds).slice(0, 8),
    calendrier: construireCalendrier(contributions.contributionCalendar.weeks),
    recupereLe: new Date().toISOString(),
  };
}
