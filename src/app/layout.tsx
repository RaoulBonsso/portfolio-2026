import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import { DESCRIPTION, SITE, TITRE } from "@/lib/site";
import "./globals.css";

/**
 * Trois rôles, trois familles.
 * Archivo — grotesque de signalétique, pour le titrage et l'interface.
 * Newsreader — sérif de lecture, pour le corps et l'accent italique des
 *   titres : la page doit se lire comme un document.
 * JetBrains Mono — chiffres et étiquettes, chasse fixe pour aligner
 *   les colonnes de données.
 */
const display = Archivo({
  variable: "--police-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--police-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--police-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITRE, template: "%s · Raoul Bonsso" },
  description: DESCRIPTION,
  keywords: [
    "alternance développeur full stack",
    "alternance DevOps",
    "alternance Nantes",
    "développeur full stack",
    "DevOps",
    "data",
    "automatisation n8n",
    "Next.js",
    "TypeScript",
    "Python",
    "Docker",
  ],
  authors: [{ name: "Raoul Bonsso", url: "https://github.com/RaoulBonsso" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "/",
    title: TITRE,
    description:
      "Alternance dès novembre 2026, 1 semaine école / 3 semaines entreprise. Applications web, API, DevOps, données et automatisations IA pour PME.",
    siteName: "Raoul Bonsso",
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description:
      "Alternance dès novembre 2026. Applications web, API, DevOps, données et automatisations IA pour PME.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ebeae4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1014" },
  ],
};

/**
 * Applique le thème choisi avant le premier rendu. Sans ce script bloquant,
 * un visiteur en thème sombre verrait un éclair blanc au chargement.
 */
const AMORCE_THEME = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${display.variable} ${serif.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: AMORCE_THEME }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
