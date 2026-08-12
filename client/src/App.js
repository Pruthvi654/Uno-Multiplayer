import { useEffect, useState } from "react";
import socket from "./socket";

import Lobby from "./components/Lobby";
import Game from "./components/Game";

function App() {

  const [createName, setCreateName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [hand, setHand] = useState([]);
  const [topCard, setTopCard] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("");
  const [hasDrawnCard, setHasDrawnCard] = useState(false);
  const [rankings, setRankings] = useState([]);
  const [gameMessage, setGameMessage] = useState("");
  const [direction, setDirection] = useState(1);
  const [pendingDraw, setPendingDraw] = useState(0);
  const [lastStackAmount, setLastStackAmount] = useState(0);
  //const [showColorPicker, setShowColorPicker] = useState(false);
  const [unoState, setUnoState] = useState(null);
  const [gameMode, setGameMode] = useState("normal");
  const [rematchRequested, setRematchRequested] = useState(false);

  useEffect(() => {

    socket.on("room-created", ({ roomId, players }) => {

      setIsHost(true);

      setRoomId(roomId);

      setPlayers(players);

    });

    socket.on("update-players", (players) => {

      setPlayers(players);

    });

    socket.on("error-message", (message) => {

      alert(message);

    });

    socket.on("game-started", ({
      hand,
      topCard,
      currentTurn,
      hasDrawnCard,
      players,
      gameMessage,
      direction,
      pendingDraw,
      lastStackAmount,
      unoState
    }) => {

      setHand(hand);

      setTopCard(topCard);

      setCurrentTurn(currentTurn);

      setHasDrawnCard(hasDrawnCard);

      setPlayers(players);

      setGameStarted(true);

      setGameMessage(gameMessage || "");

      setDirection(direction);

      setPendingDraw(pendingDraw);

      setLastStackAmount(lastStackAmount || 0);

      setUnoState(unoState);

      setRankings([]);

      setRematchRequested(false);

    });

    socket.on("game-update", ({
      hand,
      topCard,
      currentTurn,
      hasDrawnCard,
      players,
      gameMessage,
      direction,
      pendingDraw,
      lastStackAmount,
      unoState
    }) => {

      setHand(hand);

      setTopCard(topCard);

      setCurrentTurn(currentTurn);

      setHasDrawnCard(hasDrawnCard);

      setPlayers(players);

      setGameMessage(gameMessage || "");

      setDirection(direction);

      setPendingDraw(pendingDraw);

      setLastStackAmount(lastStackAmount || 0);

      setUnoState(unoState);

    });


    socket.on("game-over", ({ rankings }) => {

      setRankings(rankings);

    });

    socket.on("uno-update", (unoState) => {

      setUnoState(unoState);

    });

    // CLEANUP LISTENERS
    return () => {

      socket.off("room-created");

      socket.off("update-players");

      socket.off("error-message");

      socket.off("game-started");

      socket.off("game-update");

      socket.off("game-over");

      socket.off("uno-update");

    };

  }, []);

  const createRoom = () => {

    if (!createName) return;

    socket.emit("create-room", {

      username: createName,

      gameMode

    });

  };

  const joinRoom = () => {

    if (!joinName || !joinRoomCode) return;

    // ALREADY INSIDE ROOM
    const alreadyJoined = players.some(
      player => player.id === socket.id
    );

    if (alreadyJoined) return;

    setIsHost(false);

    socket.emit("join-room", {
      roomId: joinRoomCode,
      username: joinName
    });

    setRoomId(joinRoomCode);

  };

  const startGame = () => {

    socket.emit("start-game", {
      roomId
    });

  };

  const playCard = (
    cardIndex,
    chosenColor = null
  ) => {

    socket.emit("play-card", {

      roomId,

      cardIndex,

      chosenColor

    });

  };

  const drawCard = () => {

    socket.emit("draw-card", {

      roomId

    });

  };

  const skipTurn = () => {

    socket.emit("skip-turn", {

      roomId

    });

  };

  const callUno = () => {

    socket.emit("call-uno", {

      roomId

    });

  };

  const requestRematch = () => {

    // ALREADY PRESSED
    if (rematchRequested) return;

    setRematchRequested(true);

    socket.emit("request-rematch", {

      roomId

    });

  };

  if (gameStarted) {

    if (rankings.length > 0) {

      return (

        <div className="
          bg-black
          min-h-screen
          text-white
          flex
          flex-col
          items-center
          justify-center
          px-6
        ">

          <h1 className="
            text-6xl
            font-black
            mb-10
            text-yellow-400
          ">

            Final Rankings

          </h1>

          <div className="
            w-full
            max-w-2xl
            bg-white/10
            rounded-3xl
            overflow-hidden
            shadow-2xl
            border
            border-white/20
          ">

            {
              rankings.map((player, index) => {

                const playerData = players.find(
                  p => p.id === player.id
                );

                return (

                  <div
                    key={player.id}
                    className="
                      flex
                      justify-between
                      items-center
                      px-8
                      py-6
                      border-b
                      border-white/10
                      text-2xl
                      font-bold
                    "
                  >

                    <div>

                      {
                        index === 0
                          ? "🥇"

                          : index === 1
                            ? "🥈"

                            : index === 2
                              ? "🥉"

                              : "💀"
                      }

                    </div>

                    <div>

                      {
                        playerData?.username ||
                        "Unknown Player"
                      }

                    </div>

                    <div>

                      {
                        player.isLoser
                          ? "LOSER"
                          : `#${player.position}`
                      }

                    </div>

                  </div>

                );

              })
            }

          </div>

          <div className="
            flex
            gap-6
            mt-10
          ">

            <button

              onClick={requestRematch}

              disabled={rematchRequested}

              className={`
                px-8
                py-4
                rounded-2xl
                text-2xl
                font-bold
                shadow-xl
                transition

                ${rematchRequested

                  ? "bg-green-700 text-white cursor-not-allowed"

                  : "bg-green-500 hover:bg-green-600"
                }
              `}
            >

              {
                rematchRequested

                  ? "Waiting..."

                  : "Rematch"
              }

            </button>

            <button

              onClick={() => {

                window.location.reload();

              }}

              className="
                bg-red-500
                hover:bg-red-600
                px-8
                py-4
                rounded-2xl
                text-2xl
                font-bold
                shadow-xl
                transition
              "
            >

              Leave

            </button>

          </div>

        </div>

      );

    }

    return (

      <Game
        hand={hand}
        topCard={topCard}
        isMyTurn={socket.id === currentTurn}
        playCard={playCard}
        drawCard={drawCard}
        skipTurn={skipTurn}
        hasDrawnCard={hasDrawnCard}
        players={players}
        currentTurn={currentTurn}
        myId={socket.id}
        gameMessage={gameMessage}
        direction={direction}
        pendingDraw={pendingDraw}
        lastStackAmount={lastStackAmount}
        unoState={unoState}
        callUno={callUno}
      />


    );

  }

  return (
    <Lobby
      createName={createName}
      setCreateName={setCreateName}
      joinName={joinName}
      setJoinName={setJoinName}
      joinRoomCode={joinRoomCode}
      setJoinRoomCode={setJoinRoomCode}
      roomId={roomId}
      createRoom={createRoom}
      joinRoom={joinRoom}
      players={players}
      startGame={startGame}
      isHost={isHost}
      gameMode={gameMode}
      setGameMode={setGameMode}
    />
  );
}

export default App;