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
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="79" height="79" rx="39.5" stroke="#009EEC"/>
              <path d="M43.2983 22.728C42.1847 23.3988 41.7671 24.7405 42.4631 25.8139C44.4119 28.8998 44.5511 32.6566 43.1591 36.0108V36.145L43.0199 36.2792C41.7671 38.9626 39.4948 40.8163 36.6168 42.0485C31.6524 44.1739 30.3883 48.0083 29.7961 49.2937C29.2393 50.5012 29.9353 51.8429 31.0488 52.2454C31.188 52.3796 31.4664 52.3796 31.6056 52.3796C32.7192 52.5138 33.6936 51.9771 34.1112 51.0379C34.5288 50.0987 35.4234 47.3439 38.2872 46.2078C42.3239 44.7319 45.3863 41.7801 47.1958 38.0234C47.1958 37.8892 47.1958 37.8892 47.335 37.755C47.335 37.6209 47.4742 37.6209 47.4742 37.4867C49.5622 33.0591 49.1446 27.8264 46.4999 23.533C45.8039 22.4596 44.4119 22.0571 43.2983 22.728Z" fill="#009EEC"/>
              <path d="M26.7137 46.3787C26.5733 46.3787 26.2924 46.2397 26.152 46.2397C21.2364 44.1545 17.7254 40.1233 16.4614 34.98C16.1805 33.7289 16.8827 32.4779 18.1467 32.0609C19.4107 31.7828 20.6747 32.4779 21.096 33.7289C22.0791 37.3432 24.6071 40.2637 28.1182 41.7914C29.3821 42.3488 29.9439 43.7389 29.3821 44.8496C28.8204 45.9616 27.6968 46.5191 26.7137 46.3787" fill="#009EEC"/>
              <path d="M18.26 29.5408C18.126 29.5408 17.992 29.5408 17.858 29.4047C16.7859 29.1323 16.1158 27.7706 16.5178 26.5451C16.6518 26.1366 16.7859 25.7281 17.0539 25.1835C19.8682 18.2389 26.971 14.29 34.3417 15.3793C35.5479 15.5155 36.888 15.924 37.9601 16.4687C38.3622 16.6048 38.7642 16.8772 39.1663 17.0134C40.2384 17.558 40.7744 19.0559 40.1044 20.1452C39.5683 21.2346 38.0942 21.7792 37.022 21.0984C36.754 20.9622 36.486 20.8261 36.0839 20.6899C35.2798 20.2814 34.3417 20.0091 33.4036 19.8729C28.1771 19.0559 23.0845 21.9154 21.0743 26.8175C20.9403 27.0898 20.8063 27.4983 20.6723 27.7706C20.4043 29.1323 19.3321 29.8132 18.26 29.5408" fill="#009EEC"/>
              <path d="M35.5999 58.4C35.5999 60.38 33.9799 62 31.9999 62C30.0199 62 28.3999 60.38 28.3999 58.4C28.3999 56.42 30.0199 54.8 31.9999 54.8C33.9799 54.8 35.5999 56.24 35.5999 58.4" fill="#009EEC"/>
              <rect x="40" y="40" width="40" height="40" rx="20" fill="#009EEC"/>
              <path d="M69.0963 51.2368C66.6759 48.8401 63.4063 47.4971 60 47.5006H59.8663C56.4417 47.5358 53.1693 48.921 50.7602 51.3552C48.3511 53.7893 46.9998 57.0758 47 60.5006C47 65.8756 50.3225 70.3831 55.67 72.2718C56.2731 72.4845 56.9185 72.5494 57.5519 72.4612C58.1853 72.3729 58.7883 72.1341 59.3104 71.7647C59.8324 71.3953 60.2583 70.9062 60.5523 70.3382C60.8463 69.7703 60.9998 69.1401 61 68.5006C61 67.9702 61.2107 67.4614 61.5858 67.0864C61.9609 66.7113 62.4696 66.5006 63 66.5006H68.7763C69.6836 66.505 70.5652 66.1989 71.2746 65.6332C71.984 65.0675 72.4786 64.2762 72.6763 63.3906C72.8998 62.4065 73.0084 61.3997 73 60.3906C72.9873 58.6824 72.6357 56.9938 71.9656 55.4225C71.2955 53.8512 70.3202 52.4285 69.0963 51.2368ZM70.7213 62.9506C70.6219 63.3918 70.375 63.7859 70.0214 64.0677C69.6677 64.3495 69.2285 64.5022 68.7763 64.5006H63C61.9391 64.5006 60.9217 64.922 60.1716 65.6722C59.4214 66.4223 59 67.4397 59 68.5006C58.9995 68.82 58.9226 69.1347 58.7755 69.4183C58.6285 69.7019 58.4156 69.9462 58.1548 70.1306C57.894 70.3151 57.5927 70.4344 57.2764 70.4785C56.96 70.5226 56.6376 70.4904 56.3363 70.3843C51.8113 68.7881 49 65.0006 49 60.5006C48.9998 57.6028 50.1431 54.822 52.1815 52.7624C54.2199 50.7027 56.9886 49.5306 59.8862 49.5006H59.9987C62.8965 49.5118 65.6737 50.6616 67.7315 52.7018C69.7892 54.742 70.9627 57.5093 70.9988 60.4068C71.0062 61.2624 70.9148 62.116 70.7262 62.9506H70.7213ZM61.5 54.0006C61.5 54.2973 61.412 54.5873 61.2472 54.8339C61.0824 55.0806 60.8481 55.2729 60.574 55.3864C60.2999 55.4999 59.9983 55.5296 59.7074 55.4718C59.4164 55.4139 59.1491 55.271 58.9393 55.0612C58.7296 54.8515 58.5867 54.5842 58.5288 54.2932C58.4709 54.0023 58.5006 53.7007 58.6142 53.4266C58.7277 53.1525 58.92 52.9182 59.1666 52.7534C59.4133 52.5886 59.7033 52.5006 60 52.5006C60.3978 52.5006 60.7794 52.6586 61.0607 52.9399C61.342 53.2212 61.5 53.6028 61.5 54.0006ZM56 57.0006C56 57.2973 55.912 57.5873 55.7472 57.8339C55.5824 58.0806 55.3481 58.2729 55.074 58.3864C54.7999 58.4999 54.4983 58.5296 54.2074 58.4718C53.9164 58.4139 53.6491 58.271 53.4393 58.0612C53.2296 57.8515 53.0867 57.5842 53.0288 57.2932C52.9709 57.0023 53.0006 56.7007 53.1142 56.4266C53.2277 56.1525 53.42 55.9182 53.6666 55.7534C53.9133 55.5886 54.2033 55.5006 54.5 55.5006C54.8978 55.5006 55.2794 55.6586 55.5607 55.9399C55.842 56.2212 56 56.6028 56 57.0006ZM56 64.0006C56 64.2973 55.912 64.5873 55.7472 64.8339C55.5824 65.0806 55.3481 65.2729 55.074 65.3864C54.7999 65.4999 54.4983 65.5296 54.2074 65.4718C53.9164 65.4139 53.6491 65.271 53.4393 65.0612C53.2296 64.8515 53.0867 64.5842 53.0288 64.2932C52.9709 64.0023 53.0006 63.7007 53.1142 63.4266C53.2277 63.1525 53.42 62.9182 53.6666 62.7534C53.9133 62.5886 54.2033 62.5006 54.5 62.5006C54.8978 62.5006 55.2794 62.6586 55.5607 62.9399C55.842 63.2212 56 63.6028 56 64.0006ZM67 57.0006C67 57.2973 66.912 57.5873 66.7472 57.8339C66.5824 58.0806 66.3481 58.2729 66.074 58.3864C65.7999 58.4999 65.4983 58.5296 65.2074 58.4718C64.9164 58.4139 64.6491 58.271 64.4393 58.0612C64.2296 57.8515 64.0867 57.5842 64.0288 57.2932C63.9709 57.0023 64.0007 56.7007 64.1142 56.4266C64.2277 56.1525 64.42 55.9182 64.6666 55.7534C64.9133 55.5886 65.2033 55.5006 65.5 55.5006C65.8978 55.5006 66.2794 55.6586 66.5607 55.9399C66.842 56.2212 67 56.6028 67 57.0006Z" fill="white"/>
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