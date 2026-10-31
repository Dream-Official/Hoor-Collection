'use client';

import React from 'react';
import Link from 'next/link';
import SocialMediaLinks from '@/components/ui/SocialMediaLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#D4AF37]/30 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Story */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-wider text-[#D4AF37]">
                HOOR
              </span>
              <span className="text-[0.65rem] tracking-[0.35em] text-white uppercase">
                COLLECTION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#cccccc] leading-relaxed">
              Ultra-luxury Pakistani Haute Couture digital flagship. Specializing in bespoke pure organic silks, hand-cut appliqué, fluid kaftans, and bridal couture.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#D4AF37] mb-4">
              Creations
            </h4>
            <ul className="space-y-2 text-sm text-[#cccccc]">
              <li>
                <Link href="/#listing" className="hover:text-[#D4AF37] transition-colors">
                  All 10 Couture Ensembles
                </Link>
              </li>
              <li>
                <Link href="/#listing" className="hover:text-[#D4AF37] transition-colors">
                  Pure Viscose Kaftans
                </Link>
              </li>
              <li>
                <Link href="/#listing" className="hover:text-[#D4AF37] transition-colors">
                  Raw Silk 2PC Sets
                </Link>
              </li>
              <li>
                <Link href="/#listing" className="hover:text-[#D4AF37] transition-colors">
                  Khuda Baksh Bridal Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Address */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#D4AF37] mb-4">
              Atelier Concierge
            </h4>
            <p className="text-sm text-[#cccccc] leading-relaxed mb-4">
              Gulberg III, Lahore, Pakistan<br />
              Direct WhatsApp: +92 316 0010301<br />
              Hours: Mon–Sat, 11am – 8pm PKT
            </p>
            <a
              href="https://wa.me/923160010301?text=Hello%20Hoor%20Collection!%20I%20would%20like%20to%20speak%20to%20a%20personal%20stylist."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#D4AF37] hover:bg-[#f4e0ae] rounded transition-all shadow-md"
            >
              Chat with Atelier
            </a>
          </div>

          {/* Social Media Links with Follow Us heading */}
          <div>
            <SocialMediaLinks showHeading={true} headingText="Follow Us" />
            <p className="text-xs text-[#cccccc] mt-4">
              Experience the world of Hoor Collection across our verified social channels.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#cccccc] gap-4">
          <div>
            © {new Date().getFullYear()} Hoor Collection. Ultra-Luxury Pakistani Fashion Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#D4AF37]">Direct WhatsApp Ordering Enabled</span>
            <span>DHL Express Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
