import React, { useState } from 'react';
import ColorInput from './components/ColorInput';
import ColorPalette from './components/ColorPalette';
import ContrastModal from './components/ContrastModal';
import { generateColorRamp, getContrastRatio, adjustColorForContrast, ColorShade } from './utils/colorUtils';

function App() {
  const [baseColor, setBaseColor] = useState<string>('');
  const [colorShades, setColorShades] = useState<ColorShade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContrastModal, setShowContrastModal] = useState(false);
  const [currentContrastRatio, setCurrentContrastRatio] = useState(0);

  const handleColorSubmit = (color: string) => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      const contrastRatio = getContrastRatio(color, '#FFFFFF');
      setCurrentContrastRatio(contrastRatio);
      
      if (contrastRatio < 4.5) {
        setBaseColor(color);
        setShowContrastModal(true);
        setIsLoading(false);
      } else {
        generatePalette(color);
      }
    }, 800);
  };

  const generatePalette = (color: string) => {
    const shades = generateColorRamp(color);
    setBaseColor(color);
    setColorShades(shades);
    setIsLoading(false);
  };

  const handleAutoAdjust = () => {
    const adjustedColor = adjustColorForContrast(baseColor, 4.5);
    setShowContrastModal(false);
    generatePalette(adjustedColor);
  };

  const handleTryNewColor = () => {
    setShowContrastModal(false);
    setBaseColor('');
    setColorShades([]);
    setIsLoading(false);
  };

  const handleReset = () => {
    setBaseColor('');
    setColorShades([]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {colorShades.length === 0 ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <ColorInput 
              onColorSubmit={handleColorSubmit}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <ColorPalette
            baseColor={baseColor}
            shades={colorShades}
            onReset={handleReset}
          />
        )}
      </div>

      <ContrastModal
        isOpen={showContrastModal}
        onClose={() => setShowContrastModal(false)}
        onTryNewColor={handleTryNewColor}
        onAutoAdjust={handleAutoAdjust}
        currentColor={baseColor}
        contrastRatio={currentContrastRatio}
      />
    </div>
  );
}

export default App;