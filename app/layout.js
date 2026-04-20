import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SDR Command Center | Aerolab",
  description: "Centro de control SDR - Pipeline, Campanas, Metricas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#0F0D0A] text-[#F9F7F1] antialiased">
        {children}
      </body>
    </html>
  );
}
