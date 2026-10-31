'use client';

import React from 'react';
import WhatsAppBuyButton from '@/components/product/WhatsAppBuyButton';
import ProductVideo from '@/components/product/ProductVideo';

export interface ProductItem {
  id: string;
  slug: string;
  sku: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  category: string;
  price: {
    pkr: number;
    usd: number;
    aed: number;
    gbp: number;
  };
  fabric?: {
    primary: string;
  };
  work?: {
    type: string;
  };
  images: Array<{ src: string; alt: string; isPrimary?: boolean }>;
  video?: string;
  badge?: string;
}

interface ProductCardProps {
  product: ProductItem;
  currency?: 'pkr' | 'usd' | 'aed' | 'gbp';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency = 'pkr',
}) => {
  const primaryImage =
    product.images.find((img) => img.isPrimary) || product.images[0];
  const priceValue = product.price[currency] || product.price.pkr;
  const priceFormatted =
    currency === 'pkr'
      ? `Rs. ${priceValue.toLocaleString()}`
      : currency === 'usd'
      ? `$${priceValue}`
      : currency === 'gbp'
      ? `£${priceValue}`
      : `AED ${priceValue}`;

  const orderParams = {
    productTitle: `${product.title}${product.subtitle ? ' — ' + product.subtitle : ''}`,
    productSku: product.sku,
    fabricType: product.fabric?.primary || 'Pure Fabric',
    workType: product.work?.type || 'Hand-finished Appliqué & Embroidery',
    stitchingType: 'Ready to Wear',
    size: 'M (Standard)',
    quantity: 1,
    price: priceFormatted,
    productUrl: typeof window !== 'undefined' ? `${window.location.origin}/#product/${product.slug}` : '',
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-[#1a1a1a] border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
      {/* Media container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#121212]">
        {product.video ? (
          <ProductVideo
            src={product.video}
            poster={primaryImage?.src}
            className="w-full h-full"
            autoPlayOnHover={true}
          />
        ) : (
          <img
            src={primaryImage?.src}
            alt={primaryImage?.alt || product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[0.65rem] font-bold tracking-widest uppercase rounded bg-[#D4AF37] text-black shadow-md z-10">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          <span className="text-[0.7rem] uppercase tracking-widest text-[#D4AF37] font-semibold">
            {product.category}
          </span>
          <h3 className="font-serif text-lg font-medium text-white group-hover:text-[#f4e0ae] transition-colors line-clamp-1 mt-1">
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-xs text-[#cccccc] line-clamp-1 mt-0.5">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[0.65rem] uppercase text-[#cccccc] tracking-wider">
              Price
            </span>
            <span className="text-base font-bold text-[#D4AF37] tracking-tight">
              {priceFormatted}
            </span>
          </div>

          <WhatsAppBuyButton
            orderParams={orderParams}
            label="Order"
            className="!py-2 !px-3 !text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
