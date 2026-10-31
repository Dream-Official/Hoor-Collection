import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';

export const metadata: Metadata = {
  title: 'Hoor Collection — Ultra-Luxury Pakistani Haute Couture',
  description:
    'Category-defining luxury Pakistani fashion. Pure Viscose kaftans, handcrafted Raw Silk ensembles, and regal Khuda Baksh bridal couture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-white selection:bg-[#D4AF37] selection:text-[#0a0a0a] min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsAppButton
          phoneNumber="923160010301"
          tooltipText="Chat with us"
        />
      </body>
    </html>
  );
}
