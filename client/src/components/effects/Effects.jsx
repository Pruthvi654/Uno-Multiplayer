import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import clockwiseRing from "../../assets/effects/clockwise.png";
import counterclockwiseRing from "../../assets/effects/counterclockwise.png";
import skipEffect from "../../assets/effects/skip.png";

function Effects({
  direction,
  reversePulse,
  showSkipEffect,
  stackCount
}) {

  const [displayDirection, setDisplayDirection] = useState(direction);

  const [reverseAnimating, setReverseAnimating] = useState(false);

  // =====================================
  // REVERSE ANIMATION SYSTEM
  // =====================================

  useEffect(() => {

  // NORMAL STATE
  if (!reversePulse) {

    setDisplayDirection(direction);

    return;

  }

  // REVERSE PLAYED
  setReverseAnimating(true);

  // CHANGE PNG MID-SPIN
  const swapTimer = setTimeout(() => {

    setDisplayDirection(direction);

  }, 600);

  // STOP ANIMATION
  const stopTimer = setTimeout(() => {

    setReverseAnimating(false);

  }, 1200);

  return () => {

    clearTimeout(swapTimer);

    clearTimeout(stopTimer);

  };

}, [direction, reversePulse]);

  return (

    <div
      className="
        absolute
        inset-0

        pointer-events-none

        z-[500]
      "
    >

      {/* ===================================== */}
      {/* REVERSE RING */}
      {/* ===================================== */}

      <div
        className="
          absolute

          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          w-[500px]
          h-[500px]
        "
      >

        {/* GLOW */}

        <motion.div

          animate={{

            opacity:
              reverseAnimating
                ? [0.15, 0.45, 0.15]
                : 0.12,

            scale:
              reverseAnimating
                ? [1, 1.25, 1]
                : 1
          }}

          transition={{

            duration: 1.2
          }}

          className="
            absolute
            inset-0

            rounded-full

            blur-[35px]

            bg-orange-500
          "
        />

        {/* MAIN ROTATING CONTAINER */}

        <motion.div

          key={`reverse-${direction}-${reverseAnimating}`}

          initial={{
            rotate: 0,
            scale: 1
          }}

          animate={{

            rotate:
              reverseAnimating
                ? [0, 540]
                : 0,

            scale:
              reverseAnimating
                ? [1, 1.1, 1]
                : 1
          }}

          transition={{

            rotate: {

              duration: 1.2,

              ease: "easeInOut"
            },

            scale: {

              duration: 1.2
            }
          }}

          className="
            absolute
            inset-0

            flex
            items-center
            justify-center
          "

          style={{

            transform:
              "perspective(900px) rotateX(68deg)"
          }}
        >

          {/* TRAIL */}

          <img

            src={
              displayDirection === 1
                ? clockwiseRing
                : counterclockwiseRing
            }

            alt="Trail"

            className="
              absolute

              w-full
              h-full

              object-contain

              opacity-10

              scale-[1.06]

              blur-[2px]
            "
          />

          {/* MAIN RING */}

          <img

            src={
              displayDirection === 1
                ? clockwiseRing
                : counterclockwiseRing
            }

            alt="Direction Ring"

            className="
              absolute

              w-full
              h-full

              object-contain

              opacity-85

              drop-shadow-[0_0_18px_rgba(255,120,0,0.6)]
            "
          />

        </motion.div>

      </div>

      

      {/* ===================================== */}
      {/* SKIP EFFECT */}
      {/* ===================================== */}

      <AnimatePresence>

        {
          showSkipEffect && (

            <motion.div

              key={`skip-${Date.now()}`}

              initial={{
                opacity: 0
              }}

              animate={{
                opacity: [0, 1, 1, 0]
              }}

              exit={{
                opacity: 0
              }}

              transition={{
                duration: 0.9
              }}

              className="
                absolute
                inset-0

                flex
                items-center
                justify-center

                z-[999]
                pointer-events-none
              "
            >

              {/* GLOW BURST */}

              <motion.div

                initial={{
                  scale: 0.2,
                  opacity: 0
                }}

                animate={{

                  scale: [0.2, 1.4],

                  opacity: [0.6, 0]
                }}

                transition={{
                  duration: 0.75
                }}

                className="
                  absolute

                  w-[260px]
                  h-[260px]

                  rounded-full

                  bg-red-500

                  blur-[45px]
                "
              />

              {/* SKIP SYMBOL */}

              <motion.img

                src={skipEffect}

                alt="Skip"

                initial={{
                  scale: 0.15,
                  rotate: -30,
                  opacity: 0
                }}

                animate={{

                  scale: [0.15, 1.2, 1],

                  rotate: [-30, 10, -6, 0],

                  opacity: [0, 1, 1, 0]
                }}

                exit={{
                  opacity: 0
                }}

                transition={{
                  duration: 0.9
                }}

                className="
                  w-[320px]
                  h-[320px]

                  object-contain

                  drop-shadow-[0_0_22px_rgba(255,0,0,0.7)]
                "
              />

            </motion.div>

          )
        }

      </AnimatePresence>

    </div>

  );

}

export default Effects;