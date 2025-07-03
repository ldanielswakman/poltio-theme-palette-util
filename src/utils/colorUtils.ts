export interface ColorShade {
  percentage: number;
  hex: string;
  hsl: { h: number; s: number; l: number };
}

export function isValidHex(hex: string): boolean {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexPattern.test(hex);
}

export function normalizeHex(hex: string): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  return '#' + hex.toUpperCase();
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;
  
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

export function adjustColorForContrast(hex: string, targetContrast: number = 4.5): string {
  const hsl = hexToHsl(hex);
  let adjustedL = hsl.l;
  
  // Try making it darker first
  while (adjustedL > 0) {
    const testHex = hslToHex(hsl.h, hsl.s, adjustedL);
    const contrast = getContrastRatio(testHex, '#FFFFFF');
    
    if (contrast >= targetContrast) {
      return testHex;
    }
    
    adjustedL -= 1;
  }
  
  // If we can't achieve contrast by making it darker, try reducing saturation
  adjustedL = hsl.l;
  let adjustedS = hsl.s;
  
  while (adjustedS > 0) {
    while (adjustedL > 0) {
      const testHex = hslToHex(hsl.h, adjustedS, adjustedL);
      const contrast = getContrastRatio(testHex, '#FFFFFF');
      
      if (contrast >= targetContrast) {
        return testHex;
      }
      
      adjustedL -= 1;
    }
    
    adjustedS -= 5;
    adjustedL = hsl.l;
  }
  
  // Fallback to a very dark version
  return hslToHex(hsl.h, 50, 20);
}

export function generateColorRamp(baseHex: string): ColorShade[] {
  const hsl = hexToHsl(baseHex);
  const shades: ColorShade[] = [];
  
  // Generate 12 shades from 120% (darkest) to 10% (lightest)
  const percentages = [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  
  percentages.forEach(percentage => {
    let adjustedL: number;
    
    if (percentage === 100) {
      // Use the base color as-is for 100%
      adjustedL = hsl.l;
    } else if (percentage > 100) {
      // Darker shades: reduce lightness
      const factor = (percentage - 100) / 20; // 0 to 1 for 100% to 120%
      adjustedL = Math.max(0, hsl.l - (hsl.l * factor * 0.8));
    } else {
      // Lighter shades: increase lightness
      const factor = (100 - percentage) / 90; // 0 to 1 for 100% to 10%
      adjustedL = Math.min(100, hsl.l + ((100 - hsl.l) * factor));
    }
    
    const adjustedHex = hslToHex(hsl.h, hsl.s, adjustedL);
    const adjustedHsl = hexToHsl(adjustedHex);
    
    shades.push({
      percentage,
      hex: adjustedHex,
      hsl: adjustedHsl
    });
  });
  
  return shades;
}