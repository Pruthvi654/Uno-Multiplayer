import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameTable from "./GameTable";
import PlayerSeat from "./PlayerSeat";
import UnoCard from "./cards/UnoCard";
import CenterPile from "./CenterPile";
import Effects from "./effects/Effects";

function Game({
  hand,
  topCard,
  isMyTurn,
  playCard,
  drawCard,
  skipTurn,
  hasDrawnCard,
  players,
  currentTurn,
  myId,
  gameMessage,
  direction,
  pendingDraw,
  lastStackAmount,
  unoState,
  callUno
}) {

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedWildIndex, setSelectedWildIndex] = useState(null);
  const [flyingCard, setFlyingCard] = useState(null);
  const [drawingCard, setDrawingCard] = useState(null);
  const [pile, setPile] = useState([]);
  const [lastPileCard, setLastPileCard] = useState("");
  const [pileInitialized, setPileInitialized] = useState(false);
  const [reversePulse, setReversePulse] = useState(false);

  const [showSkipEffect, setShowSkipEffect] = useState(false);



  // BUILD DISCARD PILE
  useEffect(() => {

    if (!topCard) return;

    const cardId = JSON.stringify({

      color: topCard.color,

      type: topCard.type,

      value: topCard.value,

      chosenColor: topCard.chosenColor
    });

    // INITIAL CARD
    if (!pileInitialized) {

      const initialPileCard = {

        color:
          topCard.type === "wild" ||
            topCard.type === "wild4"
            ? "wild"
            : topCard.color,

        value:
          topCard.type === "number"
            ? topCard.value
            : topCard.type,

        rotation: 0
      };

      setPile([initialPileCard]);

      setLastPileCard(cardId);

      setPileInitialized(true);

      return;

    }

    // SAME CARD -> IGNORE
    if (cardId === lastPileCard) return;

    setLastPileCard(cardId);

    const pileCard = {

      color:
        topCard.type === "wild" ||
          topCard.type === "wild4"
          ? "wild"
          : topCard.color,

      value:
        topCard.type === "number"
          ? topCard.value
          : topCard.type,

      rotation:
        Math.random() * 16 - 8
    };

    setPile(prev => {

      const updated = [...prev, pileCard];

      return updated.slice(-8);

    });

  }, [topCard, lastPileCard, pileInitialized]);

  const [stackPopText, setStackPopText] = useState(null);
  const [lastProcessedCard, setLastProcessedCard] = useState("");
  const [prevPendingDraw, setPrevPendingDraw] = useState(0);

  // UNIFIED ACTION & STACK POP SYSTEM
  useEffect(() => {
    if (!topCard) return;

    const currentCardId = JSON.stringify({
      color: topCard.color,
      type: topCard.type,
      value: topCard.value,
      chosenColor: topCard.chosenColor
    });

    const isNewCard = currentCardId !== lastProcessedCard;
    const isNewStack = pendingDraw > 0 && pendingDraw !== prevPendingDraw;

    if (isNewCard || isNewStack) {
      if (isNewCard) {
        setLastProcessedCard(currentCardId);

        // REVERSE EFFECT
        if (topCard.type === "reverse") {
          setReversePulse(true);
          setTimeout(() => setReversePulse(false), 1200);
        }

        // SKIP EFFECT
        if (topCard.type === "skip") {
          setShowSkipEffect(true);
          setTimeout(() => setShowSkipEffect(false), 900);
        }
      }

      // STACK POP ANIMATION (+2, +4, +6, +8...)
      const popCount = pendingDraw > 0
        ? pendingDraw
        : (lastStackAmount > 0
          ? lastStackAmount
          : (topCard.type === "wild4" ? 4 : 2));

      if (pendingDraw > 0 || (isNewCard && (topCard.type === "draw2" || topCard.type === "wild4"))) {
        setStackPopText({
          text: `+${popCount}`,
          id: Date.now()
        });
        setTimeout(() => setStackPopText(null), 1200);
      }

      setPrevPendingDraw(pendingDraw);
    } else if (pendingDraw === 0 && prevPendingDraw !== 0) {
      setPrevPendingDraw(0);
    }
  }, [topCard, lastProcessedCard, pendingDraw, prevPendingDraw, lastStackAmount]);






  // Loading screen
  if (!topCard) {
    return (
      <div className="bg-[#1b4332] min-h-screen text-white flex items-center justify-center text-3xl font-bold">
        Loading Game...
      </div>
    );
  }

  const myPlayer = players.find(player => player.id === myId);
  const isSpectator = myPlayer?.isSpectator;

  // Check if card playable
  const isPlayable = (card) => {
    if (pendingDraw > 0) {
      if (topCard.type === "draw2") {
        return (card.type === "draw2" || card.type === "wild4");
      }
      if (topCard.type === "wild4") {
        return (card.type === "wild4");
      }
      return false;
    }

    if (card.type === "wild" || card.type === "wild4") return true;

    return (
      card.color === (topCard.chosenColor || topCard.color) ||
      (card.type === "number" && topCard.type === "number" && card.value === topCard.value) ||
      (card.type === "skip" && topCard.type === "skip") ||
      (card.type === "reverse" && topCard.type === "reverse") ||
      (card.type === "draw2" && topCard.type === "draw2")
    );
  };

  const chooseWildColor = (color) => {
    playCard(selectedWildIndex, color);
    setShowColorPicker(false);
    setSelectedWildIndex(null);
  };

  // Rotate players so current user always bottom
  const rotatedPlayers = (() => {
    const myIndex = players.findIndex(player => player.id === myId);
    if (myIndex === -1) return players;
    return [
      ...players.slice(myIndex),
      ...players.slice(0, myIndex)
    ];
  })();

  // Dynamic seat position calculator
  const getSeatPosition = (index, total) => {
    if (total === 2) {
      // 2 Players: Opponent is placed directly at Top (opposite player's hand)
      return index === 1 ? "top" : "bottom";
    }
    if (total === 3) {
      // 3 Players: Next player is Right, 2nd opponent is Left
      const pos3 = ["bottom", "right", "left"];
      return pos3[index] || "top";
    }
    // 4 Players: Next player is Right, 2nd opponent is Top, 3rd is Left
    const pos4 = ["bottom", "right", "top", "left"];
    return pos4[index] || "top";
  };


  return (
    <GameTable>
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-64 h-96 rounded-3xl overflow-hidden border-8 border-white shadow-2xl cursor-pointer">
            <div onClick={() => chooseWildColor("red")} className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500 hover:brightness-125 transition" />
            <div onClick={() => chooseWildColor("blue")} className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500 hover:brightness-125 transition" />
            <div onClick={() => chooseWildColor("green")} className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-500 hover:brightness-125 transition" />
            <div onClick={() => chooseWildColor("yellow")} className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-400 hover:brightness-125 transition" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-black border-4 border-white flex items-center justify-center text-4xl font-black text-white">
                {hand[selectedWildIndex]?.type === "wild4" ? "+4" : "W"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OPPONENT PLAYERS */}
      {rotatedPlayers.map((player, index) => {
        const isMe = player.id === myId;
        if (isMe) return null;
        const pos = getSeatPosition(index, rotatedPlayers.length);
        const isActive = player.id === currentTurn;
        return (
          <PlayerSeat
            key={player.id}
            position={pos}
            username={player.username}
            cardCount={player.handSize}
            active={isActive}
            isSpectator={player.isSpectator}
          />
        );
      })}

      {/* CENTER TABLE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* VICTORY BANNER OVERLAY */}
        <AnimatePresence>
          {gameMessage && (gameMessage.includes("WON!") || gameMessage.includes("finished!") || gameMessage.includes("🏆")) && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center"
            >
              <div className="px-8 py-4 rounded-3xl bg-gradient-to-r from-amber-500/95 via-yellow-300/95 to-amber-500/95 backdrop-blur-xl border-4 border-yellow-100 text-slate-950 font-black text-2xl sm:text-3xl shadow-[0_0_50px_rgba(251,191,36,0.9)] tracking-wide text-center uppercase">
                {gameMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {
          pendingDraw > 0 && (

            <div
              className="
        absolute

        bottom-6
        left-6

        px-6
        py-4

        rounded-2xl

        bg-red-500/15
        backdrop-blur-md

        border
        border-red-400/30

        text-red-200
        text-xl
        font-black

        shadow-[0_0_35px_rgba(255,0,0,0.25)]

        z-40
      "
            >

              +{pendingDraw} STACK

            </div>

          )
        }
        <div
          className="
    absolute

    left-1/2
    top-[50%]

    -translate-x-1/2
    -translate-y-1/2

    w-[min(500px,45vw)]
    h-[min(500px,45vw)]

    pointer-events-none

    z-10
  "
        >

          <Effects
            direction={direction}
            reversePulse={reversePulse}
            showSkipEffect={showSkipEffect}
            stackCount={pendingDraw}
          />
          <div className="pointer-events-auto">

            {/* TOP CARD */}
            <CenterPile
              showPile={true}
              pile={pile}
              drawCard={() => {

                if (
                  isMyTurn &&
                  !isSpectator &&
                  !hasDrawnCard
                ) {

                  setDrawingCard(true);

                  setTimeout(() => {

                    drawCard();

                    setDrawingCard(false);

                  }, 500);

                }

              }}
            />
          </div>

          {/* STACK NUMBER POP ANIMATION (ON TOP OF PILE, NO BORDER, NO BG) */}
          <AnimatePresence>
            {stackPopText && (
              <motion.div
                key={stackPopText.id}
                initial={{ scale: 0.2, y: 20, opacity: 0, rotate: -12 }}
                animate={{
                  scale: [0.2, 1.45, 1.0],
                  y: [20, -10, -20],
                  opacity: 1,
                  rotate: [-12, 5, 0]
                }}
                exit={{ scale: 1.5, opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2

                z-[99999]
                pointer-events-none

                flex
                items-center
                justify-center
                whitespace-nowrap
              "
              >
                <span className="
                text-6xl sm:text-7xl md:text-8xl lg:text-9xl
                font-black
                tracking-tight
                text-yellow-300
                drop-shadow-[0_0_30px_rgba(255,215,0,1)]
                filter
                drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)]
                select-none
              ">
                  {stackPopText.text}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>


        {/* PLAYER AREA */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-6 px-4">
          {/* PLAYER HAND */}
          {
            hand.length > 0 && (

              <div className="
            absolute
            bottom-[-20px]
            left-1/2
            -translate-x-1/2
            flex
            items-end
          ">

                {
                  hand.map((card, index) => {

                    const playable =
                      isPlayable(card);

                    const overlap =

                      Math.max(
                        -90,
                        -28 - hand.length * 2.2
                      );

                    const maxFanAngle = 40;

                    const rotationStep =

                      Math.min(
                        8,
                        maxFanAngle / hand.length
                      );

                    const rotation =

                      (
                        index -
                        (hand.length - 1) / 2
                      ) * rotationStep;

                    const distanceFromCenter =

                      Math.abs(
                        index -
                        (hand.length - 1) / 2
                      );

                    const arcDepth =

                      Math.max(
                        4,
                        22 - hand.length * 1.5
                      );

                    const translateY =

                      Math.pow(
                        distanceFromCenter,
                        0.7
                      ) * arcDepth;

                    const handleClick = () => {

                      if (
                        isSpectator ||
                        !isMyTurn ||
                        !playable
                      ) return;

                      // WILD CARD
                      if (
                        card.type === "wild" ||
                        card.type === "wild4"
                      ) {

                        setSelectedWildIndex(index);

                        setShowColorPicker(true);

                        return;

                      }

                      const randomRotation =
                        Math.random() * 40 - 20;

                      setFlyingCard({

                        ...card,

                        index,

                        rotation:
                          randomRotation
                      });

                      setTimeout(() => {

                        playCard(index);

                        setFlyingCard(null);

                      }, 520);

                    };

                    const unoColor =

                      card.type === "wild" ||
                        card.type === "wild4"
                        ? "wild"
                        : card.color;

                    const unoValue =

                      card.type === "number"
                        ? card.value
                        : card.type === "wild4"
                          ? "wild4"
                          : card.type;

                    return (

                      <motion.div

                        key={index}

                        whileHover={{

                          scale: 1.06,

                          rotate: rotation,

                          y: translateY - 40
                        }}

                        onClick={handleClick}

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

                        className={`
                      transition-opacity

                      ${playable && isMyTurn
                            ? "cursor-pointer"
                            : "opacity-70"
                          }
                    `}
                      >

                        <div className="scale-[0.9] sm:scale-[1.05] lg:scale-[1.18] origin-bottom">

                          <UnoCard
                            color={unoColor}
                            value={unoValue}
                          />

                        </div>

                      </motion.div>

                    );

                  })
                }

              </div>

            )
          }
          <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 flex flex-col items-end gap-2 sm:gap-3 z-50">
            <button onClick={callUno} disabled={!unoState?.targetPlayerId || (unoState?.targetPlayerId === myId ? false : !unoState?.canCatch)} className={`px-5 sm:px-9 py-2 sm:py-3.5 rounded-full text-xl sm:text-3xl font-black shadow-2xl transition ${((unoState?.targetPlayerId === myId && unoState?.canCallUno) || (unoState?.targetPlayerId !== myId && unoState?.canCatch)) ? "bg-yellow-400 hover:bg-yellow-500 text-black scale-105" : "bg-gray-600/80 text-gray-400 cursor-not-allowed"}`}>UNO!</button>

            {isSpectator && (<div className="text-sm sm:text-xl font-bold text-yellow-300 bg-black/50 px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl shadow-xl">👀 Spectating</div>)}

            {!isSpectator && (
              <button onClick={skipTurn} disabled={!isMyTurn || !hasDrawnCard} className="bg-red-500 hover:bg-red-600 disabled:bg-gray-500/50 px-4 sm:px-7 py-2 sm:py-3 rounded-xl text-sm sm:text-lg font-bold shadow-xl transition">Skip Turn</button>
            )}
          </div>
        </div>



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
                color={
                  flyingCard.type === "wild" ||
                    flyingCard.type === "wild4"
                    ? "wild"
                    : flyingCard.color
                }

                value={
                  flyingCard.type === "number"
                    ? flyingCard.value
                    : flyingCard.type === "wild4"
                      ? "wild4"
                      : flyingCard.type
                }
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
      </div>
    </GameTable>
  );
}

export default Game;
