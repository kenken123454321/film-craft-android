export interface FilmSimulation {
  id: string;
  name: string;
  brand: string;
  filter: string; // CSS filter string
}

export const FILM_SIMULATIONS: FilmSimulation[] = [
  // Fujifilm
  {
    id: "fuji-provia",
    name: "Provia (Standard)",
    brand: "Fujifilm",
    filter: "contrast(1.05) saturate(1.1)",
  },
  {
    id: "fuji-velvia",
    name: "Velvia (Vivid)",
    brand: "Fujifilm",
    filter: "contrast(1.1) saturate(1.3)",
  },
  {
    id: "fuji-astia",
    name: "Astia (Soft)",
    brand: "Fujifilm",
    filter: "contrast(0.95) saturate(1.05) sepia(0.05)",
  },
  {
    id: "fuji-classic-chrome",
    name: "Classic Chrome",
    brand: "Fujifilm",
    filter: "contrast(1.1) saturate(0.8) sepia(0.1) hue-rotate(-10deg)",
  },
  {
    id: "fuji-acros",
    name: "Acros (B&W)",
    brand: "Fujifilm",
    filter: "grayscale(1) contrast(1.2)",
  },
  {
    id: "fuji-classic-neg",
    name: "Classic Neg",
    brand: "Fujifilm",
    filter: "contrast(1.2) saturate(0.85) sepia(0.1) hue-rotate(-5deg)",
  },
  {
    id: "fuji-eterna",
    name: "Eterna (Cinema)",
    brand: "Fujifilm",
    filter: "contrast(0.85) saturate(0.8) sepia(0.05)",
  },
  {
    id: "fuji-pro-neg-hi",
    name: "Pro Neg. Hi",
    brand: "Fujifilm",
    filter: "contrast(1.15) saturate(0.95)",
  },

  // Leica
  {
    id: "leica-standard",
    name: "Standard",
    brand: "Leica",
    filter: "contrast(1.05) saturate(1.0)",
  },
  {
    id: "leica-vivid",
    name: "Vivid",
    brand: "Leica",
    filter: "contrast(1.15) saturate(1.2)",
  },
  {
    id: "leica-natural",
    name: "Natural",
    brand: "Leica",
    filter: "contrast(0.95) saturate(0.95)",
  },
  {
    id: "leica-hc-bw",
    name: "High Contrast B&W",
    brand: "Leica",
    filter: "grayscale(1) contrast(1.4)",
  },
  {
    id: "leica-classic-bw",
    name: "Classic B&W",
    brand: "Leica",
    filter: "grayscale(1) contrast(1.1) sepia(0.1)",
  },
  {
    id: "leica-monochrom",
    name: "Monochrom",
    brand: "Leica",
    filter: "grayscale(1) contrast(1.3) brightness(0.95)",
  },
  {
    id: "leica-nostalgic",
    name: "Nostalgic",
    brand: "Leica",
    filter: "contrast(0.9) saturate(0.8) sepia(0.3) hue-rotate(-10deg)",
  },
  {
    id: "leica-cinematic",
    name: "Cinematic",
    brand: "Leica",
    filter: "contrast(1.2) saturate(0.9) sepia(0.1) hue-rotate(10deg)",
  },

  // Hasselblad
  {
    id: "hasselblad-hncs",
    name: "HNCS",
    brand: "Hasselblad",
    filter: "contrast(1.0) saturate(1.05)",
  },
  {
    id: "hasselblad-portrait",
    name: "Portrait",
    brand: "Hasselblad",
    filter: "contrast(0.9) saturate(1.0) sepia(0.05)",
  },
  {
    id: "hasselblad-landscape",
    name: "Landscape",
    brand: "Hasselblad",
    filter: "contrast(1.1) saturate(1.2) hue-rotate(5deg)",
  },
  {
    id: "hasselblad-bw",
    name: "B&W",
    brand: "Hasselblad",
    filter: "grayscale(1) contrast(1.15)",
  },
  {
    id: "hasselblad-cinematic",
    name: "Cinematic",
    brand: "Hasselblad",
    filter: "contrast(1.2) saturate(0.9) sepia(0.2) hue-rotate(-15deg)",
  },
  {
    id: "hasselblad-xpan",
    name: "XPan",
    brand: "Hasselblad",
    filter: "contrast(1.25) saturate(0.9)",
  },
  {
    id: "hasselblad-faded",
    name: "Faded",
    brand: "Hasselblad",
    filter: "contrast(0.8) brightness(1.1) saturate(0.8)",
  },
  {
    id: "hasselblad-vibrant",
    name: "Vibrant",
    brand: "Hasselblad",
    filter: "contrast(1.1) saturate(1.3) hue-rotate(-5deg)",
  },

  // Sigma
  {
    id: "sigma-standard",
    name: "Standard",
    brand: "Sigma",
    filter: "contrast(1.0) saturate(1.0)",
  },
  {
    id: "sigma-vivid",
    name: "Vivid",
    brand: "Sigma",
    filter: "contrast(1.1) saturate(1.25)",
  },
  {
    id: "sigma-cinematic",
    name: "Cinematic",
    brand: "Sigma",
    filter: "contrast(1.1) saturate(0.8) sepia(0.15)",
  },
  {
    id: "sigma-teal-orange",
    name: "Teal & Orange",
    brand: "Sigma",
    filter: "contrast(1.1) saturate(1.2) hue-rotate(-15deg) sepia(0.2)",
  },
  {
    id: "sigma-forest-green",
    name: "Forest Green",
    brand: "Sigma",
    filter: "contrast(1.05) saturate(1.1) hue-rotate(10deg)",
  },
  {
    id: "sigma-powder-blue",
    name: "Powder Blue",
    brand: "Sigma",
    filter: "contrast(0.9) saturate(0.9) brightness(1.1) hue-rotate(5deg)",
  },
  {
    id: "sigma-monochrome",
    name: "Monochrome",
    brand: "Sigma",
    filter: "grayscale(1) contrast(1.1)",
  },
  {
    id: "sigma-warm-gold",
    name: "Warm Gold",
    brand: "Sigma",
    filter: "contrast(1.05) saturate(1.1) sepia(0.2) hue-rotate(-15deg)",
  },
];

export const applySharpen = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number = 1,
) => {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const w = width;
  const h = height;

  // Simple 3x3 sharpen matrix
  const mix = amount; // 0 to 1
  const weights = [
    0,
    -1 * mix,
    0,
    -1 * mix,
    1 + 4 * mix,
    -1 * mix,
    0,
    -1 * mix,
    0,
  ];

  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);
  const src = new Uint8ClampedArray(data);
  const dst = data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dstOff = (y * w + x) * 4;
      let r = 0,
        g = 0,
        b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x + cx - halfSide;
          if (scy >= 0 && scy < h && scx >= 0 && scx < w) {
            const srcOff = (scy * w + scx) * 4;
            const wt = weights[cy * side + cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
          } else {
            // Edge handling: use center pixel
            const srcOff = dstOff;
            const wt = weights[cy * side + cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff + 1] = g;
      dst[dstOff + 2] = b;
      // Alpha remains unchanged
    }
  }
  ctx.putImageData(imageData, 0, 0);
};
