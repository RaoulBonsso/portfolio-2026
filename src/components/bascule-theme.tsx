"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const PREFERENCE_SOMBRE = "(prefers-color-scheme: dark)";

/**
 * Basculeur clair/sombre sans dépendance.
 *
 * La source de vérité est le DOM — l'attribut `data-theme` posé par le
 * script d'amorce du layout avant le premier rendu. React ne duplique pas
 * cet état, il s'y abonne via `useSyncExternalStore` : c'est exactement le
 * cas d'usage de ce hook, lire un état qui vit en dehors de React.
 *
 * L'alternative — un `useState` alimenté dans un `useEffect` — obligeait à
 * tenir l'état à deux endroits et déclenchait un rendu en cascade après
 * l'hydratation. `getServerSnapshot` renvoie `null` : le serveur ne connaît
 * ni le `localStorage` ni la préférence système, donc il n'affiche aucune
 * icône plutôt que d'en deviner une et de provoquer un écart d'hydratation.
 */
function souscrire(signaler: () => void) {
  const media = window.matchMedia(PREFERENCE_SOMBRE);
  const observateur = new MutationObserver(signaler);

  media.addEventListener("change", signaler);
  observateur.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    media.removeEventListener("change", signaler);
    observateur.disconnect();
  };
}

function lireClient(): Theme {
  const pose = document.documentElement.dataset.theme as Theme | undefined;
  if (pose) return pose;
  return window.matchMedia(PREFERENCE_SOMBRE).matches ? "dark" : "light";
}

/** Le serveur ne peut pas connaître le thème : il ne prétend rien. */
function lireServeur(): null {
  return null;
}

export function BasculeTheme() {
  const theme = useSyncExternalStore(souscrire, lireClient, lireServeur);
  const sombre = theme === "dark";

  function basculer() {
    const suivant: Theme = sombre ? "light" : "dark";
    // Écrire dans le DOM suffit : la souscription ci-dessus relit et re-rend.
    document.documentElement.dataset.theme = suivant;
    try {
      localStorage.setItem("theme", suivant);
    } catch {
      /* navigation privée : le thème vaut pour la session, c'est suffisant */
    }
  }

  return (
    <button
      type="button"
      onClick={basculer}
      aria-label={sombre ? "Passer en thème clair" : "Passer en thème sombre"}
      title={sombre ? "Thème clair" : "Thème sombre"}
      className="group inline-flex h-8 w-8 items-center justify-center border border-trait text-graphite transition-colors hover:border-trait-fort hover:text-carbone"
    >
      <span className="sr-only">{sombre ? "Thème clair" : "Thème sombre"}</span>
      <svg
        viewBox="0 0 24 24"
        className="h-[15px] w-[15px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {theme === null ? null : sombre ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
        )}
      </svg>
    </button>
  );
}
