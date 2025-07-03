import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { ColorShade } from '../utils/colorUtils';
import ColorSwatch from './ColorSwatch';

interface ColorPaletteProps {
  baseColor: string;
  shades: ColorShade[];
  onReset: () => void;
}

export default function ColorPalette({ baseColor, shades, onReset }: ColorPaletteProps) {
  const handleExportPalette = () => {
    const paletteData = shades.map(shade => ({
      percentage: shade.percentage,
      hex: shade.hex,
      hsl: shade.hsl
    }));
    
    const dataStr = JSON.stringify(paletteData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `poltio-palette-${baseColor.replace('#', '')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-none md:rounded-2xl shadow-lg border-0 md:border border-slate-200 p-6 md:p-8 pb-24 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-12 h-12 rounded-xl border-2 border-slate-200 shadow-sm"
                style={{ backgroundColor: baseColor }}
              />
              <div>
                <h2 className="text-2xl font-bold text-[#142433]">
                  Theme Palette
                </h2>
                <p className="text-slate-600">
                  Based on <span className="font-mono font-medium">{baseColor}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleExportPalette}
              className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#142433] rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </button>
            
            <button
              onClick={onReset}
              className="inline-flex items-center px-4 py-2 bg-[#009EEC] hover:bg-[#0088cc] text-white rounded-lg font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Palette
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {shades.map((shade, index) => (
            <ColorSwatch
              key={shade.percentage}
              shade={shade}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-slate-50 rounded-xl">
          <h3 className="font-medium text-[#142433] mb-4 flex items-center">
            <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#009EEC"/>
              <path d="M43.2983 22.728C42.1847 23.3988 41.7671 24.7405 42.4631 25.8139C44.4119 28.8998 44.5511 32.6566 43.1591 36.0108V36.145L43.0199 36.2792C41.7671 38.9626 39.4948 40.8163 36.6168 42.0485C31.6524 44.1739 30.3883 48.0083 29.7961 49.2937C29.2393 50.5012 29.9353 51.8429 31.0488 52.2454C31.188 52.3796 31.4664 52.3796 31.6056 52.3796C32.7192 52.5138 33.6936 51.9771 34.1112 51.0379C34.5288 50.0987 35.4234 47.3439 38.2872 46.2078C42.3239 44.7319 45.3863 41.7801 47.1958 38.0234C47.1958 37.8892 47.1958 37.8892 47.335 37.755C47.335 37.6209 47.4742 37.6209 47.4742 37.4867C49.5622 33.0591 49.1446 27.8264 46.4999 23.533C45.8039 22.4596 44.4119 22.0571 43.2983 22.728Z" fill="#009EEC"/>
              <path d="M26.7137 46.3787C26.5733 46.3787 26.2924 46.2397 26.152 46.2397C21.2364 44.1545 17.7254 40.1233 16.4614 34.98C16.1805 33.7289 16.8827 32.4779 18.1467 32.0609C19.4107 31.7828 20.6747 32.4779 21.096 33.7289C22.0791 37.3432 24.6071 40.2637 28.1182 41.7914C29.3821 42.3488 29.9439 43.7389 29.3821 44.8496C28.8204 45.9616 27.6968 46.5191 26.7137 46.3787" fill="#009EEC"/>
              <path d="M18.26 29.5408C18.126 29.5408 17.992 29.5408 17.858 29.4047C16.7859 29.1323 16.1158 27.7706 16.5178 26.5451C16.6518 26.1366 16.7859 25.7281 17.0539 25.1835C19.8682 18.2389 26.971 14.29 34.3417 15.3793C35.5479 15.5155 36.888 15.924 37.9601 16.4687C38.3622 16.6048 38.7642 16.8772 39.1663 17.0134C40.2384 17.558 40.7744 19.0559 40.1044 20.1452C39.5683 21.2346 38.0942 21.7792 37.022 21.0984C36.754 20.9622 36.486 20.8261 36.0839 20.6899C35.2798 20.2814 34.3417 20.0091 33.4036 19.8729C28.1771 19.0559 23.0845 21.9154 21.0743 26.8175C20.9403 27.0898 20.8063 27.4983 20.6723 27.7706C20.4043 29.1323 19.3321 29.8132 18.26 29.5408" fill="#009EEC"/>
              <path d="M35.5999 58.4C35.5999 60.38 33.9799 62 31.9999 62C30.0199 62 28.3999 60.38 28.3999 58.4C28.3999 56.42 30.0199 54.8 31.9999 54.8C33.9799 54.8 35.5999 56.24 35.5999 58.4" fill="#009EEC"/>
            </svg>
            Palette Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Base Color:</span>
              <span className="ml-2 font-mono font-medium text-[#142433]">{baseColor}</span>
            </div>
            <div>
              <span className="text-slate-600">Total Shades:</span>
              <span className="ml-2 font-medium text-[#142433]">{shades.length}</span>
            </div>
            <div>
              <span className="text-slate-600">Range:</span>
              <span className="ml-2 font-medium text-[#142433]">10% - 120%</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4">
            Click any color swatch to copy its HEX code to your clipboard.
          </p>
        </div>

        {/* Mobile Sticky Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-10">
          <div className="flex space-x-3">
            <button
              onClick={handleExportPalette}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-100 hover:bg-slate-200 text-[#142433] rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </button>
            
            <button
              onClick={onReset}
              className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-[#009EEC] hover:bg-[#0088cc] text-white rounded-lg font-medium transition-all"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Palette
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}