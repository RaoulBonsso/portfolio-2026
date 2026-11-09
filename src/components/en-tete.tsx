import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { BasculeTheme } from "./bascule-theme";

export type Section = { id: string; libelle: string };

/**
 * En-tête collant : le nom, les sections, le thème, et le CV toujours à un
 * clic. Sur un téléphone, seules les trois dernières tiennent — le CV reste.
 */
export function EnTete({ sections }: { sections: Section[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-trait bg-papier/80 backdrop-blur-xl">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        <a href="#haut" className="interface flex min-w-0 items-center gap-2.5 font-semibold">
          <Monogramme />
          <span className="truncate text-[0.9375rem]">{profile.nom}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="interface hidden items-center gap-1 text-sm text-graphite md:flex">
            {sections.map(({ id, libelle }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-plan-2 hover:text-carbone"
                >
                  {libelle}
                </a>
              </li>
            ))}
          </ul>
          <BasculeTheme />
          <a
            href={profile.contact.cv}
            target="_blank"
            rel="noreferrer"
            className="interface inline-flex h-9 items-center gap-2 rounded-lg bg-carbone px-3.5 text-sm font-medium text-papier transition-opacity hover:opacity-85"
          >
            <Download aria-hidden="true" className="size-3.5" />
            CV<span className="sr-only"> de Raoul Bonsso (PDF, nouvel onglet)</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

/** Monogramme : les initiales en chasse fixe, sur un carré d'encre, avec un repère ocre. */
export function Monogramme({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="var(--carbone)" />
      <text
        x="15"
        y="20.5"
        textAnchor="middle"
        fill="var(--papier)"
        fontSize="13"
        fontWeight="600"
        fontFamily="var(--police-mono), ui-monospace, monospace"
        letterSpacing="-0.5"
      >
        RB
      </text>
      <rect x="22.5" y="22.5" width="4" height="4" rx="1" fill="var(--ocre)" />
    </svg>
  );
}
