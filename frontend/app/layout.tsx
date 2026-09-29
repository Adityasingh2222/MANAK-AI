import './globals.css';
import type { Metadata } from 'next';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'MANAK-AI — Standards, Verification & Compliance Infrastructure',
  description: 'AI-powered assistant for Indian Standards, BIS Services, MSME compliance, product verification, certification readiness, laboratories, consumer guidance, and regulatory updates (SIH26107).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
