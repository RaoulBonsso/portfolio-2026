import { ImageResponse } from "next/og";

/**
 * Favicon monogramme, généré à la compilation.
 *
 * Remplace l'icône par défaut de Create Next App : garder le logo Next.js
 * dans l'onglet d'un portfolio personnel donne l'impression d'un gabarit
 * qu'on n'a pas fini de personnaliser.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e1216",
          color: "#6bb3d8",
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: -1,
          fontFamily: "sans-serif",
        }}
      >
        RB
      </div>
    ),
    { ...size },
  );
}
