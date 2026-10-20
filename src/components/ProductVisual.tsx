"use client";

import { ProductVariant } from "@/lib/types";

interface ProductVisualProps {
  productId: string;
  variant: ProductVariant;
  alt: string;
}

export default function ProductVisual({ productId, variant, alt }: ProductVisualProps) {
  if (productId === "dice-vault") {
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <svg
          id="img-dice-vault"
          viewBox="0 0 200 160"
          width="180"
          height="144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={alt}
          role="img"
          className="max-h-[170px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-105"
        >
          <rect x="25" y="35" width="150" height="90" rx="6" fill={variant.colorHex} stroke="#8b572a" strokeWidth="3" />
          <path d="M25 65 L175 65" stroke="#3d2311" strokeWidth="2" />
          <circle cx="45" cy="50" r="5" fill="#d4a359" stroke="#111" strokeWidth="1.5" />
          <circle cx="155" cy="50" r="5" fill="#d4a359" stroke="#111" strokeWidth="1.5" />
          <rect x="40" y="75" width="120" height="36" rx="4" fill="#2b1709" stroke="#4a2912" />
          <polygon points="60,93 70,82 80,93 70,104" fill="#181614" stroke="#d4a359" strokeWidth="1.5" />
          <polygon points="90,93 100,82 110,93 100,104" fill="#181614" stroke="#d4a359" strokeWidth="1.5" />
          <polygon points="120,93 130,82 140,93 130,104" fill="#181614" stroke="#d4a359" strokeWidth="1.5" />
        </svg>
        {/* Real image path supporting basePath */}
        <img
          src={variant.image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none"
        />
      </div>
    );
  }

  if (productId === "battle-mat") {
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <svg
          id="img-battle-mat"
          viewBox="0 0 200 160"
          width="180"
          height="144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={alt}
          role="img"
          className="max-h-[170px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-105"
        >
          <rect x="25" y="25" width="150" height="110" rx="4" fill={variant.colorHex} stroke="#965c32" strokeWidth="2" />
          <rect x="30" y="30" width="140" height="100" rx="2" fill="none" stroke="#d4a359" strokeDasharray="4 3" strokeWidth="1.5" />
          <line x1="58" y1="35" x2="58" y2="125" stroke="#482b16" strokeWidth="1.5" />
          <line x1="86" y1="35" x2="86" y2="125" stroke="#482b16" strokeWidth="1.5" />
          <line x1="114" y1="35" x2="114" y2="125" stroke="#482b16" strokeWidth="1.5" />
          <line x1="142" y1="35" x2="142" y2="125" stroke="#482b16" strokeWidth="1.5" />
          <line x1="35" y1="65" x2="165" y2="65" stroke="#482b16" strokeWidth="1.5" />
          <line x1="35" y1="95" x2="165" y2="95" stroke="#482b16" strokeWidth="1.5" />
        </svg>
        <img
          src={variant.image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none"
        />
      </div>
    );
  }

  if (productId === "gm-screen") {
    const sideColor = variant.id === "charcoal" ? "#2b2927" : "#422e1e";
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <svg
          id="img-gm-screen"
          viewBox="0 0 200 160"
          width="180"
          height="144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={alt}
          role="img"
          className="max-h-[170px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-105"
        >
          <polygon points="20,40 60,32 60,128 20,120" fill={sideColor} stroke="#261a10" strokeWidth="2" />
          <polygon points="65,31 135,31 135,129 65,129" fill={variant.colorHex} stroke="#261a10" strokeWidth="2" />
          <polygon points="140,32 180,40 180,120 140,128" fill={sideColor} stroke="#261a10" strokeWidth="2" />
          <polygon points="65,31 75,31 65,41" fill="#d4a359" />
          <polygon points="135,31 125,31 135,41" fill="#d4a359" />
          <rect x="75" y="45" width="50" height="4" rx="1" fill="#d4a359" />
        </svg>
        <img
          src={variant.image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none"
        />
      </div>
    );
  }

  if (productId === "metal-dice") {
    const isCopper = variant.id === "copper";
    const isObsidian = variant.id === "obsidian";
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <svg
          id="img-metal-dice"
          viewBox="0 0 200 160"
          width="180"
          height="144"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={alt}
          role="img"
          className="max-h-[170px] drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] transition-transform duration-200 group-hover:scale-105"
        >
          <polygon points="100,28 142,52 142,108 100,132 58,108 58,52" fill={variant.colorHex} stroke="#d4a359" strokeWidth="2.5" />
          <polygon points="100,28 100,75 58,52" fill={isCopper ? "#b36243" : isObsidian ? "#474f5b" : "#916c47"} stroke="#4a3420" />
          <polygon points="100,28 142,52 100,75" fill={isCopper ? "#8a4830" : isObsidian ? "#2b3038" : "#664a30"} stroke="#4a3420" />
          <polygon points="58,52 100,75 75,115" fill={isCopper ? "#733b26" : isObsidian ? "#22262d" : "#543c26"} stroke="#4a3420" />
          <polygon points="142,52 100,75 125,115" fill={isCopper ? "#a8593d" : isObsidian ? "#3f4753" : "#82613f"} stroke="#4a3420" />
          <polygon points="75,115 100,75 125,115" fill={isCopper ? "#c46d4c" : isObsidian ? "#525b68" : "#b08456"} stroke="#4a3420" />
          <text x="100" y="96" fontFamily="'Cinzel', serif" fontSize="16" fontWeight="900" fill="#f5f2eb" textAnchor="middle">
            20
          </text>
        </svg>
        <img
          src={variant.image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-contain opacity-0 pointer-events-none"
        />
      </div>
    );
  }

  return (
    <img
      src={variant.image}
      alt={alt}
      className="max-h-[170px] w-auto object-contain"
    />
  );
}
