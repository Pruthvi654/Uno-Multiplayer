import { motion } from "framer-motion";
import backCard from "../../assets/cards/back/uno.png";
function DealingAnimation() {

  const players = [

    // TOP PLAYER STACK
    {
      x: 410,
      y: -60
    },

    // RIGHT PLAYER STACK
    {
      x: 900,
      y: 170
    },

    // YOUR HAND
    {
      x: 390,
      y: 470
    },

    // LEFT PLAYER STACK
    {
      x: -100,
      y: 150
    }

  ];

  const totalRounds = 4;

  const animations = [];

  for (let round = 0; round < totalRounds; round++) {

    for (let player = 0; player < players.length; player++) {

      animations.push({
        ...players[player],

        delay:
          (round * players.length + player) * 0.28
      });

    }

  }

  return (

    <>

      {/* DEALING CARDS */}

      {
        animations.map((deal, index) => (

          <motion.div

            key={index}

            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0.3
            }}

            animate={{
              x: deal.x,
              y: deal.y,
              opacity: [0, 1, 1, 0],
              scale: [0.3, 0.7, 0.7, 0.7]
            }}

            transition={{
              duration: 0.45,

              delay: deal.delay,

              ease: "easeInOut"
            }}

            className="
              absolute
              left-[18%]
              top-[1%]

              -translate-x-1/2
              -translate-y-1/2

              z-50
            "
          >

            <div className="
              scale-[0.42]
            ">

              <UnoBackCard />

            </div>

          </motion.div>

        ))
      }

      {/* OPENING CARD */}

      <motion.div

        initial={{
          x: 0,
          y: 0,
          opacity: 0,
          rotate: 0,
          scale: 0.3
        }}

        animate={{
          x: "200%",
          y: "100%",
          opacity: [0, 1, 1],
          rotate: 12,
          scale: [0.3, 0.82, 0.82]
        }}

        transition={{
          duration: 0.32,

          delay:
            4.48,

          ease: "easeOut"
        }}

        className="
          absolute
          left-[18%]
          top-[1%]

          -translate-x-1/2
          -translate-y-1/2

          z-50
        "
      >

        <div className="
          scale-[0.6]
        ">

          <UnoBackCard />

        </div>

      </motion.div>

    </>

  );

}

function UnoBackCard() {

  return (

    <img

      src={backCard}

      alt="UNO Back"

      className="
        w-40
        h-56
        object-cover
        rounded-[20px]

        shadow-[0_12px_30px_rgba(0,0,0,0.45)]
      "
    />

  );

}

export default DealingAnimation;