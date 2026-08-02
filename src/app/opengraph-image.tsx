import { ImageResponse } from "next/og";

/**
 * Carte Open Graph — l'aperçu affiché quand le lien est partagé sur LinkedIn
 * ou collé dans un message à un recruteur.
 *
 * Elle reprend le registre « plan technique » du site : fond carbone, filet
 * méthylène, données en chasse fixe. Générée à la compilation puis mise en
 * cache — aucun coût au partage.
 */
export const alt = "Raoul Bonsso — Développeur full-stack, en recherche d'alternance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPIER = "#0e1216";
const CARBONE = "#e4e8ea";
const GRAPHITE = "#8a949e";
const METHYLENE = "#6bb3d8";
const TRAIT = "#222a31";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPIER,
          color: CARBONE,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: -0.5 }}>Raoul Bonsso</div>
            <div style={{ fontSize: 17, color: GRAPHITE, letterSpacing: 3, marginTop: 8 }}>
              DÉVELOPPEUR FULL-STACK
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 17,
              color: METHYLENE,
              border: `1px solid ${TRAIT}`,
              padding: "10px 18px",
            }}
          >
            En recherche d&apos;alternance
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.06,
          }}
        >
          <div style={{ display: "flex" }}>Je construis des</div>
          <div style={{ display: "flex" }}>systèmes, pas des écrans.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, backgroundColor: TRAIT, marginBottom: 28 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 19 }}>
            {[
              ["API contractuelle", "OpenAPI avant le code"],
              ["Mobile", "Expo · React Native"],
              ["Méthode", "Tests d'abord"],
              ["Données", "GitHub en direct"],
            ].map(([titre, detail]) => (
              <div key={titre} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ color: CARBONE }}>{titre}</div>
                <div style={{ color: GRAPHITE, fontSize: 16, marginTop: 6 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
