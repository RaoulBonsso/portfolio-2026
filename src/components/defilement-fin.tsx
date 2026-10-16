"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Conteneur à défilement horizontal positionné sur sa fin au montage.
 *
 * Le calendrier de contributions se lit de gauche (il y a un an) à droite
 * (aujourd'hui). Sur un écran étroit, laisser le défilement à zéro montrerait
 * l'automne dernier — l'information la moins utile. On ouvre donc sur la
 * droite. Le contenu reste enfermé dans son conteneur : la page elle-même
 * ne défile jamais latéralement.
 */
export function DefilementFin({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const noeud = conteneur.current;
    if (noeud) noeud.scrollLeft = noeud.scrollWidth;
  }, []);

  return (
    <div
      ref={conteneur}
      role="group"
      aria-label={label}
      tabIndex={0}
      className={`overflow-x-auto ${className}`}
    >
      {children}
    </div>
  );
}
