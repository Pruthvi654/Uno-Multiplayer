import { motion } from "framer-motion";
import cardImages from "../../assets/cards/cardImages";
import { memo, useEffect, useState } from "react";

const cardColorCache = new Map();

function getRecoloredWildCardDataUrl(imageSrc, chosenColor, callback) {
  if (!imageSrc || !chosenColor) {
    callback(imageSrc);
    return;
  }

  const cacheKey = `${imageSrc}_${chosenColor}`;
  if (cardColorCache.has(cacheKey)) {
    callback(cardColorCache.get(cacheKey));
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Palette mapping for the metallic background
    const palettes = {
      red: { top: [225, 29, 72], bottom: [159, 18, 57] },
      blue: { top: [37, 99, 235], bottom: [30, 58, 138] },
      green: { top: [22, 163, 74], bottom: [20, 83, 45] },
      yellow: { top: [234, 179, 8], bottom: [180, 83, 9] }
    };

    const palette = palettes[chosenColor] || palettes.blue;
    const h = canvas.height;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Target ONLY dark/black outer border pixels (r, g, b all below 45)
      if (r < 45 && g < 45 && b < 45) {
        const pixelIndex = i / 4;
        const y = Math.floor(pixelIndex / canvas.width);
        const factor = y / h;

        data[i]     = Math.round(palette.top[0] + (palette.bottom[0] - palette.top[0]) * factor);
        data[i + 1] = Math.round(palette.top[1] + (palette.bottom[1] - palette.top[1]) * factor);
        data[i + 2] = Math.round(palette.top[2] + (palette.bottom[2] - palette.top[2]) * factor);
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    cardColorCache.set(cacheKey, dataUrl);
    callback(dataUrl);
  };

  img.onerror = () => {
    callback(imageSrc);
  };

  img.src = imageSrc;
}

const colorGlows = {
  red: "shadow-[0_0_22px_rgba(239,68,68,0.85)] border-2 border-red-400/80",
  blue: "shadow-[0_0_22px_rgba(59,130,246,0.85)] border-2 border-blue-400/80",
  green: "shadow-[0_0_22px_rgba(34,197,94,0.85)] border-2 border-green-400/80",
  yellow: "shadow-[0_0_22px_rgba(234,179,8,0.85)] border-2 border-amber-300/80"
};

function UnoCard({ color, value, tableCard = false, pileCard = false, chosenColor = null }) {
  const rawImageSrc = cardImages[color]?.[value];
  const isWildCard = color === "wild" || value === "wild" || value === "wild4";
  const cacheKey = isWildCard && chosenColor && rawImageSrc ? `${rawImageSrc}_${chosenColor}` : null;
  const cachedUrl = cacheKey ? cardColorCache.get(cacheKey) : null;

  const [displaySrc, setDisplaySrc] = useState(cachedUrl || rawImageSrc);

  useEffect(() => {
    if (isWildCard && chosenColor && rawImageSrc) {
      if (cachedUrl) {
        setDisplaySrc(cachedUrl);
      } else {
        getRecoloredWildCardDataUrl(rawImageSrc, chosenColor, (newUrl) => {
          setDisplaySrc(newUrl);
        });
      }
    } else {
      setDisplaySrc(rawImageSrc);
    }
  }, [isWildCard, chosenColor, rawImageSrc, cachedUrl]);

  const activeGlow = isWildCard && chosenColor ? colorGlows[chosenColor] : null;

  return (
    <motion.div
      whileHover={tableCard ? {} : { y: -12, scale: 1, zIndex: 100 }}
      whileTap={tableCard ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-[clamp(80px,11.7vw,109px)] h-[clamp(114px,16.7vw,156px)] rounded-[clamp(8px,1.1vw,12px)] bg-white p-0 select-none overflow-hidden ${
        activeGlow || ""
      } ${
        pileCard ? "" : tableCard ? "shadow-[0_8px_14px_rgba(0,0,0,0.28)]" : "cursor-pointer shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
      }`}
    >
      <img
        src={displaySrc}
        alt="UNO Card"
        className="w-full h-full object-cover rounded-[8px]"
      />
    </motion.div>
  );
}

export default memo(UnoCard);