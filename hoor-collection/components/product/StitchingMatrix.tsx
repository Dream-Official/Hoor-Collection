'use client';

import React, { useState } from 'react';

export interface StitchingSelections {
  type: 'ready-to-wear' | 'custom' | 'unstitched';
  size?: string;
  measurements?: {
    bust: string;
    waist: string;
    hips: string;
    shirtLength: string;
    sleeves?: string;
    shoulder?: string;
  };
}

interface StitchingMatrixProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StitchingSelections) => void;
  initialValues?: StitchingSelections;
}

export const StitchingMatrix: React.FC<StitchingMatrixProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const [stitchingType, setStitchingType] = useState<'ready-to-wear' | 'custom' | 'unstitched'>(
    initialValues?.type || 'ready-to-wear'
  );
  const [size, setSize] = useState<string>(initialValues?.size || 'M');
  const [measurements, setMeasurements] = useState({
    bust: initialValues?.measurements?.bust || '38',
    waist: initialValues?.measurements?.waist || '32',
    hips: initialValues?.measurements?.hips || '40',
    shirtLength: initialValues?.measurements?.shirtLength || '52',
    sleeves: initialValues?.measurements?.sleeves || '21',
    shoulder: initialValues?.measurements?.shoulder || '14.5',
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      type: stitchingType,
      size: stitchingType === 'ready-to-wear' ? size : undefined,
      measurements: stitchingType === 'custom' ? measurements : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Royal Black Modal */}
      <div className="relative w-full max-w-xl bg-[#141414] border border-[#D4AF37]/40 rounded-xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-white z-10 space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#D4AF37]">
              Bespoke Stitching Matrix
            </h3>
            <p className="text-xs text-[#cccccc] mt-1">
              Select standard sizing or submit custom dimensions for atelier tailoring.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[#D4AF37] text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Stitching Type Tabs */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setStitchingType('ready-to-wear')}
            className={`py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold border transition-all ${
              stitchingType === 'ready-to-wear'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#1a1a1a] text-[#cccccc] border-[#D4AF37]/30 hover:border-[#D4AF37]'
            }`}
          >
            Ready to Wear
          </button>
          <button
            type="button"
            onClick={() => setStitchingType('custom')}
            className={`py-3 px-4 rounded text-xs uppercase tracking-wider font-semibold border transition-all ${
              stitchingType === 'custom'
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#1a1a1a] text-[#cccccc] border-[#D4AF37]/30 hover:border-[#D4AF37]'
            }`}
          >
            Custom Tailoring (+Rs. 1,500)
          </button>
        </div>

        {/* Standard Size Selector */}
        {stitchingType === 'ready-to-wear' && (
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-wider text-[#f4e0ae] font-semibold">
              Select Standard Size
            </label>
            <div className="grid grid-cols-4 gap-3">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`py-3 rounded font-bold text-sm border transition-all ${
                    size === s
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#1a1a1a] text-white border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Measurements (Gold Inputs) */}
        {stitchingType === 'custom' && (
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-wider text-[#f4e0ae] font-semibold">
              Enter Body Measurements (Inches)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Bust', key: 'bust' },
                { label: 'Waist', key: 'waist' },
                { label: 'Hips', key: 'hips' },
                { label: 'Shirt Length', key: 'shirtLength' },
                { label: 'Sleeves', key: 'sleeves' },
                { label: 'Shoulder', key: 'shoulder' },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <span className="text-[0.7rem] uppercase text-[#cccccc]">
                    {item.label}
                  </span>
                  <input
                    type="number"
                    value={measurements[item.key as keyof typeof measurements]}
                    onChange={(e) =>
                      setMeasurements({
                        ...measurements,
                        [item.key]: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-[#1a1a1a] border border-[#D4AF37] text-white focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#f4e0ae] text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D4AF37]/20">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-transparent border border-[#cccccc]/40 text-[#cccccc] hover:border-white hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold rounded bg-[#D4AF37] text-black hover:bg-[#f4e0ae] transition-all shadow-md"
          >
            Confirm Stitching
          </button>
        </div>
      </div>
    </div>
  );
};

export default StitchingMatrix;
