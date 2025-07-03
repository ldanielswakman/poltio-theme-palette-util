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
  const [contrastIssues, setContrastIssues] = useState<{
    baseContrast: number;
    darkShadeContrast: number;
    hasIssues: boolean;
  }>({ baseContrast: 0, darkShadeContrast: 0, hasIssues: false });

  const handleColorSubmit = (color: string) => {
    setIsLoading(true);
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      // Check contrast for base color (3:1 for large text/UI)
      const baseContrast = getContrastRatio(color, '#FFFFFF');
      
      // Generate a preview of the 120% shade to check its contrast
      const previewShades = generateColorRamp(color);
      const darkestShade = previewShades.find(shade => shade.percentage === 120);
      const darkShadeContrast = darkestShade ? getContrastRatio(darkestShade.hex, '#FFFFFF') : 0;
      
      const hasContrastIssues = baseContrast < 3 || darkShadeContrast < 4.5;
      
      setContrastIssues({
        baseContrast,
        darkShadeContrast,
        hasIssues: hasContrastIssues
      });
      
      if (hasContrastIssues) {
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
    // Adjust color to meet both contrast requirements
    let adjustedColor = baseColor;
    
    // First ensure the base color meets 3:1 contrast
    if (contrastIssues.baseContrast < 3) {
      adjustedColor = adjustColorForContrast(adjustedColor, 3);
    }
    
    // Then ensure the darkest shade will meet 4.5:1 contrast
    const testShades = generateColorRamp(adjustedColor);
    const darkestShade = testShades.find(shade => shade.percentage === 120);
    
    if (darkestShade && getContrastRatio(darkestShade.hex, '#FFFFFF') < 4.5) {
      // If the darkest shade still doesn't meet contrast, adjust further
      adjustedColor = adjustColorForContrast(adjustedColor, 4.5);
    }
    
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
      <div className="container mx-auto md:px-4 py-12">
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
        contrastIssues={contrastIssues}
      />
    </div>
  );
}

export default App;