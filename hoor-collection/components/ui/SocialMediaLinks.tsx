'use client';

import React from 'react';

export interface SocialLinkItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/nuzhatirfan812',
    icon: (
      <svg
        className="w-6 h-6 fill-none stroke-current"
        viewBox="0 0 24 24"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/Hoordressofficial',
    icon: (
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'http://tiktok.com/@nuzhatirfan8',
    icon: (
      <svg
        className="w-6 h-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/923160010301',
    icon: (
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.017.5 3.918 1.381 5.594L0 24l6.594-1.381A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.37l-.36-.214-3.714.779.793-3.671-.232-.371A9.818 9.818 0 1112 21.818z" />
      </svg>
    ),
  },
];

interface SocialMediaLinksProps {
  className?: string;
  showHeading?: boolean;
  headingText?: string;
}

export const SocialMediaLinks: React.FC<SocialMediaLinksProps> = ({
  className = '',
  showHeading = false,
  headingText = 'Follow Us',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {showHeading && (
        <h4 className="text-sm font-semibold tracking-widest text-[#D4AF37] uppercase">
          {headingText}
        </h4>
      )}
      <div className="flex items-center gap-3">
        {SOCIAL_LINKS.map((item) => (
          <div key={item.name} className="relative group/tooltip">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="flex items-center justify-center p-[10px] rounded-full border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {item.icon}
            </a>

            {/* Tooltip on hover */}
            <div
              role="tooltip"
              className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#1a1a1a] text-[#ffffff] text-xs font-medium rounded border border-[#D4AF37]/50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg z-30"
            >
              {item.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-[#1a1a1a] border-t-4 border-x-transparent border-x-4 border-b-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
