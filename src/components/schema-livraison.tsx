import {
  Boxes,
  Bot,
  CodeXml,
  Database,
  FileText,
  FlaskConical,
  Server,
  type LucideIcon,
} from "lucide-react";

type Noeud = {
  id: string;
  x: number;
  y: number;
  Icone: LucideIcon;
  titre: string;
  sous: string;
  couleur: string;
};

const L = 146;
const H = 58;

/**
 * La chaîne de livraison, de la spécification à l'exploitation.
 * Chaque nœud nomme des outils réellement utilisés dans les projets présentés
 * plus bas ; le nombre de tests vient du contenu, pas d'une constante.
 */
function noeuds(tests: string): Noeud[] {
  return [
    { id: "a", x: 8, y: 121, Icone: FileText, titre: "Spécifier", sous: "OpenAPI · zod", couleur: "var(--ocre)" },
    { id: "b", x: 186, y: 121, Icone: CodeXml, titre: "Construire", sous: "Next.js · Node", couleur: "var(--methylene)" },
    { id: "c", x: 364, y: 121, Icone: FlaskConical, titre: "Tester", sous: `${tests} tests`, couleur: "var(--libre)" },
    { id: "d", x: 542, y: 121, Icone: Boxes, titre: "Livrer", sous: "Docker · CI/CD", couleur: "var(--methylene)" },
    { id: "e", x: 722, y: 14, Icone: Server, titre: "Exploiter", sous: "VPS · Vercel", couleur: "var(--methylene)" },
    { id: "f", x: 722, y: 121, Icone: Database, titre: "Données", sous: "Firestore · SQL", couleur: "var(--ocre)" },
    { id: "g", x: 722, y: 228, Icone: Bot, titre: "Automatiser", sous: "n8n · LLM", couleur: "var(--libre)" },
  ];
}

const LIENS: [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
  ["d", "f"],
  ["d", "g"],
];

function chemin(s: Noeud, c: Noeud) {
  const x1 = s.x + L;
  const y1 = s.y + H / 2;
  const x2 = c.x;
  const y2 = c.y + H / 2;
  const dx = (x2 - x1) / 2;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

export function SchemaLivraison({ tests }: { tests: string }) {
  const liste = noeuds(tests);
  const par = Object.fromEntries(liste.map((n) => [n.id, n]));
  const description = `Ma chaîne de livraison : spécifier (OpenAPI, zod), construire (Next.js, Node, Python), tester (${tests} tests), livrer (Docker, CI/CD), puis exploiter sur VPS Linux et Vercel, gérer les données (Firestore, PostgreSQL) et automatiser (n8n, LLM).`;

  return (
    <>
      {/* Écran large : le schéma complet. */}
      <svg
        viewBox="0 0 876 300"
        className="hidden w-full sm:block"
        role="img"
        aria-label={description}
      >
        <defs>
          <linearGradient id="trace-livraison" x1="0" x2="1">
            <stop offset="0" stopColor="var(--ocre)" />
            <stop offset="1" stopColor="var(--methylene)" />
          </linearGradient>
        </defs>

        {LIENS.map(([s, c], i) => {
          const d = chemin(par[s], par[c]);
          return (
            <g key={`${s}${c}`}>
              <path d={d} fill="none" stroke="var(--trait-fort)" strokeWidth={1.5} />
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="url(#trace-livraison)"
                strokeWidth={2.25}
                strokeLinecap="round"
                className="trace-dessin"
                style={{ animationDelay: `${350 + Math.min(i, 3) * 300}ms` }}
              />
              <circle r={3.5} fill="var(--ocre)" opacity={0} className="point-flux">
                  <set attributeName="opacity" to="1" begin={`${1.7 + Math.min(i, 3) * 0.35}s`} />
                  <animateMotion
                    dur="2.6s"
                    begin={`${1.7 + Math.min(i, 3) * 0.35}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
            </g>
          );
        })}

        {liste.map((n, i) => (
          <g key={n.id} className="noeud-apparition" style={{ animationDelay: `${100 + Math.min(i, 4) * 220}ms` }}>
            <rect x={n.x} y={n.y} width={L} height={H} rx={13} fill="var(--plan)" stroke="var(--trait-fort)" />
            <foreignObject x={n.x} y={n.y} width={L} height={H}>
              <div className="flex h-full items-center gap-2.5 px-2.5">
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-lg"
                  style={{ background: `color-mix(in oklab, ${n.couleur} 16%, transparent)`, color: n.couleur }}
                >
                  <n.Icone className="size-4" aria-hidden="true" />
                </span>
                <span className="interface flex min-w-0 flex-col leading-tight">
                  <span className="text-[13px] font-semibold text-carbone">{n.titre}</span>
                  <span className="truncate text-[10.5px] text-graphite">{n.sous}</span>
                </span>
              </div>
            </foreignObject>
          </g>
        ))}
      </svg>

      {/* Téléphone : la même chaîne, lue de haut en bas. */}
      <ol className="relative flex flex-col gap-2.5 sm:hidden" aria-label="Ma chaîne de livraison">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-[1.45rem] w-px bg-trait-fort" />
        {liste.map((n, i) => (
          <li
            key={n.id}
            style={{ animationDelay: `${100 + i * 80}ms` }}
            className="lever relative flex items-center gap-3 rounded-xl border border-trait bg-plan px-2.5 py-2"
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-lg"
              style={{ background: `color-mix(in oklab, ${n.couleur} 16%, var(--plan))`, color: n.couleur }}
            >
              <n.Icone className="size-4" aria-hidden="true" />
            </span>
            <span className="interface flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <span className="text-sm font-semibold">{n.titre}</span>
              <span className="truncate text-xs text-graphite">{n.sous}</span>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
