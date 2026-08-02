# Portfolio — Raoul Bonsso

Portfolio personnel, branché sur l'API GitHub en temps réel.
Développeur full-stack en recherche d'alternance.

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
  tests annoncés ont été obtenus en exécutant les suites concernées.
- **Aucun fait de parcours n'est inventé.** Un champ non renseigné est masqué
  (voir « Champs à compléter » ci-dessous), jamais rempli d'une valeur plausible.

## Architecture

```
src/
  app/
    layout.tsx        polices, métadonnées, amorce du thème avant premier rendu
    page.tsx          composant serveur, ISR horaire, assemble les sections
  lib/
    github.ts         couche réseau — `server-only`, une requête GraphQL
    github-select.ts  transformation pure des données (testée)
  content/
    profile.ts        faits de profil, marqueur A_COMPLETER si inconnu
    projects.ts       projets, chaque affirmation sourcée du dépôt
    completude.ts     masque en production ce qui n'est pas renseigné
  components/         sections, toutes en composant serveur sauf 4 îlots clients
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
npm test             # 27 tests, logique de sélection et de complétude
npx tsc --noEmit     # vérification de types
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
| `formation.periode` | Années du Master 1 (ex. `2025 – 2026`) |
| `formation.specialite` | Intitulé exact de la spécialité |
| `disponibilite.rythme` | Rythme de l'alternance (ex. `3 semaines / 1 semaine`) |
| `disponibilite.debut` | Date de démarrage souhaitée |
| `disponibilite.zone` | Zone géographique / mobilité |
| `contact.linkedin` | URL du profil LinkedIn |
| `contact.cv` | URL du CV en PDF |

Renseigner un champ suffit à le faire apparaître sur la page.

## Licence

MIT
