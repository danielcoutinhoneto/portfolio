import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://danielcoutinhoneto.github.io/portfolio";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join("; ");

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daniel Coutinho | Desenvolvedor .NET",
    template: "%s | Daniel Coutinho"
  },
  description:
    "Portfólio de Daniel Coutinho Neto, desenvolvedor .NET Full Stack com foco em C#, ASP.NET Core, SQL Server, APIs REST e aplicações corporativas.",
  keywords: [
    "Daniel Coutinho",
    "Desenvolvedor .NET",
    "Desenvolvedor C#",
    "ASP.NET Core",
    "SQL Server",
    "Full Stack .NET",
    "Backend .NET",
    "APIs REST"
  ],
  authors: [{ name: "Daniel Coutinho Neto" }],
  creator: "Daniel Coutinho Neto",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "Daniel Coutinho | Desenvolvedor .NET",
    description:
      "C#, ASP.NET Core, SQL Server e APIs REST para transformar demandas de negócio em software confiável.",
    siteName: "Portfólio Daniel Coutinho",
    images: [
      {
        url: "/og-card.svg",
        width: 1200,
        height: 630,
        alt: "Daniel Coutinho — Desenvolvedor .NET"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Coutinho | Desenvolvedor .NET",
    description:
      "Desenvolvedor .NET Full Stack com foco em back-end e aplicações corporativas.",
    images: ["/og-card.svg"]
  },
  icons: {
    icon: "/favicon.svg"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08111f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7fb" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        )}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>{children}</body>
    </html>
  );
}
