# 🃏 UNO Multiplayer

<p align="center">
  <strong>Real-time multiplayer UNO for the browser</strong><br/>
  Create a room, invite players, and play synchronized UNO games powered by Socket.IO.
</p>

<p align="center">
  <a href="https://uno-multiplayer-gamma.vercel.app/">🎮 Live Demo</a>
  &nbsp;•&nbsp;
  <a href="https://github.com/Pruthvi654/Uno-Multiplayer">📦 Source Code</a>
</p>

---

## ✨ Overview

**UNO Multiplayer** is a real-time browser game built with **React** on the client and **Node.js + Socket.IO** on the server.

The server maintains the authoritative game state while connected clients receive synchronized updates over WebSockets. This keeps rooms, turns, hands, card effects, UNO state, and game results consistent between players.

## 🚀 Features

- 🎮 Real-time multiplayer gameplay
- 🏠 Create and join game rooms
- 👥 Multiplayer lobby
- 🃏 Number, Skip, Reverse, Draw Two, Wild, and Wild Draw Four cards
- ➕ Draw-card stacking
- 🌈 Wild-card color selection
- 🚨 UNO declaration handling
- 🔄 Turn-direction support
- 🏆 Winner and rematch flow
- ⚡ Server-authoritative game state
- 🎬 Animated interface with Framer Motion
- 📡 Real-time synchronization with Socket.IO

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Real-time client | Socket.IO Client |
| Backend | Node.js |
| HTTP server | Express 5 |
| Real-time server | Socket.IO |
| Deployment | Vercel |

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│          React Client        │
│                              │
│  UI • Lobby • Game Board     │
│  Tailwind • Framer Motion    │
│  Socket.IO Client             │
└───────────────┬──────────────┘
                │
           WebSocket /
            Socket.IO
                │
                ▼
┌──────────────────────────────┐
│         Node.js Server       │
│                              │
│  Express • Socket.IO         │
│  Room Management              │
│  Deck & Card Logic            │
│  Turn Management              │
│  UNO / Draw Rules             │
│  Authoritative Game State     │
└──────────────────────────────┘
```


## 📁 Project Structure

```text
Uno-Multiplayer/
├── client/
├── server/
├── .github/
│   └── workflows/
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md

## 🎯 Game Flow

```text
Start
  │
  ▼
Create / Join Room
  │
  ▼
Lobby
  │
  ▼
Host Starts Game
  │
  ▼
Cards Dealt
  │
  ▼
Player Turn
  │
  ├── Play Card ──► Validate ──► Broadcast State
  │
  ├── Draw Card ──► Update Hand ──► Next Turn
  │
  └── UNO ────────► Update UNO State
  │
  ▼
Player Has 0 Cards
  │
  ▼
Winner
  │
  ▼
Rematch / New Game

## 🃏 Game Mechanics

The server handles the core UNO game rules, including:

- ✅ Valid-card checks
- ✅ Turn ownership
- ✅ Skip and Reverse effects
- ✅ Draw penalties
- ✅ Draw stacking
- ✅ Wild-card color selection
- ✅ UNO state management
- ✅ Win conditions
- ✅ Room state management

Game-rule validation is handled on the server so that clients do not independently determine the outcome of a move.

## ⚡ Real-Time Multiplayer

The game uses **Socket.IO** to synchronize gameplay between connected players in real time.

A game room can contain state such as:

```text
Room
├── Host
├── Players
├── Deck
├── Discard Pile
├── Player Hands
├── Current Turn
├── Turn Direction
├── Pending Draw
├── Top Card
├── UNO State
├── Winner State
└── Rematch State
```

When a player performs an action, the server validates the action, updates the game state, and broadcasts the resulting state to the players in the room.

## 🌐 Live Demo

### 🎮 Play UNO Multiplayer

**Primary Demo:**  
[https://pruno.duckdns.org](https://pruno.duckdns.org)

**Vercel Deployment:**  
[https://uno-multiplayer-gamma.vercel.app/](https://uno-multiplayer-gamma.vercel.app/)

> The `pruno.duckdns.org` deployment is the primary game URL, while the Vercel deployment is available as an alternative.

## 💻 Local Development

### Requirements

Make sure you have the following installed:

- **Node.js 18 or later**
- **npm**

### 1. Clone the Repository

```bash
git clone https://github.com/Pruthvi654/Uno-Multiplayer.git
cd Uno-Multiplayer
```

### 2. Start the Server

Open a terminal and run:

```bash
cd server
npm install
npm start
```

The Node.js server will start using the configured server port.

### 3. Start the Client

Open another terminal:

```bash
cd client
npm install
npm start
```

The React development server will start locally.

## 🔐 Environment Variables

If environment variables are required for local configuration, use the provided `.env.example` file as a reference.

**Never commit real credentials, API keys, passwords, or other secrets to the repository.**

## 🧪 Continuous Integration

This repository includes a GitHub Actions workflow that performs basic project checks.

The workflow:

- 📦 Installs client dependencies
- 🏗️ Builds the React client
- 📦 Installs server dependencies
- 🔍 Runs automatically for changes pushed to `main` and pull requests

This helps catch basic build and dependency issues before changes are merged.

## 🔮 Future Improvements

The project can be expanded with:

- [ ] Reconnect support
- [ ] Persistent player profiles
- [ ] Match history
- [ ] Public matchmaking
- [ ] Private invite links
- [ ] Spectator mode
- [ ] Production logging and monitoring
- [ ] Expanded automated test coverage
- [ ] Accessibility improvements
- [ ] Mobile application
- [ ] In-game chat
- [ ] Player statistics and leaderboards

## 👨‍💻 Author

### Pruthvi Raj

Software development enthusiast focused on building web applications, real-time systems, and interactive software projects.

**GitHub:**  
[github.com/Pruthvi654](https://github.com/Pruthvi654)

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.