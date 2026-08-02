import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

/**
 * Trois rôles, trois familles.
 * Archivo — grotesque de signalétique, pour le titrage.
 * Newsreader — sérif de lecture, pour le corps : la page doit se lire
 *   comme un document, pas comme une page d'atterrissage.
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
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--police-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/**
 * URL de production réelle. Elle sert de base à `metadataBase` : sans elle,
 * les URL Open Graph et canoniques seraient relatives, donc inexploitables
 * par LinkedIn ou par un aperçu de lien.
 */
const SITE = "https://portfolio-2026-lake-iota.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Raoul Bonsso — Développeur full-stack",
    template: "%s · Raoul Bonsso",
  },
  description:
    "Développeur full-stack en recherche d'alternance. API contractuelles, applications mobiles Expo, systèmes distribués. Projets et activité GitHub en direct.",
  keywords: [
    "développeur full-stack",
    "alternance",
    "Next.js",
    "React Native",
    "Expo",
    "TypeScript",
    "Python",
    "Rust",
    "OpenAPI",
  ],
  authors: [{ name: "Raoul Bonsso", url: "https://github.com/RaoulBonsso" }],
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    title: "Raoul Bonsso — Développeur full-stack",
    description:
      "API contractuelles, applications mobiles, systèmes distribués. En recherche d'alternance.",
    siteName: "Raoul Bonsso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raoul Bonsso — Développeur full-stack",
    description:
      "API contractuelles, applications mobiles, systèmes distribués. En recherche d'alternance.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e8e2" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1216" },
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
      <body className="min-h-full">
        <div className="trame" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
