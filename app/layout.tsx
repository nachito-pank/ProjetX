import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Layout  from "@/components/common/Layout"; 
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ECES",
  description: "Plateforme ECES en ligne",
};

const getUser = () => {
  return {
    role: 'sous-admin' as const,  // 'admin' | 'sous-admin' | 'enseignant' | 'etudiant' | 'visitor'
    name: 'Marty Ngouono',
    avatar: ''  
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUser(); // À remplacer par votre vraie session

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout 
          userRole={user.role}
          userName={user.name}
          userAvatar={user.avatar}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
