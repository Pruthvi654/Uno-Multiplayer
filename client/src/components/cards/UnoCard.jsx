import { motion } from "framer-motion";
import cardImages from "../../assets/cards/cardImages";
import { memo } from "react";

function UnoCard({ color, value, tableCard = false, pileCard = false }) {
  const imageSrc = cardImages[color]?.[value];

  return (
    <motion.div
      whileHover={tableCard ? {} : { y: -12, scale: 1, zIndex: 100 }}
      whileTap={tableCard ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-[109px] h-[156px] rounded-[12px] bg-white p-0 select-none ${
        pileCard ? "" : tableCard ? "shadow-[0_8px_14px_rgba(0,0,0,0.28)]" : "cursor-pointer shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
      }`}
    >
      <img src={imageSrc} alt="UNO Card" className="w-full h-full object-cover rounded-[8px]" />
    </motion.div>
  );
}

export default memo(UnoCard);