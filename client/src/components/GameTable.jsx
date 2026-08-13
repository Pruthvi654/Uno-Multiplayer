import { useState, useEffect } from "react";

function GameTable({ children }) {

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
        const container = e.currentTarget;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        requestAnimationFrame(() => {
          container.style.setProperty("--mx", `${x * 0.4}px`);
          container.style.setProperty("--my", `${y * 0.4}px`);
          container.style.setProperty("--bx", `${x * 0.6}px`);
          container.style.setProperty("--by", `${y * 0.6}px`);
          container.style.setProperty("--px", `${-x * 0.5}px`);
          container.style.setProperty("--py", `${-y * 0.5}px`);
          container.style.setProperty("--cx", `calc(-50% + ${x * 0.8}px)`);
          container.style.setProperty("--cy", `calc(-50% + ${y * 0.8}px)`);
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
          duration-75
          will-change-transform
        "

        style={{
          transform: "translate(var(--mx, 0px), var(--my, 0px))"
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
          duration-75
          will-change-transform
        "

        style={{
          transform: "translate(var(--bx, 0px), var(--by, 0px))"
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
          duration-75
          will-change-transform
        "

        style={{
          transform: "translate(var(--px, 0px), var(--py, 0px))"
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
          duration-75
          will-change-transform
        "

        style={{
          transform: "translateX(-50%) translate(var(--mx, 0px), var(--my, 0px))"
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
            duration-75
            will-change-transform
          "

          style={{
            transform: "translate(var(--cx, -50%), var(--cy, -50%))"
          }}
        />

        {children}

      </div>

    </div>

  );

}

export default GameTable;
