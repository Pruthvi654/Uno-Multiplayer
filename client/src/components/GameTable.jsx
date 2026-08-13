import { useState, useEffect } from "react";

function GameTable({ children }) {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [forceRotate, setForceRotate] = useState(true);

  useEffect(() => {
    const checkOrientation = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsPortraitMobile(w < 768 && h > w);
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  const isRotated = isPortraitMobile && forceRotate;

  return (

    <div
      className="
        relative
        w-screen
        h-screen
        overflow-hidden

        bg-gradient-to-br
        from-[#0b1020]
        via-[#1a1f3d]
        to-[#2a1247]

        flex
        items-center
        justify-center
      "

      onMouseMove={(e) => {

        const x =
          (e.clientX / window.innerWidth - 0.5) * 40;

        const y =
          (e.clientY / window.innerHeight - 0.5) * 40;

        setMousePosition({
          x,
          y
        });

      }}
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          absolute
          w-[900px]
          h-[900px]
          rounded-full
          bg-purple-500/20
          blur-[150px]
          transition-transform
          duration-150
        "

        style={{
          transform: `
            translate(
              ${mousePosition.x * 0.4}px,
              ${mousePosition.y * 0.4}px
            )
          `
        }}
      />

      {/* BLUE GLOW */}

      <div
        className="
          absolute
          top-0
          left-0
          w-[400px]
          h-[400px]
          rounded-full
          bg-blue-500/20
          blur-[120px]
          transition-transform
          duration-150
        "

        style={{
          transform: `
            translate(
              ${mousePosition.x * 0.6}px,
              ${mousePosition.y * 0.6}px
            )
          `
        }}
      />

      {/* PINK GLOW */}

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[400px]
          h-[400px]
          rounded-full
          bg-pink-500/20
          blur-[120px]
          transition-transform
          duration-150
        "

        style={{
          transform: `
            translate(
              ${-mousePosition.x * 0.5}px,
              ${-mousePosition.y * 0.5}px
            )
          `
        }}
      />

      {/* RED FLOOR GLOW */}

      <div
        className="
          absolute
          bottom-[-100px]
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[300px]
          rounded-full
          bg-red-500/20
          blur-[120px]
          transition-transform
          duration-150
        "

        style={{
          transform: `
            translateX(-50%)
            translate(
              ${mousePosition.x * 0.3}px,
              ${mousePosition.y * 0.3}px
            )
          `
        }}
      />

      {/* ROTATION TOGGLE FOR PORTRAIT MOBILE */}
      {isPortraitMobile && (
        <button
          onClick={() => setForceRotate(!forceRotate)}
          className="absolute top-2 right-2 z-[9999] px-3 py-1 bg-black/70 border border-yellow-400/50 rounded-full text-xs font-bold text-yellow-300 shadow-lg flex items-center gap-1.5 backdrop-blur-md hover:bg-black/90 transition"
        >
          <span>📱</span>
          <span>{forceRotate ? "Landscape View On" : "Rotate Landscape"}</span>
        </button>
      )}

      {/* MAIN TABLE */}

      <div
        className={`
          relative
          transition-all
          duration-300
          border-0 sm:border
          border-white/10
          bg-white/5
          backdrop-blur-md
          shadow-[0_0_60px_rgba(0,0,0,0.6)]
          overflow-hidden
          ${
            isRotated
              ? "w-[100vh] h-[100vw] min-w-[100vh] min-h-[100vw] rotate-90 rounded-none"
              : "w-full h-full sm:w-[94vw] sm:h-[92vh] sm:rounded-[45px]"
          }
        `}
      >

        {/* TABLE SHINE */}

        <div className="
          absolute
          inset-0
          rounded-[30px] sm:rounded-[50px]

          bg-gradient-to-b
          from-white/10
          to-transparent

          pointer-events-none
        " />

        {/* CENTER LIGHT */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2

            w-[350px]
            h-[350px]

            rounded-full

            bg-orange-400/20

            blur-[100px]

            transition-transform
            duration-150
          "

          style={{
            transform: `
              translate(
                calc(-50% + ${mousePosition.x * 0.8}px),
                calc(-50% + ${mousePosition.y * 0.8}px)
              )
            `
          }}
        />

        {children}

      </div>

    </div>

  );

}

export default GameTable;
