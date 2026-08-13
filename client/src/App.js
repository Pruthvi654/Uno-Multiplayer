import { useEffect, useState } from "react";
import socket from "./socket";

import Lobby from "./components/Lobby";
import Game from "./components/Game";
import ResultScreen from "./components/ResultScreen";

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
    // READ URL SEARCH PARAMS FOR INVITE LINK (?join=ABC123 or ?room=ABC123)
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get("join") || urlParams.get("room");

    if (inviteCode) {
      setJoinRoomCode(inviteCode.trim());
    }
  }, []);

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
        <ResultScreen
          rankings={rankings}
          players={players}
          myId={socket.id}
          requestRematch={requestRematch}
          rematchRequested={rematchRequested}
        />
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
        roomId={roomId}
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