'use client';

import React, { useState } from 'react';
import { ProductItem } from './ProductCard';
import WhatsAppBuyButton from './WhatsAppBuyButton';
import StitchingMatrix, { StitchingSelections } from './StitchingMatrix';

interface ProductClientProps {
  product: ProductItem;
  currency?: 'pkr' | 'usd' | 'aed' | 'gbp';
}

export const ProductClient: React.FC<ProductClientProps> = ({
  product,
  currency = 'pkr',
}) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]?.src);
  const [quantity, setQuantity] = useState(1);
  const [isStitchingModalOpen, setIsStitchingModalOpen] = useState(false);
  const [stitchingData, setStitchingData] = useState<StitchingSelections>({
    type: 'ready-to-wear',
    size: 'M',
  });

  const priceValue = product.price[currency] || product.price.pkr;
  const totalPrice = priceValue * quantity;
  const priceFormatted =
    currency === 'pkr'
      ? `Rs. ${totalPrice.toLocaleString()}`
      : currency === 'usd'
      ? `$${totalPrice}`
      : currency === 'gbp'
      ? `£${totalPrice}`
      : `AED ${totalPrice}`;

  const orderParams = {
    productTitle: `${product.title}${product.subtitle ? ' — ' + product.subtitle : ''}`,
    productSku: product.sku,
    fabricType: product.fabric?.primary || 'Pure Fabric',
    workType: product.work?.type || 'Artisanal Embroidery',
    stitchingType:
      stitchingData.type === 'ready-to-wear'
        ? 'Ready to Wear'
        : stitchingData.type === 'custom'
        ? 'Custom Tailoring'
        : 'Unstitched',
    size:
      stitchingData.type === 'custom'
        ? 'Bespoke Custom'
        : stitchingData.size || 'M',
    quantity: quantity,
    price: priceFormatted,
    notes: stitchingData.measurements
      ? `Bust: ${stitchingData.measurements.bust}", Waist: ${stitchingData.measurements.waist}", Hips: ${stitchingData.measurements.hips}", Length: ${stitchingData.measurements.shirtLength}"`
      : undefined,
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className={`relative aspect-[3/4] w-full ${product.id === 'dress-4' ? 'max-w-[600px]' : ''} rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#D4AF37]/30 shadow-2xl`}>
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img.src)}
                className={`relative aspect-square ${product.id === 'dress-4' ? 'w-20 h-20' : ''} rounded overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === img.src
                    ? 'border-[#D4AF37] scale-95 shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {product.title}
            </h1>
            {product.subtitle && (
              <p className="text-base text-[#cccccc]">{product.subtitle}</p>
            )}

            <div className="text-2xl sm:text-3xl font-bold text-[#D4AF37] pt-2">
              {priceFormatted}
            </div>

            {product.shortDescription && (
              <p className="text-sm text-[#cccccc] leading-relaxed border-t border-[#1a1a1a] pt-4">
                {product.shortDescription}
              </p>
            )}

            {/* Stitching / Sizing Selector */}
            <div className="space-y-3 pt-4 border-t border-[#1a1a1a]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-medium text-[#cccccc] tracking-wider">
                  Tailoring & Size
                </span>
                <button
                  type="button"
                  onClick={() => setIsStitchingModalOpen(true)}
                  className="text-xs text-[#D4AF37] hover:text-[#f4e0ae] underline underline-offset-4"
                >
                  Custom Sizing Matrix
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded bg-[#1a1a1a] border border-[#D4AF37]/40 text-xs text-white">
                  {stitchingData.type === 'custom'
                    ? 'Bespoke Tailored'
                    : `Size: ${stitchingData.size}`}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-medium text-[#cccccc] tracking-wider">
                Quantity
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded bg-[#1a1a1a] border border-[#D4AF37]/40 text-white font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded bg-[#1a1a1a] border border-[#D4AF37]/40 text-white font-bold hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Gold CTA Action Buttons */}
          <div className="pt-6 border-t border-[#1a1a1a] space-y-3">
            <WhatsAppBuyButton
              orderParams={orderParams}
              className="w-full py-4 text-base"
              label="ORDER VIA WHATSAPP"
            />
          </div>
        </div>
      </div>

      {/* Stitching Matrix Modal */}
      <StitchingMatrix
        isOpen={isStitchingModalOpen}
        onClose={() => setIsStitchingModalOpen(false)}
        onSave={(data) => {
          setStitchingData(data);
          setIsStitchingModalOpen(false);
        }}
        initialValues={stitchingData}
      />
    </div>
  );
};

export default ProductClient;
