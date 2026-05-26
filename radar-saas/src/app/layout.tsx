import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RADAR | Enterprise Visibility Intelligence",
  description:
    "RADAR is an enterprise command system for reputation, authority, discovery, analytics, and response."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
