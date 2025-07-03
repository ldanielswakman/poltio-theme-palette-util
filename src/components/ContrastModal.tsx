import React from 'react';
import { AlertTriangle, X, RefreshCw, ArrowRight } from 'lucide-react';

interface ContrastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryNewColor: () => void;
  onAutoAdjust: () => void;
  currentColor: string;
  contrastIssues: {
    baseContrast: number;
    darkShadeContrast: number;
    hasIssues: boolean;
  };
}

export default function ContrastModal({
  isOpen,
  onClose,
  onTryNewColor,
  onAutoAdjust,
  currentColor,
  contrastIssues
}: ContrastModalProps) {
  if (!isOpen) return null;

  const baseContrastIssue = contrastIssues.baseContrast < 3;
  const darkShadeContrastIssue = contrastIssues.darkShadeContrast < 4.5;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-t-3xl md:rounded-2xl shadow-2xl max-w-md w-full mx-0 md:mx-4 overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-amber-600" />
          </div>

          <h2 className="text-2xl font-bold text-[#142433] text-center mb-4">
            Contrast Warning
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-slate-600 text-center">
              The selected color has contrast issues that may affect accessibility:
            </p>

            <div className="space-y-3">
              {baseContrastIssue && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-800 font-medium">Base color (UI elements)</span>
                    <span className="text-amber-600">{contrastIssues.baseContrast.toFixed(2)}:1</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Needs 3:1 minimum for large text and UI elements</p>
                </div>
              )}

              {darkShadeContrastIssue && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-800 font-medium">Dark shade (small text)</span>
                    <span className="text-amber-600">{contrastIssues.darkShadeContrast.toFixed(2)}:1</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Needs 4.5:1 minimum for small text</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-4 py-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-8 h-8 rounded-lg border-2 border-slate-200"
                  style={{ backgroundColor: currentColor }}
                />
                <span className="text-sm text-slate-600">Your color</span>
              </div>
              <div className="text-slate-400">on</div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg border-2 border-slate-200 bg-white" />
                <span className="text-sm text-slate-600">White background</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onTryNewColor}
              className="w-full bg-slate-100 hover:bg-slate-200 text-[#142433] py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Try New Color
            </button>

            <button
              onClick={onAutoAdjust}
              className="w-full bg-[#009EEC] hover:bg-[#0088cc] text-white py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Auto-Adjust Color
            </button>
          </div>

          <p className="text-xs text-slate-500 text-center mt-4">
            Auto-adjust will preserve the hue while adjusting saturation and brightness for better contrast.
          </p>
        </div>
      </div>
    </div>
  );
}