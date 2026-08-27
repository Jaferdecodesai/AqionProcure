import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'aqionprocure • UAE Procurement & Manpower Intelligence',
  description: 'Enterprise UAE Technical Services Sourcing, RFQ Generator & Indian/Kerala Manpower Intelligence Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-200 min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
