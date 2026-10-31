'use client';

import React, { useRef } from 'react';

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlayOnHover?: boolean;
}

export const ProductVideo: React.FC<ProductVideoProps> = ({
  src,
  poster,
  className = '',
  autoPlayOnHover = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (autoPlayOnHover && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayOnHover && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[0.65rem] font-semibold text-[#D4AF37] uppercase tracking-wider pointer-events-none">
        Runway Clip
      </div>
    </div>
  );
};

export default ProductVideo;
