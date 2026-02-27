import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Download,
  Wand2,
  Image as ImageIcon,
  Camera,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import {
  FILM_SIMULATIONS,
  FilmSimulation,
  applySharpen,
} from "./utils/filters";

export default function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("Fujifilm");
  const [selectedFilm, setSelectedFilm] = useState<FilmSimulation | null>(null);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const brands = Array.from(new Set(FILM_SIMULATIONS.map((f) => f.brand)));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setSelectedFilm(null);
        setIsEnhanced(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setSelectedFilm(null);
        setIsEnhanced(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderCanvas = () => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      imageRef.current = img;

      // Calculate dimensions to fit within container while maintaining aspect ratio
      const containerWidth = canvas.parentElement?.clientWidth || 800;
      const containerHeight = canvas.parentElement?.clientHeight || 600;

      let width = img.width;
      let height = img.height;

      const ratio = Math.min(containerWidth / width, containerHeight / height);

      // We render at full resolution internally, but CSS scales it down
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply CSS filter for film simulation
      if (selectedFilm) {
        ctx.filter = selectedFilm.filter;
      } else {
        ctx.filter = "none";
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Apply pixel manipulation for enhance (sharpen)
      if (isEnhanced) {
        applySharpen(ctx, canvas.width, canvas.height, 0.5);
      }

      setIsProcessing(false);
    };
    img.src = imageSrc;
  };

  useEffect(() => {
    if (imageSrc) {
      setIsProcessing(true);
      // Small timeout to allow UI to update processing state
      setTimeout(renderCanvas, 50);
    }
  }, [imageSrc, selectedFilm, isEnhanced]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = `filmsim-${selectedFilm?.id || "original"}.jpg`;
    link.href = dataUrl;
    link.click();
  };

  const handleClear = () => {
    setImageSrc(null);
    setSelectedFilm(null);
    setIsEnhanced(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden selection:bg-zinc-800">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/10 bg-[#111111] flex flex-col z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-zinc-400" />
            <h1 className="text-xl font-medium tracking-tight">FilmSim</h1>
          </div>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
            Analog Emulation
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Brand Selection */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Camera className="w-3 h-3" />
              Camera Profile
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                    selectedBrand === brand
                      ? "border-zinc-500 bg-zinc-800 text-white"
                      : "border-white/5 bg-transparent text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Film Selection */}
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <SlidersHorizontal className="w-3 h-3" />
              Film Stock
            </h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedFilm(null)}
                className={`w-full text-left px-4 py-3 text-sm rounded-lg border transition-all duration-200 flex items-center justify-between ${
                  selectedFilm === null
                    ? "border-zinc-500 bg-zinc-800 text-white"
                    : "border-white/5 bg-transparent text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                }`}
              >
                <span>Original (No Filter)</span>
              </button>

              {FILM_SIMULATIONS.filter((f) => f.brand === selectedBrand).map(
                (film) => (
                  <button
                    key={film.id}
                    onClick={() => setSelectedFilm(film)}
                    className={`w-full text-left px-4 py-3 text-sm rounded-lg border transition-all duration-200 flex items-center justify-between group ${
                      selectedFilm?.id === film.id
                        ? "border-zinc-500 bg-zinc-800 text-white"
                        : "border-white/5 bg-transparent text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    <span>{film.name}</span>
                    <div
                      className={`w-2 h-2 rounded-full ${selectedFilm?.id === film.id ? "bg-zinc-300" : "bg-transparent group-hover:bg-zinc-700"}`}
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Topbar */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            {imageSrc && (
              <button
                onClick={handleClear}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEnhanced(!isEnhanced)}
              disabled={!imageSrc || isProcessing}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
                isEnhanced
                  ? "bg-zinc-200 text-black border-zinc-200"
                  : "bg-transparent text-zinc-300 border-white/20 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              <Wand2 className="w-4 h-4" />
              {isEnhanced ? "Enhanced" : "Enhance"}
            </button>

            <button
              onClick={handleDownload}
              disabled={!imageSrc || isProcessing}
              className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </header>

        {/* Canvas Area */}
        <div
          className="flex-1 relative overflow-hidden flex items-center justify-center bg-[#050505] p-8"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {!imageSrc ? (
            <div className="relative z-10 max-w-md w-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-zinc-400 group-hover:text-white" />
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-500">
                  SVG, PNG, JPG or WEBP (max. 800x400px)
                </p>
              </label>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#050505]/50 backdrop-blur-sm z-20 rounded-lg">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain rounded-sm shadow-2xl transition-opacity duration-300"
                style={{ opacity: isProcessing ? 0.5 : 1 }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
