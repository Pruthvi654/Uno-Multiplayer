import UnoCard from "../cards/UnoCard";

function CenterPile({
  showPile,
  pile,
  drawCard
}) {

  return (

    <>

      {/* DRAW DECK */}

      <div className="
        absolute

        left-[18%]
        top-[1%]

        scale-[0.62]
        z-20
        
      "
        onClick={drawCard}
      >

        <div className="
          relative

          rotate-[-18deg]

          [transform:perspective(1200px)_rotateX(18deg)_rotateZ(-18deg)]
        ">

          <div className="
            absolute
            top-2
            left-2
            scale-[0.98]
            opacity-70
          ">

            <UnoCard
              color="back"
              value="back"
              tableCard={true}
            />

          </div>

          <div className="
            absolute
            top-1
            left-1
            scale-[0.99]
            opacity-80
          ">

            <UnoCard
              color="back"
              value="back"
              tableCard={true}
            />

          </div>

          <UnoCard
            color="back"
            value="back"
            tableCard={true}
          />

        </div>

      </div>

      {/* ACTIVE PILE */}

      {
        showPile && (

          <>

            {/* PILE AMBIENT SHADOW */}

            <div className="
              absolute

              left-[50%]
              top-[50%]

              -translate-x-1/2
              -translate-y-1/2

              w-[200px]
              h-[200px]

              rounded-full

              bg-black/20

              blur-[40px]

              scale-y-[0.75]

              pointer-events-none

              z-10
            " />

            {/* PILE */}

            <div className="
              absolute

              left-[45%]
              top-[30%]

              -translate-x-1/2
              -translate-y-1/2

              z-20
            ">

              {
                pile.map((card, index) => (

                  <div

                    key={index}

                    className="
                      absolute
                    "

                    style={{

                      rotate:
                        `${card.rotation}deg`,

                      zIndex: index
                    }}
                  >

                    <div className="
                      relative
                      scale-[0.72]

                      transition-all
                      duration-300
                    ">

                      <UnoCard
                        color={card.color}
                        value={card.value}
                        tableCard={true}
                        pileCard={true}
                      />

                    </div>

                  </div>

                ))
              }

            </div>

          </>

        )
      }

    </>

  );

}

export default CenterPile;