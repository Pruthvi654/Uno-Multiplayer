// ===============================
// IMPORT REQUIRED PACKAGES
// ===============================

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// ===============================
// INITIALIZE EXPRESS APP
// ===============================

const app = express();

app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// ===============================
// INITIALIZE SOCKET.IO
// ===============================

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ===============================
// STORE ALL GAME ROOMS
// ===============================

const rooms = {};

function generateDeck() {

  const colors = [
    "red",
    "blue",
    "green",
    "yellow"
  ];

  const deck = [];

  // =====================================
  // COLORED CARDS
  // =====================================

  colors.forEach(color => {

    // ONE ZERO CARD
    deck.push({
      color,
      type: "number",
      value: 0
    });

    // TWO OF 1-9
    for (let number = 1; number <= 9; number++) {

      deck.push({
        color,
        type: "number",
        value: number
      });

      deck.push({
        color,
        type: "number",
        value: number
      });

    }

    // TWO SKIP CARDS
    for (let i = 0; i < 2; i++) {

      deck.push({
        color,
        type: "skip"
      });

    }

    // TWO REVERSE CARDS
    for (let i = 0; i < 2; i++) {

      deck.push({
        color,
        type: "reverse"
      });

    }

    // TWO DRAW TWO CARDS
    for (let i = 0; i < 2; i++) {

      deck.push({
        color,
        type: "draw2"
      });

    }

  });

  // =====================================
  // WILD CARDS
  // =====================================

  // FOUR WILD
  for (let i = 0; i < 4; i++) {

    deck.push({
      color: "wild",
      type: "wild"
    });

  }

  // FOUR WILD +4
  for (let i = 0; i < 4; i++) {

    deck.push({
      color: "wild",
      type: "wild4"
    });

  }
  return shuffleDeck(deck);

}

// ======================================================
// SHUFFLE DECK
// ======================================================

function shuffleDeck(deck) {

  for (let i = deck.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [deck[i], deck[j]] = [deck[j], deck[i]];

  }

  return deck;

}

// ======================================================
// PLAYER HAND SIZES
// ======================================================

function getPlayersWithHandSizes(room) {

  return room.players.map(player => ({

    id: player.id,

    username: player.username,

    handSize:
      room.playerHands[player.id]?.length || 0,

    isSpectator:
      player.isSpectator

  }));

}

function hasStackCard(
  hand,
  topCard
) {

  return hand.some(card =>

    isValidMove(
      card,
      topCard,
      1
    )

  );

}

function isValidMove(
  card,
  topCard,
  pendingDraw
) {

  // =====================================
  // STACKING MODE
  // =====================================

  if (pendingDraw > 0) {

    // +2 STACK RULES
    if (topCard.type === "draw2") {

      return (

        card.type === "draw2" ||

        card.type === "wild4"

      );

    }

    // +4 STACK RULES
    if (topCard.type === "wild4") {

      return (

        card.type === "wild4"

      );

    }


    return false;

  }
  // WILD ALWAYS PLAYABLE
  if (
    card.type === "wild" ||

    card.type === "wild4"
  ) {

    return true;

  }

  // =====================================
  // NORMAL RULES
  // =====================================

  return (

    // SAME COLOR
    card.color ===
    (
      topCard.chosenColor ||
      topCard.color
    ) ||

    // SAME NUMBER
    (
      card.type === "number" &&
      topCard.type === "number" &&
      card.value === topCard.value
    ) ||

    // SKIP
    (
      card.type === "skip" &&
      topCard.type === "skip"
    ) ||

    // REVERSE
    (
      card.type === "reverse" &&
      topCard.type === "reverse"
    ) ||

    // DRAW2
    (
      card.type === "draw2" &&
      topCard.type === "draw2"
    )

  );

}

function resolvePendingDraw(room) {

  console.log("\n========== PENDING DRAW DEBUG ==========");

  console.log(
    "Pending Draw:",
    room.pendingDraw
  );

  console.log(
    "Top Card:",
    room.topCard
  );

  console.log(
    "Current Turn ID:",
    room.currentTurn
  );

  // CURRENT PLAYER
  const currentPlayer =

    room.players.find(
      player => player.id === room.currentTurn
    );

  console.log(
    "Current Player:",
    currentPlayer?.username
  );

  if (!currentPlayer) {

    console.log("NO CURRENT PLAYER FOUND");

    return;

  }

  // PLAYER HAND
  const hand =
    room.playerHands[currentPlayer.id];

  console.log(
    "Player Hand:",
    hand
  );

  // CAN STACK?
  const canStack =
    hasStackCard(hand, room.topCard);

  console.log(
    "Can Stack:",
    canStack
  );

  // PLAYER CAN STACK
  if (canStack) {

    console.log(
      "PLAYER HAS STACK CARD"
    );

    console.log(
      "=======================================\n"
    );

    return;

  }

  // AUTO DRAW
  console.log(
    "AUTO DRAW ACTIVATED"
  );

  for (let i = 0; i < room.pendingDraw; i++) {

    if (room.deck.length > 0) {

      const drawnCard =
        safeDrawCard(room);

      console.log(
        "Drawn Card:",
        drawnCard
      );

      hand.push(drawnCard);

    }

  }

  room.gameMessage =
    `${currentPlayer.username} drew ${room.pendingDraw} cards!`;

  // RESET UNO IF PLAYER NOW HAS >1 CARD
  if (

    hand.length > 1 &&

    room.unoState.targetPlayerId === currentPlayer.id

  ) {

    resetUnoState(room);

  }

  // CLEAR PENDING
  room.pendingDraw = 0;

  room.pendingDrawType = null;

  // FIND NEXT PLAYER
  const currentPlayerIndex =

    room.players.findIndex(
      player => player.id === currentPlayer.id
    );

  const nextPlayerIndex =

    getNextActivePlayerIndex(
      room,
      currentPlayerIndex
    );

  console.log(
    "Next Player:",
    room.players[nextPlayerIndex].username
  );

  room.currentTurn =
    room.players[nextPlayerIndex].id;

  console.log(
    "=======================================\n"
  );

}

function getSafeUnoState(room) {

  return {

    targetPlayerId:
      room.unoState.targetPlayerId,

    canCallUno:
      room.unoState.canCallUno,

    canCatch:
      room.unoState.canCatch

  };

}

function resetUnoState(room) {

  // CLEAR TIMER
  if (room.unoState.timeout) {

    clearTimeout(
      room.unoState.timeout
    );

  }

  // RESET STATE
  room.unoState = {

    targetPlayerId: null,

    canCallUno: false,

    canCatch: false,

    timeout: null

  };

}

function reshuffleDeck(room) {

  // KEEP CURRENT TOP CARD
  const currentTop = room.topCard;

  // TAKE ALL OLD DISCARDS
  const reshuffleCards =

    room.discardPile.filter(
      card => card !== currentTop
    );

  // SHUFFLE
  room.deck =
    shuffleDeck(reshuffleCards);

  // RESET DISCARD
  room.discardPile = [
    currentTop
  ];

  console.log(
    "Deck Reshuffled!"
  );

}
function safeDrawCard(room) {

  // RESHUFFLE IF EMPTY
  if (room.deck.length === 0) {

    reshuffleDeck(room);

  }

  // STILL EMPTY
  if (room.deck.length === 0) {

    return null;

  }

  return room.deck.pop();

}

function getNextActivePlayerIndex(
  room,
  currentIndex,
  moveSteps = 1
) {

  let index = currentIndex;

  let stepsTaken = 0;

  while (stepsTaken < moveSteps) {

    index = (

      index +
      room.direction +
      room.players.length

    ) % room.players.length;

    // ONLY COUNT ACTIVE PLAYERS
    if (!room.players[index].isSpectator) {

      stepsTaken++;

    }

  }

  return index;

}

function getActivePlayers(room) {

  return room.players.filter(

    player => !player.isSpectator

  );

}

// ======================================================
// SOCKET CONNECTION
// ======================================================

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  // ======================================================
  // CREATE ROOM
  // ======================================================

  socket.on(
    "create-room",
    ({
      username,
      gameMode
    }) => {

      const roomId =
        Math.random().toString(36).substring(2, 8);

      rooms[roomId] = {

        host: socket.id,

        gameStarted: false,

        players: [
          {
            id: socket.id,
            username,
            isSpectator: false
          }
        ],

        deck: [],

        discardPile: [],

        playerHands: {},

        currentTurn: null,

        topCard: null,

        hasDrawnCard: false,

        direction: 1,

        pendingDraw: 0,

        pendingDrawType: null,

        gameMessage: "",

        unoState: {

          targetPlayerId: null,

          canCallUno: false,

          canCatch: false,

          timeout: null,

        },

        gameMode,

        winners: [],

        actionLocked: false,

        rematchVotes: []

      };

      socket.join(roomId);

      socket.emit("room-created", {

        roomId,

        players: rooms[roomId].players

      });

      console.log("Room Created:", roomId);

    });

  // ======================================================
  // JOIN ROOM
  // ======================================================

  socket.on("join-room", ({ roomId, username }) => {

    if (!rooms[roomId]) {

      socket.emit(
        "error-message",
        "Room does not exist"
      );

      return;

    }

    // PLAYER ALREADY IN ROOM
    const alreadyJoined =

      rooms[roomId].players.some(
        player => player.id === socket.id
      );

    if (alreadyJoined) {

      socket.emit(
        "error-message",
        "You are already in the room"
      );

      return;

    }

    if (rooms[roomId].players.length >= 4) {

      socket.emit(
        "error-message",
        "Room is full"
      );

      return;

    }

    rooms[roomId].players.push({

      id: socket.id,

      username,

      isSpectator: false

    });

    socket.join(roomId);

    io.to(roomId).emit(
      "update-players",
      rooms[roomId].players
    );

    console.log(username, "joined", roomId);

  });

  // ======================================================
  // START GAME
  // ======================================================

  socket.on("start-game", ({ roomId }) => {

    if (!rooms[roomId]) return;

    if (rooms[roomId].host !== socket.id) return;

    const room = rooms[roomId];

    room.gameStarted = true;

    room.deck = generateDeck();

    room.playerHands = {};

    room.players.forEach(player => {

      room.playerHands[player.id] = [];

      for (let i = 0; i < 5; i++) {

        room.playerHands[player.id].push(
          safeDrawCard(room)
        );

      }

    });

    while (true) {

      const card =
        safeDrawCard(room);

      if (!card) break;

      // NUMBER CARD FOUND
      if (card.type === "number") {

        room.topCard = card;

        break;

      }

      // PUT ACTION CARD BACK
      room.deck.unshift(card);

      // RESHUFFLE AGAIN
      room.deck =
        shuffleDeck(room.deck);

    }

    room.discardPile = [
      room.topCard
    ];

    room.currentTurn = room.players[0].id;

    room.players.forEach(player => {

      io.to(player.id).emit("game-started", {

        hand: room.playerHands[player.id],

        topCard: room.topCard,

        currentTurn: room.currentTurn,

        players: getPlayersWithHandSizes(room),

        direction: room.direction,

        pendingDraw: room.pendingDraw,

        gameMessage: room.gameMessage,

        unoState: getSafeUnoState(room)

      });

    });

    console.log("Game Started:", roomId);

  });

  // ======================================================
  // PLAY CARD
  // ======================================================

  socket.on("play-card", ({
    roomId,
    cardIndex,
    chosenColor
  }) => {

    const room = rooms[roomId];

    if (!room) return;

    // =====================================
    // ACTION LOCK
    // =====================================

    if (room.actionLocked) {

      return;

    }

    room.actionLocked = true;

    try {

      // =====================================
      // TURN VALIDATION
      // =====================================

      if (room.currentTurn !== socket.id) {

        return;

      }

      const playerHand =
        room.playerHands[socket.id];

      // INVALID HAND
      if (!playerHand) {

        return;

      }

      const selectedCard =
        playerHand[cardIndex];

      // INVALID CARD
      if (!selectedCard) {

        return;

      }

      const currentPlayerIndex =

        room.players.findIndex(
          player => player.id === socket.id
        );

      const topCard = room.topCard;

      // =====================================
      // PENDING DRAW LOGIC
      // =====================================

      if (room.pendingDraw > 0) {

        let validStack = false;

        // +2 RULES
        if (topCard.type === "draw2") {

          validStack =

            selectedCard.type === "draw2" ||

            selectedCard.type === "wild4";

        }

        // +4 RULES
        else if (topCard.type === "wild4") {

          validStack =

            selectedCard.type === "wild4";

        }

        // PLAYER CANNOT STACK
        if (!validStack) {

          for (let i = 0; i < room.pendingDraw; i++) {

            const drawnCard =
              safeDrawCard(room);

            if (drawnCard) {

              room.playerHands[socket.id]
                .push(drawnCard);

            }

          }

          // RESET UNO
          if (

            room.playerHands[socket.id].length > 1 &&

            room.unoState.targetPlayerId === socket.id

          ) {

            resetUnoState(room);

          }

          room.gameMessage =
            `${room.players[currentPlayerIndex].username} drew ${room.pendingDraw} cards!`;

          room.pendingDraw = 0;

          room.pendingDrawType = null;

          const nextPlayerIndex =

            getNextActivePlayerIndex(
              room,
              currentPlayerIndex
            );

          room.currentTurn =
            room.players[nextPlayerIndex].id;

          room.hasDrawnCard = false;

          room.players.forEach(player => {

            io.to(player.id).emit("game-update", {

              hand: room.playerHands[player.id],

              topCard: room.topCard,

              currentTurn: room.currentTurn,

              hasDrawnCard: room.hasDrawnCard,

              players: getPlayersWithHandSizes(room),

              gameMessage: room.gameMessage,

              direction: room.direction,

              pendingDraw: room.pendingDraw,

              lastStackAmount: room.lastStackAmount || 0,

              unoState: getSafeUnoState(room)


            });

          });

          return;

        }

      }

      // =====================================
      // VALIDATE MOVE
      // =====================================

      const validMove = isValidMove(
        selectedCard,
        topCard,
        room.pendingDraw
      );

      if (!validMove) {

        return;

      }

      // =====================================
      // REMOVE CARD
      // =====================================

      playerHand.splice(cardIndex, 1);

      // =====================================
      // MOVE OLD TOP CARD
      // =====================================

      const previousTopCard =
        room.topCard;

      if (previousTopCard) {

        room.discardPile.push(
          previousTopCard
        );

      }

      // =====================================
      // UPDATE TOP CARD
      // =====================================

      room.topCard = selectedCard;

      // =====================================
      // WILD COLOR
      // =====================================

      if (

        selectedCard.type === "wild" ||

        selectedCard.type === "wild4"

      ) {

        room.topCard = {

          ...selectedCard,

          chosenColor

        };

      }

      // =====================================
      // UNO CHECK
      // =====================================

      if (playerHand.length === 1) {

        resetUnoState(room);

        room.unoState.targetPlayerId =
          socket.id;

        room.unoState.canCallUno = true;

        room.unoState.canCatch = false;

        room.gameMessage =
          `${room.players[currentPlayerIndex].username} has UNO!`;

        // START TIMER
        room.unoState.timeout = setTimeout(() => {

          room.unoState.canCatch = true;

          room.gameMessage =
            "UNO can now be caught!";

          room.players.forEach(player => {

            io.to(player.id).emit("game-update", {

              hand: room.playerHands[player.id],

              topCard: room.topCard,

              currentTurn: room.currentTurn,

              hasDrawnCard: room.hasDrawnCard,

              players: getPlayersWithHandSizes(room),

              gameMessage: room.gameMessage,

              direction: room.direction,

              pendingDraw: room.pendingDraw,

              unoState: getSafeUnoState(room)

            });

          });

        }, 3000);

      }

      // =====================================
      // WIN CONDITION
      // =====================================

      if (playerHand.length === 0) {

        resetUnoState(room);

        // =====================================
        // NORMAL MODE
        // =====================================

        if (room.gameMode === "normal") {

          io.to(roomId).emit("game-over", {

            rankings: [

              {
                id: socket.id,
                position: 1
              }

            ]

          });

          console.log("Game Over");

          return;

        }

        // =====================================
        // ELIMINATION MODE
        // =====================================

        const winningPlayer =

          room.players.find(
            player => player.id === socket.id
          );

        // SPECTATOR MODE
        winningPlayer.isSpectator = true;

        // SAVE WINNER
        room.winners.push(socket.id);

        room.gameMessage =
          `${winningPlayer.username} finished!`;

        // ACTIVE PLAYERS LEFT
        const activePlayers =
          getActivePlayers(room);

        // LAST LOSER FOUND
        if (activePlayers.length === 1) {

          const rankings = [

            ...room.winners.map(
              (playerId, index) => ({

                id: playerId,

                position: index + 1

              })
            ),

            {
              id: activePlayers[0].id,

              position:
                room.winners.length + 1,

              isLoser: true
            }

          ];

          io.to(roomId).emit("game-over", {

            rankings

          });

          console.log("Elimination Game Over");

          return;

        }

      }

      let moveSteps = 1;

      // =====================================
      // WILD +4
      // =====================================

      if (selectedCard.type === "wild4") {

        room.pendingDraw += 4;

        room.lastStackAmount = room.pendingDraw;

        room.pendingDrawType = "wild4";

        room.gameMessage =
          `+${room.pendingDraw} Cards!`;

      }

      // =====================================
      // DRAW TWO
      // =====================================

      else if (selectedCard.type === "draw2") {

        room.pendingDraw += 2;

        room.lastStackAmount = room.pendingDraw;

        room.pendingDrawType = "draw2";

        room.gameMessage =
          `+${room.pendingDraw} Cards!`;

      }


      // =====================================
      // REVERSE
      // =====================================

      else if (selectedCard.type === "reverse") {

        room.direction *= -1;

        room.gameMessage =
          "Direction Reversed!";

        // 2 ACTIVE PLAYER RULE
        if (getActivePlayers(room).length === 2) {

          moveSteps = 2;

        }

      }

      // =====================================
      // SKIP
      // =====================================

      else if (selectedCard.type === "skip") {

        const skippedPlayerIndex =

          getNextActivePlayerIndex(
            room,
            currentPlayerIndex
          );

        const skippedPlayer =
          room.players[skippedPlayerIndex];

        room.gameMessage =
          `${skippedPlayer.username} was skipped!`;

        moveSteps = 2;

      }

      // =====================================
      // NORMAL CARD
      // =====================================

      else {

        room.gameMessage = "";

        room.pendingDraw = 0;

        room.lastStackAmount = 0;

        room.pendingDrawType = null;

      }


      // =====================================
      // NEXT PLAYER
      // =====================================

      const nextPlayerIndex =

        getNextActivePlayerIndex(
          room,
          currentPlayerIndex,
          moveSteps
        );

      room.currentTurn =
        room.players[nextPlayerIndex].id;

      room.hasDrawnCard = false;

      // =====================================
      // AUTO CHECK STACK SYSTEM
      // =====================================

      if (room.pendingDraw > 0) {

        resolvePendingDraw(room);

      }

      // =====================================
      // SEND UPDATE
      // =====================================

      room.players.forEach(player => {

        io.to(player.id).emit("game-update", {

          hand: room.playerHands[player.id],

          topCard: room.topCard,

          currentTurn: room.currentTurn,

          hasDrawnCard: room.hasDrawnCard,

          players: getPlayersWithHandSizes(room),

          gameMessage: room.gameMessage,

          direction: room.direction,

          pendingDraw: room.pendingDraw,

          lastStackAmount: room.lastStackAmount || 0,

          unoState: getSafeUnoState(room)


        });

      });

      console.log("Card Played");

    }

    finally {

      // =====================================
      // ALWAYS UNLOCK
      // =====================================

      room.actionLocked = false;

    }

  });

  // ======================================================
  // DRAW CARD
  // ======================================================

  socket.on("draw-card", ({ roomId }) => {

    const room = rooms[roomId];

    if (!room) return;

    // =====================================
    // ACTION LOCK
    // =====================================

    if (room.actionLocked) {

      return;

    }

    room.actionLocked = true;

    try {

      // =====================================
      // TURN VALIDATION
      // =====================================

      if (room.currentTurn !== socket.id) {

        return;

      }

      // INVALID HAND
      if (!room.playerHands[socket.id]) {

        return;

      }

      // =====================================
      // ACCEPT STACK PENALTY
      // =====================================

      if (room.pendingDraw > 0) {

        for (let i = 0; i < room.pendingDraw; i++) {

          const drawnCard =
            safeDrawCard(room);

          if (drawnCard) {

            room.playerHands[socket.id]
              .push(drawnCard);

          }

        }

        // RESET UNO
        if (

          room.playerHands[socket.id].length > 1 &&

          room.unoState.targetPlayerId === socket.id

        ) {

          resetUnoState(room);

        }

        room.gameMessage =
          `${room.players.find(
            p => p.id === socket.id
          ).username} drew ${room.pendingDraw} cards!`;

        room.pendingDraw = 0;

        room.pendingDrawType = null;

        const currentPlayerIndex =

          room.players.findIndex(
            player => player.id === socket.id
          );

        const nextPlayerIndex =

          getNextActivePlayerIndex(
            room,
            currentPlayerIndex
          );

        room.currentTurn =
          room.players[nextPlayerIndex].id;

        room.hasDrawnCard = false;

        room.players.forEach(player => {

          io.to(player.id).emit("game-update", {

            hand: room.playerHands[player.id],

            topCard: room.topCard,

            currentTurn: room.currentTurn,

            hasDrawnCard: room.hasDrawnCard,

            players: getPlayersWithHandSizes(room),

            gameMessage: room.gameMessage,

            direction: room.direction,

            pendingDraw: room.pendingDraw,

            unoState: getSafeUnoState(room)

          });

        });

        return;

      }

      // =====================================
      // NORMAL DRAW
      // =====================================

      const drawnCard =
        safeDrawCard(room);

      // NO CARD AVAILABLE
      if (!drawnCard) {

        return;

      }

      room.playerHands[socket.id]
        .push(drawnCard);

      room.hasDrawnCard = true;

      // RESET UNO
      if (

        room.playerHands[socket.id].length > 1 &&

        room.unoState.targetPlayerId === socket.id

      ) {

        resetUnoState(room);

      }

      const topCard = room.topCard;

      const playerHand =
        room.playerHands[socket.id];

      const canPlay = playerHand.some(card =>

        isValidMove(
          card,
          topCard,
          room.pendingDraw
        )

      );

      // =====================================
      // AUTO SKIP
      // =====================================

      if (!canPlay) {

        const currentPlayerIndex =

          room.players.findIndex(
            player => player.id === socket.id
          );

        const nextPlayerIndex =

          getNextActivePlayerIndex(
            room,
            currentPlayerIndex
          );

        room.currentTurn =
          room.players[nextPlayerIndex].id;

        room.hasDrawnCard = false;

      }

      // =====================================
      // SEND UPDATE
      // =====================================

      room.players.forEach(player => {

        io.to(player.id).emit("game-update", {

          hand: room.playerHands[player.id],

          topCard: room.topCard,

          currentTurn: room.currentTurn,

          hasDrawnCard: room.hasDrawnCard,

          players: getPlayersWithHandSizes(room),

          gameMessage: room.gameMessage,

          direction: room.direction,

          pendingDraw: room.pendingDraw,

          unoState: getSafeUnoState(room)

        });

      });

      console.log("Card Drawn");

    }

    finally {

      // =====================================
      // ALWAYS UNLOCK
      // =====================================

      room.actionLocked = false;

    }

  });

  // ======================================================
  // SKIP TURN
  // ======================================================

  socket.on("skip-turn", ({ roomId }) => {

    const room = rooms[roomId];

    if (!room) return;

    // =====================================
    // ACTION LOCK
    // =====================================

    if (room.actionLocked) {

      return;

    }

    room.actionLocked = true;

    try {

      // =====================================
      // TURN VALIDATION
      // =====================================

      if (room.currentTurn !== socket.id) {

        return;

      }

      // MUST DRAW FIRST
      if (!room.hasDrawnCard) {

        return;

      }

      // INVALID HAND
      if (!room.playerHands[socket.id]) {

        return;

      }

      const currentPlayerIndex =

        room.players.findIndex(
          player => player.id === socket.id
        );

      // INVALID PLAYER
      if (currentPlayerIndex === -1) {

        return;

      }

      const nextPlayerIndex =

        getNextActivePlayerIndex(
          room,
          currentPlayerIndex
        );

      room.currentTurn =
        room.players[nextPlayerIndex].id;

      room.hasDrawnCard = false;

      // =====================================
      // SEND UPDATE
      // =====================================

      room.players.forEach(player => {

        io.to(player.id).emit("game-update", {

          hand: room.playerHands[player.id],

          topCard: room.topCard,

          currentTurn: room.currentTurn,

          hasDrawnCard: room.hasDrawnCard,

          players: getPlayersWithHandSizes(room),

          gameMessage: room.gameMessage,

          direction: room.direction,

          pendingDraw: room.pendingDraw,

          unoState: getSafeUnoState(room)

        });

      });

      console.log("Turn Skipped");

    }

    finally {

      // =====================================
      // ALWAYS UNLOCK
      // =====================================

      room.actionLocked = false;

    }

  });

  // ======================================================
  // CALL-UNO
  // ======================================================

  socket.on("call-uno", ({ roomId }) => {

    console.log("UNO BUTTON PRESSED");

    const room = rooms[roomId];

    if (!room) return;

    // =====================================
    // ACTION LOCK
    // =====================================

    if (room.actionLocked) {

      return;

    }

    room.actionLocked = true;

    try {

      const unoState = room.unoState;

      // INVALID UNO STATE
      if (!unoState) {

        return;

      }

      // NO ACTIVE UNO
      if (!unoState.targetPlayerId) {

        return;

      }

      // TARGET PLAYER EXISTS?
      const targetPlayer =

        room.players.find(
          p => p.id === unoState.targetPlayerId
        );

      if (!targetPlayer) {

        resetUnoState(room);

        return;

      }

      // =====================================
      // TARGET PLAYER CALLED UNO
      // =====================================

      if (

        socket.id === unoState.targetPlayerId &&

        unoState.canCallUno

      ) {

        clearTimeout(
          unoState.timeout
        );

        room.gameMessage =
          `${targetPlayer.username} called UNO!`;

        resetUnoState(room);

      }

      // =====================================
      // OTHER PLAYER CATCHES UNO
      // =====================================

      else if (

        socket.id !== unoState.targetPlayerId &&

        unoState.canCatch

      ) {

        const punishedHand =

          room.playerHands[
          unoState.targetPlayerId
          ];

        // INVALID HAND
        if (!punishedHand) {

          resetUnoState(room);

          return;

        }

        // DRAW PENALTY
        for (let i = 0; i < 2; i++) {

          const drawnCard =
            safeDrawCard(room);

          if (drawnCard) {

            punishedHand.push(
              drawnCard
            );

          }

        }

        room.gameMessage =
          `${targetPlayer.username} forgot UNO! +2 cards`;

        resetUnoState(room);

      }

      // =====================================
      // UNO UPDATE
      // =====================================

      io.to(roomId).emit(
        "uno-update",
        getSafeUnoState(room)
      );

      // =====================================
      // GAME UPDATE
      // =====================================

      room.players.forEach(player => {

        io.to(player.id).emit("game-update", {

          hand: room.playerHands[player.id],

          topCard: room.topCard,

          currentTurn: room.currentTurn,

          hasDrawnCard: room.hasDrawnCard,

          players: getPlayersWithHandSizes(room),

          gameMessage: room.gameMessage,

          direction: room.direction,

          pendingDraw: room.pendingDraw,

          unoState: getSafeUnoState(room)

        });

      });

    }

    finally {

      // =====================================
      // ALWAYS UNLOCK
      // =====================================

      room.actionLocked = false;

    }

  });

  // ======================================================
  // REQUEST REMATCH
  // ======================================================

  socket.on("request-rematch", ({ roomId }) => {

    const room = rooms[roomId];

    if (!room) return;

    // ALREADY VOTED
    if (

      room.rematchVotes.includes(
        socket.id
      )

    ) {

      return;

    }

    room.rematchVotes.push(
      socket.id
    );

    // ACTIVE PLAYERS
    const activePlayers =

      room.players.map(
        player => player.id
      );

    // EVERYONE ACCEPTED
    const everyoneAccepted =

      activePlayers.every(
        playerId =>

          room.rematchVotes.includes(
            playerId
          )
      );

    if (!everyoneAccepted) {

      io.to(roomId).emit(
        "game-message",
        "Waiting for players..."
      );

      return;

    }

    // =====================================
    // RESET ROOM
    // =====================================

    room.rematchVotes = [];

    room.winners = [];

    room.pendingDraw = 0;

    room.pendingDrawType = null;

    room.direction = 1;

    room.hasDrawnCard = false;

    resetUnoState(room);

    // RESET PLAYERS
    room.players.forEach(player => {

      player.isSpectator = false;

    });

    // NEW DECK
    room.deck = generateDeck();

    room.discardPile = [];

    room.playerHands = {};

    // DEAL CARDS
    room.players.forEach(player => {

      room.playerHands[player.id] = [];

      for (let i = 0; i < 5; i++) {

        const drawnCard =
          safeDrawCard(room);

        if (drawnCard) {

          room.playerHands[player.id]
            .push(drawnCard);

        }

      }

    });

    // STARTING CARD
    while (true) {

      const card =
        safeDrawCard(room);

      if (!card) break;

      if (card.type === "number") {

        room.topCard = card;

        break;

      }

      room.deck.unshift(card);

      room.deck =
        shuffleDeck(room.deck);

    }

    // FIRST TURN
    room.currentTurn =
      room.players[0].id;

    room.gameStarted = true;

    // =====================================
    // RESTART GAME
    // =====================================

    room.players.forEach(player => {

      io.to(player.id).emit("game-started", {

        hand: room.playerHands[player.id],

        topCard: room.topCard,

        currentTurn: room.currentTurn,

        hasDrawnCard: room.hasDrawnCard,

        players: getPlayersWithHandSizes(room),

        gameMessage: "Rematch Started!",

        direction: room.direction,

        pendingDraw: room.pendingDraw,

        unoState: getSafeUnoState(room)

      });

    });

    console.log("Rematch Started");

  });

  // ======================================================
  // DISCONNECT
  // ======================================================

  socket.on("disconnect", () => {

    for (const roomId in rooms) {

      const room = rooms[roomId];

      // PLAYER EXISTS?
      const disconnectedPlayer =

        room.players.find(
          player => player.id === socket.id
        );

      if (!disconnectedPlayer) continue;

      // =====================================
      // CLEAR UNO STATE
      // =====================================

      if (

        room.unoState.targetPlayerId === socket.id

      ) {

        resetUnoState(room);

      }

      // =====================================
      // CLEAR PENDING DRAW
      // =====================================

      if (

        room.currentTurn === socket.id &&

        room.pendingDraw > 0

      ) {

        room.pendingDraw = 0;

        room.pendingDrawType = null;

      }

      // =====================================
      // WAS CURRENT TURN?
      // =====================================

      const wasCurrentTurn =

        room.currentTurn === socket.id;

      // =====================================
      // REMOVE PLAYER
      // =====================================

      room.players = room.players.filter(

        player => player.id !== socket.id

      );

      delete room.playerHands[socket.id];

      // =====================================
      // ROOM EMPTY
      // =====================================

      if (room.players.length === 0) {

        delete rooms[roomId];

        console.log(
          "Room Deleted:",
          roomId
        );

        continue;

      }

      // =====================================
      // HOST MIGRATION
      // =====================================

      if (

        room.host === socket.id

      ) {

        room.host =
          room.players[0].id;

      }

      // =====================================
      // FIX TURN
      // =====================================

      if (wasCurrentTurn) {

        const activePlayers =
          getActivePlayers(room);

        if (activePlayers.length > 0) {

          room.currentTurn =
            activePlayers[0].id;

        }

      }

      // =====================================
      // GAME END CHECK
      // =====================================

      const activePlayers =
        getActivePlayers(room);

      if (activePlayers.length === 1) {

        const rankings = [

          ...room.winners.map(
            (playerId, index) => ({

              id: playerId,

              position: index + 1

            })
          ),

          {
            id: activePlayers[0].id,

            position:
              room.winners.length + 1,

            isLoser: true
          }

        ];

        io.to(roomId).emit("game-over", {

          rankings

        });

        console.log(
          "Game Ended By Disconnect"
        );

        return;

      }

      // =====================================
      // UPDATE PLAYERS
      // =====================================

      io.to(roomId).emit(
        "update-players",
        room.players
      );

      // =====================================
      // UPDATE GAME
      // =====================================

      room.players.forEach(player => {

        io.to(player.id).emit("game-update", {

          hand: room.playerHands[player.id],

          topCard: room.topCard,

          currentTurn: room.currentTurn,

          hasDrawnCard: room.hasDrawnCard,

          players: getPlayersWithHandSizes(room),

          gameMessage:
            `${disconnectedPlayer.username} disconnected`,

          direction: room.direction,

          pendingDraw: room.pendingDraw,

          unoState: getSafeUnoState(room)

        });

      });

    }

    console.log(
      "User Disconnected:",
      socket.id
    );

  });
});

// ======================================================
// START SERVER
// ======================================================

server.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});