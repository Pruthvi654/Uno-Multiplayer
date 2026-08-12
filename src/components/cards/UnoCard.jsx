import { motion } from "framer-motion";

import cardImages from "../../assets/cards/cardImages";

function UnoCard({
  color,
  value,
  tableCard = false,
  pileCard = false
}) {

  const imageSrc =
    cardImages[color]?.[value];

  return (

    <motion.div

      whileHover={

        tableCard

          ? {}

          : {
              y: -20,
              scale: 1,
              zIndex: 100
            }

      }

      whileTap={

        tableCard

          ? {}

          : {
              scale: 0.96
            }

      }

      transition={{

        type: "spring",

        stiffness: 300,

        damping: 15
      }}

      className={`

        relative

        w-40
        h-56

        rounded-[22px]

        bg-white

        p-0

        select-none

        ${

          pileCard

            ? ""

            : tableCard

              ? `
                  shadow-[0_10px_18px_rgba(0,0,0,0.28)]
                `

              : `
                  cursor-pointer

                  shadow-[0_15px_30px_rgba(0,0,0,0.5)]

                  hover:shadow-[0_0_30px_rgba(255,255,255,0.35)]
                `
        }

      `}
    >

      <img

        src={imageSrc}

        alt="UNO Card"

        className="
          w-full
          h-full
          object-cover
          rounded-[16px]
        "
      />

    </motion.div>

  );

}

export default UnoCard;