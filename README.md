# Portfolio — Raoul Bonsso

Portfolio personnel, branché sur l'API GitHub en temps réel.
Développeur full stack & DevOps (data, automatisation et IA pour PME), en recherche
d'alternance dès novembre 2026 — rythme 1 semaine école / 3 semaines entreprise.

**En ligne :** https://portfolio-2026-lake-iota.vercel.app

---

## Le parti pris

Un portfolio peut affirmer n'importe quoi. Celui-ci essaie de n'afficher que
des choses vérifiables :

- **Les chiffres viennent de l'API GitHub**, pas d'un fichier de configuration.
  Contributions, commits, pull requests, répartition des langages et calendrier
  d'activité sont relus toutes les heures depuis `api.github.com/graphql`.
- **La répartition des langages est calculée sur le volume réel de code** des
  dépôts publics — pas sur une liste de logos choisie pour faire bonne impression.
- **Chaque chiffre cité sur un projet provient de son dépôt.** Les nombres de
  tests annoncés ont été obtenus en exécutant les suites concernées (relevé du
  13 octobre 2026). Le total affiché en haut de page est *calculé* depuis les
  fiches (`lib/projets-select.ts`), jamais saisi à part.
- **Les captures sont réelles.** Prises sur les sites en ligne (Playwright,
  1440 × 900, webp < 200 Ko dans `public/projets/`). Un projet sans interface
  publique montre un schéma de fonctionnement tiré de son README, et un dépôt
  privé est annoncé comme tel.
- **Les expériences reprennent le CV.** Formulées en apport et en résultat,
  sans fait ni chiffre ajouté ; la page précise que ces résultats sont déclarés.
- **Aucun fait de parcours n'est inventé.** Un champ non renseigné est masqué
  (voir « Champs à compléter » ci-dessous), jamais rempli d'une valeur plausible.

## Architecture

```
src/
  app/
    layout.tsx          polices, métadonnées, amorce du thème avant premier rendu
    page.tsx            composant serveur, ISR horaire, JSON-LD, assemble les sections
    opengraph-image.tsx carte de partage, chiffres calculés depuis le contenu
  lib/
    github.ts           couche réseau — `server-only`, une requête GraphQL
    github-select.ts    transformation pure des données GitHub (testée)
    projets-select.ts   filtres, comptages et indicateurs des projets (testée)
  content/
    profile.ts          positionnement, disponibilité, axes, principes
    projects.ts         projets : problème, construit, preuves, captures
    parcours.ts         expériences et formation, d'après le CV
    completude.ts       masque en production ce qui n'est pas renseigné
    contenu.test.ts     cohérence : captures présentes et < 200 Ko, liens, honnêteté
  components/           sections serveur ; îlots clients : thème, révélations,
                        schéma animé (motion), catalogue filtrable, galerie
```

Deux règles structurent le découpage :

1. **Ce qui décide *quoi montrer* est séparé de ce qui *va chercher*.** La
   sélection des dépôts, l'agrégation des langages et la construction du
   calendrier sont des fonctions pures — donc testables sans réseau. La couche
   réseau reste bête.
2. **Le jeton ne quitte jamais le serveur.** `lib/github.ts` importe
   `server-only` : une importation depuis un composant client fait échouer la
   compilation. C'est une garantie du compilateur, pas une convention d'équipe.

## Développement

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # 53 tests : sélection GitHub, projets, complétude, contenu
npm run typecheck    # vérification de types
npm run lint
```

### Variable d'environnement

Une seule, et elle est optionnelle en local :

```bash
GITHUB_TOKEN=...     # jeton GitHub à portée lecture publique
```

Sans elle, la page s'affiche et la section GitHub se replie proprement sur un
état « flux indisponible » — elle ne plante pas. Le jeton n'est jamais commité :
`.gitignore` couvre `.env*`.

## Champs à compléter

Les informations de parcours non confirmées portent le marqueur `A_COMPLETER`
dans `src/content/profile.ts`. Elles sont **masquées en production** et
**listées en développement** dans un panneau d'audit en bas de page.

| Champ | Ce qu'il attend |
|---|---|
| `disponibilite.mobilite` | Mobilité au-delà de Nantes (le CV ne la précise pas) |

Les autres champs (formation, rythme, début, LinkedIn, CV) sont renseignés
depuis le CV d'octobre 2026. Le CV est servi par le site recruteur
(`raoul-bonsso-alternance.vercel.app/cv-raoul-bonsso.pdf`).

Renseigner un champ suffit à le faire apparaître sur la page.

## Licence

MIT
