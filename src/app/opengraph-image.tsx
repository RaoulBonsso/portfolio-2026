import { ImageResponse } from "next/og";
import { projets } from "@/content/projects";
import { formaterNombre, indicateurs } from "@/lib/projets-select";

/**
 * Carte Open Graph — l'aperçu affiché quand le lien est partagé sur LinkedIn
 * ou collé dans un message à un recruteur. Elle dit l'essentiel sans clic :
 * le positionnement, la disponibilité, et deux chiffres calculés depuis le
 * contenu de la page.
 */
export const alt =
  "Raoul Bonsso — développeur full stack, DevOps et data, disponible en alternance dès novembre 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPIER = "#0c1014";
const CARBONE = "#e6eaec";
const GRAPHITE = "#8f99a3";
const METHYLENE = "#74bde2";
const OCRE = "#dba75a";
const TRAIT = "#212a32";

export default function Image() {
  const chiffres = indicateurs(projets);

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
          backgroundImage: `radial-gradient(circle at 10% 0%, rgba(116,189,226,0.22), transparent 45%), radial-gradient(circle at 95% 10%, rgba(219,167,90,0.14), transparent 40%)`,
          color: CARBONE,
          padding: "68px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Raoul Bonsso</div>
            <div style={{ fontSize: 17, color: GRAPHITE, letterSpacing: 3, marginTop: 8 }}>
              FULL STACK · DEVOPS · DATA
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 19,
              color: CARBONE,
              border: `1px solid ${TRAIT}`,
              borderRadius: 999,
              padding: "10px 22px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#55c093", marginRight: 12 }} />
            Alternance dès novembre 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 74, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
          <div style={{ display: "flex" }}>Des systèmes qui tournent</div>
          <div style={{ display: "flex", color: METHYLENE }}>en production.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, backgroundColor: TRAIT, marginBottom: 26 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
            {[
              [`${formaterNombre(chiffres.tests)} tests`, "exécutés sur mes projets"],
              [`${chiffres.enLigne} démos`, "en ligne"],
              ["1 sem. / 3 sem.", "école / entreprise"],
              ["Nantes", "Sup de Vinci, Bac+5"],
            ].map(([titre, detail]) => (
              <div key={titre} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ color: OCRE, fontWeight: 600 }}>{titre}</div>
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
