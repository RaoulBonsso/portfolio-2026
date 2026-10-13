"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Capture } from "@/content/projects";
import { indexVoisin } from "@/lib/projets-select";

/**
 * Galerie d'un projet : une capture principale dans un cadre de navigateur,
 * et des vignettes pour passer aux autres. Les vignettes sont de vrais
 * boutons (aria-pressed), donc la galerie se pilote entièrement au clavier.
 */
export function Galerie({
  nom,
  captures,
  adresse,
  prioritaire = false,
}: {
  nom: string;
  captures: Capture[];
  adresse: string;
  prioritaire?: boolean;
}) {
  const [courante, setCourante] = useState(0);
  const capture = captures[courante];
  const plusieurs = captures.length > 1;

  return (
    <figure className="flex flex-col gap-3">
      <div className="carte overflow-hidden !rounded-2xl">
        <div className="flex items-center gap-3 border-b border-trait bg-plan-2/60 px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-trait-fort" />
            <span className="size-2.5 rounded-full bg-trait-fort" />
            <span className="size-2.5 rounded-full bg-trait-fort" />
          </span>
          <span className="donnee min-w-0 flex-1 truncate rounded-md bg-papier px-2.5 py-0.5 text-center text-[0.6875rem] text-graphite">
            {adresse}
          </span>
          {plusieurs ? (
            <span className="flex gap-1">
              <BoutonVoisin
                libelle={`Capture précédente de ${nom}`}
                onClick={() => setCourante((i) => indexVoisin(i, captures.length, -1))}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </BoutonVoisin>
              <BoutonVoisin
                libelle={`Capture suivante de ${nom}`}
                onClick={() => setCourante((i) => indexVoisin(i, captures.length, 1))}
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </BoutonVoisin>
            </span>
          ) : null}
        </div>

        <div className="relative aspect-[16/10] bg-plan-2">
          <div key={capture.src} className="fondu absolute inset-0">
            <Image
              src={capture.src}
              alt={capture.alt}
              fill
              sizes="(min-width: 1152px) 640px, (min-width: 1024px) 56vw, 100vw"
              className="object-cover object-top"
              priority={prioritaire && courante === 0}
            />
          </div>
        </div>
      </div>

      <figcaption className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <p className="text-[0.9375rem] leading-snug text-graphite" aria-live="polite">
          <span className="donnee mr-2 text-[0.75rem] text-methylene">
            {courante + 1}/{captures.length}
          </span>
          {capture.legende}
        </p>
        {plusieurs ? (
          <div role="group" aria-label={`Captures de ${nom}`} className="flex shrink-0 gap-2">
            {captures.map((c, i) => (
              <button
                key={c.src}
                type="button"
                aria-pressed={i === courante}
                aria-label={`Capture ${i + 1} : ${c.legende}`}
                onClick={() => setCourante(i)}
                className={`relative h-11 w-[4.25rem] overflow-hidden rounded-lg border transition ${
                  i === courante
                    ? "border-methylene ring-2 ring-methylene/30"
                    : "border-trait opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={c.src} alt="" fill sizes="68px" className="object-cover object-top" />
              </button>
            ))}
          </div>
        ) : null}
      </figcaption>
    </figure>
  );
}

function BoutonVoisin({
  libelle,
  onClick,
  children,
}: {
  libelle: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={libelle}
      onClick={onClick}
      className="grid size-7 place-items-center rounded-md text-graphite transition-colors hover:bg-papier hover:text-carbone"
    >
      {children}
    </button>
  );
}
