import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ColorShade } from '../utils/colorUtils';

interface ColorSwatchProps {
  shade: ColorShade;
  index: number;
}

export default function ColorSwatch({ shade, index }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shade.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isLight = shade.hsl.l > 50;
  const textColor = isLight ? '#142433' : '#FFFFFF';

  return (
    <div 
      className="group relative rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      style={{ backgroundColor: shade.hex }}
    >
      <div className="p-6 min-h-[120px] flex flex-col justify-between">
        <div>
          <div 
            className="text-sm font-medium mb-1"
            style={{ color: textColor }}
          >
            {shade.percentage}%
          </div>
          <div 
            className="text-xs opacity-80"
            style={{ color: textColor }}
          >
            Shade {index + 1}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div 
            className="font-mono text-sm font-medium"
            style={{ color: textColor }}
          >
            {shade.hex}
          </div>
          
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isLight 
                ? 'bg-black/10 hover:bg-black/20' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            style={{ color: textColor }}
            title="Copy HEX code"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {copied && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white text-[#142433] px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
            Copied!
          </div>
        </div>
      )}
    </div>
  );
}