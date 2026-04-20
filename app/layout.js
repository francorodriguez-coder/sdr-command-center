import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Aerolab uses ABC Repro (proprietary Dinamo) + JetBrains Mono on aerolab.co.
// Inter is the closest free neo-grotesk; JetBrains Mono is an exact match.
const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "SDR Command Center | Aerolab",
  description: "Centro de control SDR — Pipeline, Campañas, Métricas",
  icons: {
    icon: "/aerolab-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[#0F0D0A] text-[#F9F7F1] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
