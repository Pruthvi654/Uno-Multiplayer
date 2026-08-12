import { useState } from "react";

export default function SceneEnvironment({

  children

}) {

  const [mousePosition, setMousePosition] =
    useState({
      x: 0,
      y: 0
    });

  return (

    <div
      className="
      relative
      w-screen
      min-h-screen
      overflow-hidden

      bg-gradient-to-br
      from-[#0b1020]
      via-[#1a1f3d]
      to-[#2a1247]
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

      {/* MAIN PURPLE GLOW */}

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

      {/* FLOOR LIGHT */}

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

      {/* CONTENT */}

      <div className="relative z-10">

        {children}

      </div>

    </div>
  );
}