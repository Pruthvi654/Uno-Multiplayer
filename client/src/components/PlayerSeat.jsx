import UnoCard from "./cards/UnoCard";
import { memo } from "react";

function PlayerSeat({ position, username, cardCount, active, isSpectator }) {

  const positions = {
    top: `top-8 left-1/2 -translate-x-1/2 flex-row`,
    left: `left-8 top-1/2 -translate-y-1/2 flex-row`,
    right: `right-8 top-1/2 -translate-y-1/2 flex-row-reverse`
  };

  return (
    <div className={`absolute flex items-center gap-4 z-20 scale-[0.92] ${positions[position]}`}>

      <div className={`px-4 py-2 rounded-2xl bg-black/30 backdrop-blur-md border transition-all duration-300 ${active ? `border-yellow-400 shadow-[0_0_25px_rgba(255,255,0,0.5)]` : `border-white/10`}`}>
        <div
  className={`
    relative

    w-14
    h-14

    rounded-full

    flex
    items-center
    justify-center

    text-xl
    font-black
    text-white

    border-2

    backdrop-blur-md

    shadow-lg

    ${
      active
        ? `
          border-yellow-300
          bg-yellow-400/20
          shadow-[0_0_25px_rgba(255,255,0,0.45)]
        `
        : `
          border-white/15
          bg-white/10
        `
    }
  `}
>

  {
    username?.charAt(0)?.toUpperCase()
  }

</div>
        <p className="text-white font-bold text-lg">{username}</p>
        <p className="text-white/70 text-sm">{cardCount !== null && `${cardCount} cards`}</p>
      </div>

      <div className="relative w-[90px] h-[120px]">
        {Array.from({ length: Math.min(cardCount || 0, 6) }).map((_, i) => (
          <div key={i} style={{ position: 'absolute', left: `${i * 6}px`, top: `${i * 2}px`, transform: `rotate(${i * 2}deg)` }}>
            <div className="scale-[0.45] origin-top-left">
              <UnoCard
                color="back"
                value="back"
                tableCard={true}
              />
            </div>
          </div>
        ))}
      </div>

      {isSpectator && (
        <div className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-yellow-200">Spectator</div>
      )}

    </div>
  );
}

export default memo(PlayerSeat);
