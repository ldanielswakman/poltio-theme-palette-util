import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { isValidHex, normalizeHex } from '../utils/colorUtils';

interface ColorInputProps {
  onColorSubmit: (color: string) => void;
  isLoading?: boolean;
}

export default function ColorInput({ onColorSubmit, isLoading }: ColorInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value && !isValidHex(value)) {
      setError('Please enter a valid HEX color code (e.g., #FF5733 or #F73)');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      setError('Please enter a HEX color code');
      return;
    }
    
    if (!isValidHex(inputValue)) {
      setError('Please enter a valid HEX color code (e.g., #FF5733 or #F73)');
      return;
    }
    
    const normalizedHex = normalizeHex(inputValue);
    onColorSubmit(normalizedHex);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-none md:rounded-2xl shadow-lg border-0 md:border border-slate-200 p-6 md:p-8 mx-0 md:mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#009EEC"/>
              <path d="M43.2983 22.728C42.1847 23.3988 41.7671 24.7405 42.4631 25.8139C44.4119 28.8998 44.5511 32.6566 43.1591 36.0108V36.145L43.0199 36.2792C41.7671 38.9626 39.4948 40.8163 36.6168 42.0485C31.6524 44.1739 30.3883 48.0083 29.7961 49.2937C29.2393 50.5012 29.9353 51.8429 31.0488 52.2454C31.188 52.3796 31.4664 52.3796 31.6056 52.3796C32.7192 52.5138 33.6936 51.9771 34.1112 51.0379C34.5288 50.0987 35.4234 47.3439 38.2872 46.2078C42.3239 44.7319 45.3863 41.7801 47.1958 38.0234C47.1958 37.8892 47.1958 37.8892 47.335 37.755C47.335 37.6209 47.4742 37.6209 47.4742 37.4867C49.5622 33.0591 49.1446 27.8264 46.4999 23.533C45.8039 22.4596 44.4119 22.0571 43.2983 22.728Z" fill="#009EEC"/>
              <path d="M26.7137 46.3787C26.5733 46.3787 26.2924 46.2397 26.152 46.2397C21.2364 44.1545 17.7254 40.1233 16.4614 34.98C16.1805 33.7289 16.8827 32.4779 18.1467 32.0609C19.4107 31.7828 20.6747 32.4779 21.096 33.7289C22.0791 37.3432 24.6071 40.2637 28.1182 41.7914C29.3821 42.3488 29.9439 43.7389 29.3821 44.8496C28.8204 45.9616 27.6968 46.5191 26.7137 46.3787" fill="#009EEC"/>
              <path d="M18.26 29.5408C18.126 29.5408 17.992 29.5408 17.858 29.4047C16.7859 29.1323 16.1158 27.7706 16.5178 26.5451C16.6518 26.1366 16.7859 25.7281 17.0539 25.1835C19.8682 18.2389 26.971 14.29 34.3417 15.3793C35.5479 15.5155 36.888 15.924 37.9601 16.4687C38.3622 16.6048 38.7642 16.8772 39.1663 17.0134C40.2384 17.558 40.7744 19.0559 40.1044 20.1452C39.5683 21.2346 38.0942 21.7792 37.022 21.0984C36.754 20.9622 36.486 20.8261 36.0839 20.6899C35.2798 20.2814 34.3417 20.0091 33.4036 19.8729C28.1771 19.0559 23.0845 21.9154 21.0743 26.8175C20.9403 27.0898 20.8063 27.4983 20.6723 27.7706C20.4043 29.1323 19.3321 29.8132 18.26 29.5408" fill="#009EEC"/>
              <path d="M35.5999 58.4C35.5999 60.38 33.9799 62 31.9999 62C30.0199 62 28.3999 60.38 28.3999 58.4C28.3999 56.42 30.0199 54.8 31.9999 54.8C33.9799 54.8 35.5999 56.24 35.5999 58.4" fill="#009EEC"/>
              <path d="M35.5999 58.4C35.5999 60.38 33.9799 62 31.9999 62C30.0199 62 28.3999 60.38 28.3999 58.4C28.3999 56.42 30.0199 54.8 31.9999 54.8C33.9799 54.8 35.5999 56.24 35.5999 58.4" fill="#009EEC"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#142433] mb-2">
            Poltio Theme Palette Generator
          </h1>
          <p className="text-slate-600">
            Enter a HEX color code to generate a beautiful color palette
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="colorInput" className="block text-sm font-medium text-[#142433] mb-2">
              HEX Color Code
            </label>
            <div className="relative">
              <input
                id="colorInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#FF5733"
                className={`w-full px-4 py-4 text-lg font-mono bg-slate-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#009EEC] focus:border-transparent transition-all duration-200 ${
                  error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                }`}
                maxLength={7}
              />
              {inputValue && isValidHex(inputValue) && (
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                  style={{ backgroundColor: normalizeHex(inputValue) }}
                />
              )}
            </div>
            {error && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputValue || !!error || isLoading}
            className="w-full bg-[#009EEC] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#0088cc] focus:outline-none focus:ring-2 focus:ring-[#009EEC] focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </div>
            ) : (
              'Generate Palette'
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-slate-50 rounded-xl">
          <h3 className="font-medium text-[#142433] mb-2">Supported formats:</h3>
          <div className="text-sm text-slate-600 space-y-1">
            <p>• 6-digit HEX: <code className="bg-white px-2 py-1 rounded">#FF5733</code></p>
            <p>• 3-digit HEX: <code className="bg-white px-2 py-1 rounded">#F73</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}