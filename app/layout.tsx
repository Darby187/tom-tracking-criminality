import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Days Without Criminal",
  description: "Tracking the streak. Don't blow it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Share+Tech+Mono&family=Oswald:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
