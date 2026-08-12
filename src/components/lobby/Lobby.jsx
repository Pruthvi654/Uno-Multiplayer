import SceneEnvironment from "../ambience/SceneEnvironment";
import { motion } from "framer-motion";

export default function Lobby() {

  return (

    <SceneEnvironment>

      <div className="
      min-h-screen
      flex
      flex-col
      items-center
      justify-center
      px-6
      py-10
      ">

        {/* TITLE */}

        <div className="text-center mb-16">

          <h1 className="
          text-7xl
          md:text-8xl
          font-black
          tracking-[0.25em]
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-cyan-400
          via-pink-500
          to-yellow-400

          drop-shadow-[0_0_35px_rgba(255,255,255,0.35)]
          ">

            UNO

          </h1>

          <p className="
          mt-4
          uppercase
          tracking-[0.4em]
          text-sm
          text-gray-300
          ">

            Multiplayer Arena

          </p>

        </div>

        {/* MAIN PANELS */}

        <div className="
            relative

            w-full
            max-w-6xl

            grid
            grid-cols-1
            lg:grid-cols-2

            gap-8

            [transform:perspective(1800px)_rotateX(6deg)]

            transition-transform
            duration-300
            ">

          {/* CREATE ROOM */}

          <motion.div

            initial={{
            opacity: 0,
            y: 40,
            scale: 0.96
            }}

            animate={{
            opacity: 1,
            y: 0,
            scale: 1
            }}

            transition={{
            duration: 0.7,
            ease: "easeOut"
            }}

            whileHover={{
            y: -6,
            scale: 1.01
            }}

            className="
            relative

            bg-white/10
            backdrop-blur-xl

            border
            border-white/10

            rounded-[32px]

            p-8

            shadow-[0_10px_60px_rgba(0,0,0,0.45)]

            overflow-hidden
            "
            >

            {/* PANEL SHINE */}

            <motion.div

            animate={{
            x: ["-120%", "120%"]
            }}

            transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
            }}

            className="
            absolute
            top-0
            left-0

            w-[40%]
            h-full

            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent

            skew-x-[-20deg]

            pointer-events-none
            "
            />

            <div className="
            absolute
            inset-0

            bg-gradient-to-b
            from-white/10
            to-transparent

            pointer-events-none
            " />

            <h2 className="
            text-3xl
            font-bold
            tracking-wide
            mb-8
            ">

              Create Room

            </h2>

            <div className="space-y-6">

              <input
                placeholder="Enter Username"

                className="
                w-full

                px-5
                py-4

                rounded-2xl

                bg-black/30

                border
                border-white/10

                text-white

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-cyan-400

                focus:shadow-[0_0_25px_rgba(34,211,238,0.35)]
                "
              />

              <button className="
              w-full

              py-4

              rounded-2xl

              bg-gradient-to-r
              from-cyan-500
              to-blue-500

              font-bold
              text-lg

              hover:scale-[1.02]

              transition-all
              duration-300

              shadow-[0_0_30px_rgba(34,211,238,0.35)]
              ">

                CREATE MATCH

              </button>

            </div>

          </motion.div>

          {/* JOIN ROOM */}

          <motion.div

            initial={{
            opacity: 0,
            y: 40,
            scale: 0.96
            }}

            animate={{
            opacity: 1,
            y: 0,
            scale: 1
            }}

            transition={{
            duration: 0.7,
            ease: "easeOut"
            }}

            whileHover={{
            y: -6,
            scale: 1.01
            }}

            className="
            relative

            bg-white/10
            backdrop-blur-xl

            border
            border-white/10

            rounded-[32px]

            p-8

            shadow-[0_10px_60px_rgba(0,0,0,0.45)]

            overflow-hidden
            "
            >

            {/* PANEL SHINE */}

            <motion.div

                animate={{
                x: ["-120%", "120%"]
                }}

                transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
                }}

                className="
                absolute
                top-0
                left-0

                w-[40%]
                h-full

                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent

                skew-x-[-20deg]

                pointer-events-none
                "
                />

            <div className="
            absolute
            inset-0

            bg-gradient-to-b
            from-white/10
            to-transparent

            pointer-events-none
            " />

            <h2 className="
            text-3xl
            font-bold
            tracking-wide
            mb-8
            ">

              Join Room

            </h2>

            <div className="space-y-6">

              <input
                placeholder="Enter Room Code"

                className="
                w-full

                px-5
                py-4

                rounded-2xl

                bg-black/30

                border
                border-white/10

                text-white

                placeholder:text-gray-400

                outline-none

                transition-all
                duration-300

                focus:border-pink-400

                focus:shadow-[0_0_25px_rgba(236,72,153,0.35)]
                "
              />

              <button className="
              w-full

              py-4

              rounded-2xl

              bg-gradient-to-r
              from-pink-500
              to-purple-500

              font-bold
              text-lg

              hover:scale-[1.02]

              transition-all
              duration-300

              shadow-[0_0_30px_rgba(236,72,153,0.35)]
              ">

                JOIN MATCH

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </SceneEnvironment>

  );

}