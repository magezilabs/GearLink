import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GearLink | Rural & Commercial Equipment Sharing Platform",
  description: "Rent agricultural, construction, water, and industrial equipment near you. Powered by escrow payments, youth logistics agents, and governance oversight.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col gl-body" style={{ background:"var(--c-paper)", color:"var(--c-ink)" }}>
        {children}
      </body>
    </html>
  );
}
