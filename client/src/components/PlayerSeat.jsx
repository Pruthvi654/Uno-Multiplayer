import UnoCard from "./cards/UnoCard";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PlayerSeat({ position, username, cardCount, active, isSpectator, unoPopup = null }) {
  const positions = {
    top: `top-2 sm:top-5 lg:top-7 left-1/2 -translate-x-1/2 flex-row`,
    left: `left-2 sm:left-5 lg:left-7 top-[38%] sm:top-1/2 -translate-y-1/2 flex-row`,
    right: `right-2 sm:right-5 lg:right-7 top-[38%] sm:top-1/2 -translate-y-1/2 flex-row-reverse`,
    bottom: `bottom-2 sm:bottom-4 left-6 flex-row`
  };

  return (
    <div
      className={`absolute flex items-center gap-3 sm:gap-4 z-20 scale-[0.75] sm:scale-[0.85] lg:scale-[0.98] transition-all duration-300 ${positions[position]}`}
    >
      {/* UNO / PENALTY POPUP BUBBLE */}
      <AnimatePresence>
        {unoPopup && (
          <motion.div
            key={`uno-pop-${unoPopup.id || Date.now()}`}
            initial={{ scale: 0.2, y: 15, opacity: 0 }}
            animate={{ scale: [0.2, 1.25, 1], y: [15, -12, -8], opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`absolute -top-10 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl whitespace-nowrap pointer-events-none ${
              unoPopup.type === "penalty"
                ? "bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white border-2 border-rose-300 shadow-[0_0_30px_rgba(225,29,72,0.9)]"
                : "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 border-2 border-yellow-100 shadow-[0_0_30px_rgba(251,191,36,0.9)]"
            }`}
          >
            {unoPopup.text || (unoPopup.type === "penalty" ? "⚠️ +2 PENALTY" : "🔥 UNO!")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEAT CARD CONTAINER */}
      <div
        className={`px-4 py-2.5 rounded-2xl bg-slate-950/75 backdrop-blur-xl border flex items-center gap-3 transition-all duration-300 ${
          active
            ? `border-amber-400/90 shadow-[0_0_30px_rgba(251,191,36,0.6)] bg-slate-900/90 scale-105`
            : `border-white/15 shadow-xl`
        }`}
      >
        {/* AVATAR BADGE */}
        <div
          className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center text-lg sm:text-xl font-black text-white border transition-all duration-300 select-none ${
            active
              ? `border-yellow-300 bg-gradient-to-br from-amber-400 to-yellow-600 shadow-[0_0_20px_rgba(251,191,36,0.5)]`
              : `border-white/20 bg-gradient-to-br from-slate-700 to-slate-900`
          }`}
        >
          {username?.charAt(0)?.toUpperCase()}
          {active && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-slate-950 animate-ping" />
          )}
        </div>

        {/* PLAYER INFO */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <p className="text-white font-extrabold text-sm sm:text-base tracking-wide truncate max-w-[100px] sm:max-w-[130px]">
              {username}
            </p>
            {active && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-black uppercase tracking-wider">
                TURN
              </span>
            )}
            {isSpectator && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                👀 Spectator
              </span>
            )}
          </div>
          <p className="text-slate-300/80 text-xs font-bold flex items-center gap-1">
            <span>🂠</span> {cardCount !== null && cardCount > 0 ? `${cardCount} cards` : isSpectator ? "Spectating" : "0 cards"}
          </p>
        </div>
      </div>

      {/* MINI HAND VISUALIZER (ONLY IF CARDS REMAIN) */}
      {cardCount > 0 && (
        <div className="relative w-[85px] h-[110px]">
          {Array.from({ length: Math.min(cardCount || 0, 6) }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${i * 6}px`,
                top: `${i * 2}px`,
                transform: `rotate(${i * 2}deg)`
              }}
            >
              <div className="scale-[0.42] origin-top-left drop-shadow-md">
                <UnoCard color="back" value="back" tableCard={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(PlayerSeat);
