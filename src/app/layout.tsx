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
    <html lang="en" className="light">
      <body className="antialiased bg-[#F8FAFC] text-slate-800 min-h-screen selection:bg-amber-500/20 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
