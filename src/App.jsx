import { useEffect, useState } from "react";

import GameTable from "./components/game/GameTable";

import UnoCard from "./components/cards/UnoCard";

import CenterPile from "./components/game/CenterPile";

import PlayerSeat from "./components/game/PlayerSeat";

import DealingAnimation from "./components/game/DealingAnimation";

import { motion } from "framer-motion";

import Lobby from "./components/lobby/Lobby";

function App() {

  const [showGame, setShowGame] =
    useState(false);

  const [counts, setCounts] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  const [flyingCard, setFlyingCard] =
  useState(null);

  const [drawingCard, setDrawingCard] =
  useState(null);

  const [showLobby] =
  useState(true);

  const [pile, setPile] = useState([
    {
      color: "blue",
      value: 5,
      rotation: 0
    }
  ]);
  

  const [hand, setHand] = useState([

    { color: "blue", value: 0 },

    { color: "blue", value: 5 },

    { color: "blue", value: "skip" },

    { color: "wild", value: "wild4" }

  ]);

  useEffect(() => {

    let currentDeal = 0;

    const order = [
      "top",
      "right",
      "bottom",
      "left"
    ];

    const interval = setInterval(() => {

      const currentPlayer =
        order[currentDeal % 4];

      setCounts(prev => ({

        ...prev,

        [currentPlayer]:
          prev[currentPlayer] + 1

      }));

      currentDeal++;

      if (currentDeal >= 16) {

        clearInterval(interval);

        setTimeout(() => {

          setShowGame(true);

        }, 500);

      }

    }, 280);

    return () => clearInterval(interval);

  }, []);

  const drawCard = () => {

  const colors = [
    "red",
    "blue",
    "green",
    "yellow"
  ];

  const normalValues = [
    0,1,2,3,4,5,6,7,8,9,
    "skip",
    "reverse",
    "draw2"
  ];

  const isWild =
    Math.random() < 0.12;

  let newCard;

  if (isWild) {

    const wildType =

      Math.random() < 0.5

        ? "wild"

        : "wild4";

    newCard = {

      color: "wild",

      value: wildType

    };

  }

  else {

    const randomColor =

      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    const randomValue =

      normalValues[
        Math.floor(
          Math.random() *
          normalValues.length
        )
      ];

    newCard = {

      color: randomColor,

      value: randomValue

    };

  }

  setDrawingCard(newCard);

  setTimeout(() => {

    setHand(prev => [
      ...prev,
      newCard
    ]);

    setCounts(prev => ({
      ...prev,
      bottom:
        prev.bottom + 1
    }));

    setDrawingCard(null);

  }, 550);

};

if (showLobby) {

  return <Lobby />;

}

  return (

    <GameTable>

      {/* DEALING */}

      {
        !showGame && (
          <DealingAnimation />
        )
      }

      {/* CENTER PILE */}

      <CenterPile
        showPile={showGame}
        pile={pile}
        drawCard={drawCard}
      />

      {/* OPPONENTS */}

      <PlayerSeat
        position="top"
        username="Alex"
        cardCount={counts.top}
        active={true}
      />

      <PlayerSeat
        position="left"
        username="Sarah"
        cardCount={counts.left}
        active={false}
      />

      <PlayerSeat
        position="right"
        username="Mike"
        cardCount={counts.right}
        active={false}
      />

      {/* PLAYER HAND */}

      {
        counts.bottom > 0 && (

          <div className="
            absolute
            bottom-[-60px]
            left-1/2
            -translate-x-1/2

            flex
            items-end
          ">

            {
              hand
                .slice(0, counts.bottom)
                .map((card, index) => {

                  const overlap =

                  Math.max(
                    -138,
                    -38 - counts.bottom * 5.5
                  );

                  const maxFanAngle = 30;

                    const rotationStep =

                      Math.min(
                        8,
                        maxFanAngle / counts.bottom
                      );

                    const rotation =

                      (index - (counts.bottom - 1) / 2)

                      * rotationStep;

                  const distanceFromCenter =

                    Math.abs(
                      index - (counts.bottom - 1) / 2
                    );

                    const arcDepth =

                    Math.max(
                      4,
                      22 - counts.bottom * 0.7
                    );

                    const translateY =

                    Math.pow(
                      distanceFromCenter,
                      0.7
                    ) * arcDepth;

                  return (

                    <motion.div

                      key={index}

                      whileHover={{
                        scale: 1.06,
                        rotate: rotation,

                        y: translateY - 40
                      }}

                        onClick={() => {

                          const randomRotation =
                            Math.random() * 40 - 20;

                          setFlyingCard({

                            ...card,

                            index,

                            rotation:
                              randomRotation
                          });

                          // REMOVE IMMEDIATELY

                          setHand(prev =>
                            prev.filter(
                              (_, i) =>
                                i !== index
                            )
                          );

                          setCounts(prev => ({
                            ...prev,
                            bottom:
                              prev.bottom - 1
                          }));

                          // ADD TO PILE AFTER ANIMATION

                          setTimeout(() => {

                            setPile(prev => [

                              ...prev,

                              {
                                ...card,
                                rotation:
                                  randomRotation
                              }

                            ]);

                            setFlyingCard(null);

                          }, 550);

                        }}
                        

                      style={{

                        marginLeft:
                        index === 0
                          ? "0px"
                          : `${overlap}px`,

                        zIndex: index
                      }}

                      animate={{

                        rotate: rotation,

                        y: translateY
                      }}

                    >

                      <UnoCard
                        color={card.color}
                        value={card.value}
                      />

                    </motion.div>

                  );

                })
            }

          </div>

        )
      }

      {
        flyingCard && (

          <motion.div

            initial={{
              x: -100,
              y: 100,
              scale: 1,
              rotate: 0
            }}

            animate={{

              x: -100,

              y: -50,

              scale: 0.72,

              rotate:
                flyingCard.rotation
            }}

            transition={{
              duration: 0.55,
              ease: "easeInOut"
            }}

            className="
              absolute

              left-1/2
              bottom-[140px]

              -translate-x-1/2

              z-[100]
              pointer-events-none
            "
          >

            <UnoCard
              color={flyingCard.color}
              value={flyingCard.value}
            />

          </motion.div>

        )
      }

      {
        drawingCard && (

          <motion.div

            initial={{

              x: -420,
              y: -250,

              scale: 0.32,

              rotate: -18
            }}

            animate={{

              x: -50,
              y: 60,

              scale: 0.72,

              rotate: 0
            }}

            transition={{
              duration: 0.55,
              ease: "easeInOut"
            }}

            className="
              absolute

              left-1/2
              bottom-[140px]

              -translate-x-1/2

              z-[100]

              pointer-events-none
            "
          >

            <UnoCard
              color="back"
              value="back"
            />

          </motion.div>

        )
      }

    </GameTable>

  );

}

export default App;