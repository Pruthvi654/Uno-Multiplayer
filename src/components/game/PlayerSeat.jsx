import UnoCard from "../cards/UnoCard";

function PlayerSeat({
  position,
  username,
  cardCount,
  active
}) {

  const positions = {

    top: `
      top-8
      left-1/2
      -translate-x-1/2
      flex-row
    `,

    left: `
      left-8
      top-1/2
      -translate-y-1/2
      flex-row
    `,

    right: `
      right-8
      top-1/2
      -translate-y-1/2
      flex-row-reverse
    `
  };

  return (

    <div className={`
      absolute
      flex
      items-center
      gap-4
      z-20
      scale-[0.92]

      ${positions[position]}
    `}>

      {/* PLAYER INFO */}

      <div className={`
        px-4
        py-2
        rounded-2xl

        bg-black/30
        backdrop-blur-md

        border

        transition-all
        duration-300

        ${
          active
            ? `
              border-yellow-400 active-player
              shadow-[0_0_25px_rgba(255,255,0,0.5)]
            `
            : `
              border-white/10
            `
        }
      `}>

        <p className="
          text-white
          font-bold
          text-lg
        ">

          {username}

        </p>

        <p className="
          text-white/70
          text-sm
        ">

          {
            cardCount !== null &&
            `${cardCount} cards`
          }

        </p>

      </div>

      {/* CARD STACK */}

      <div className="
        relative
        w-[90px]
        h-[120px]
      ">

        {
          Array.from({
            length: cardCount || 0
          }).map((_, i) => (

            <div
              key={i}

              style={{
                position: "absolute",

                left: `${i * 6}px`,

                top: `${i * 2}px`,

                transform: `
                  rotate(${i * 2}deg)
                `
              }}
            >

              <div className="
                scale-[0.45]
                origin-top-left
              ">

                <UnoCard
                  color="back"
                  value="back"
                  tableCard={true}
                />

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default PlayerSeat;