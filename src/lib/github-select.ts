/**
 * Transformation des données GitHub — fonctions pures, sans réseau.
 *
 * Tout ce qui décide *quoi montrer* vit ici plutôt que dans la couche de
 * récupération : c'est la partie qui contient des règles, donc la partie
 * qui mérite des tests. La couche réseau, elle, reste bête.
 */

export type LangageBrut = { size: number; node: { name: string; color: string | null } };

export type DepotBrut = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  isArchived: boolean;
  isFork: boolean;
  pushedAt: string;
  stargazerCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  languages: { edges: LangageBrut[] };
};

export type Depot = {
  nom: string;
  description: string | null;
  url: string;
  siteWeb: string | null;
  pousseLe: string;
  etoiles: number;
  langage: { nom: string; couleur: string | null } | null;
};

export type Langage = {
  nom: string;
  couleur: string | null;
  octets: number;
  depots: number;
  part: number;
};

export type Jour = { date: string; compte: number; niveau: 0 | 1 | 2 | 3 | 4 };
export type Calendrier = { jours: Jour[]; max: number; semaines: number };

/** Un dépôt sans description, sans langage et sans étoile n'apprend rien à personne. */
function estPresentable(depot: DepotBrut): boolean {
  if (depot.isFork || depot.isArchived) return false;
  return Boolean(depot.description?.trim() || depot.primaryLanguage || depot.stargazerCount > 0);
}

export function selectionnerDepots(
  bruts: DepotBrut[],
  { limite, exclure = [] }: { limite: number; exclure?: string[] },
): Depot[] {
  const exclus = new Set(exclure.map((nom) => nom.toLowerCase()));

  return bruts
    .filter(estPresentable)
    .filter((depot) => !exclus.has(depot.name.toLowerCase()))
    .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt))
    .slice(0, limite)
    .map((depot) => ({
      nom: depot.name,
      description: depot.description?.trim() || null,
      url: depot.url,
      siteWeb: depot.homepageUrl?.trim() || null,
      pousseLe: depot.pushedAt,
      etoiles: depot.stargazerCount,
      langage: depot.primaryLanguage
        ? { nom: depot.primaryLanguage.name, couleur: depot.primaryLanguage.color }
        : null,
    }));
}

export function agregerLangages(bruts: DepotBrut[]): Langage[] {
  const cumul = new Map<string, { couleur: string | null; octets: number; depots: number }>();

  for (const depot of bruts) {
    if (depot.isFork || depot.isArchived) continue;
    for (const { size, node } of depot.languages.edges) {
      const courant = cumul.get(node.name) ?? { couleur: node.color, octets: 0, depots: 0 };
      courant.octets += size;
      courant.depots += 1;
      courant.couleur ??= node.color;
      cumul.set(node.name, courant);
    }
  }

  const total = [...cumul.values()].reduce((somme, l) => somme + l.octets, 0);
  if (total === 0) return [];

  return [...cumul.entries()]
    .map(([nom, l]) => ({ nom, ...l, part: Math.round((l.octets / total) * 100) }))
    .sort((a, b) => b.octets - a.octets);
}

/**
 * Quatre niveaux d'intensité pour les jours actifs, un cinquième (0) pour
 * l'inactivité. Le seuil est relatif au jour le plus dense de l'année :
 * une échelle absolue rendrait le calendrier illisible d'un profil à l'autre.
 */
export function construireCalendrier(
  semaines: { contributionDays: { date: string; contributionCount: number }[] }[],
): Calendrier {
  const brut = semaines.flatMap((s) => s.contributionDays);
  if (brut.length === 0) return { jours: [], max: 0, semaines: 0 };

  const max = brut.reduce((m, j) => Math.max(m, j.contributionCount), 0);

  const jours: Jour[] = brut.map(({ date, contributionCount }) => {
    if (contributionCount === 0 || max === 0) return { date, compte: contributionCount, niveau: 0 };
    const rang = Math.ceil((contributionCount / max) * 4);
    return { date, compte: contributionCount, niveau: Math.min(4, Math.max(1, rang)) as 1 | 2 | 3 | 4 };
  });

  return { jours, max, semaines: semaines.length };
}

const MINUTE = 60_000;
const HEURE = 60 * MINUTE;
const JOUR = 24 * HEURE;
const MOIS = 30 * JOUR;
const AN = 365 * JOUR;

export function tempsRelatif(iso: string, maintenant: Date = new Date()): string {
  const delta = maintenant.getTime() - Date.parse(iso);
  if (delta < MINUTE) return "à l'instant";
  if (delta < HEURE) return `il y a ${Math.floor(delta / MINUTE)} min`;
  if (delta < JOUR) return `il y a ${Math.floor(delta / HEURE)} h`;
  if (delta < MOIS) return `il y a ${Math.floor(delta / JOUR)} j`;
  if (delta < AN) {
    const mois = Math.floor(delta / MOIS);
    return `il y a ${mois} mois`;
  }
  const ans = Math.floor(delta / AN);
  return `il y a ${ans} ${ans > 1 ? "ans" : "an"}`;
}
