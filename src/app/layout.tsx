import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const jetMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Farouk — DevOps Engineer // Command Center",
  description:
    "DevOps Engineer portfolio of Ahmed Farouk. Cloud infrastructure, container platforms, CI/CD, automation, observability. Egypt.",
  keywords: [
    "Ahmed Farouk", "DevOps", "Cloud", "AWS", "Kubernetes", "OpenShift",
    "Linux", "RHEL", "Terraform", "Ansible", "CI/CD", "DevSecOps",
  ],
  authors: [{ name: "Ahmed Farouk" }],
  openGraph: {
    title: "Ahmed Farouk — DevOps Engineer",
    description: "Cloud infrastructure · Containers · CI/CD · Automation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
