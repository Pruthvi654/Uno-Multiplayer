# 🃏 UNO Multiplayer

<p align="center">
  <strong>Real-time multiplayer UNO for the browser</strong><br/>
  Create a room, join your friends, and play synchronized UNO games powered by Socket.IO.
</p>

<p align="center">
  <a href="https://uno-multiplayer-gamma.vercel.app/">🎮 Live Demo</a>
  &nbsp;•&nbsp;
  <a href="https://github.com/Pruthvi654/Uno-Multiplayer">📦 Source Code</a>
</p>

---

## ✨ Overview

**UNO Multiplayer** is a real-time multiplayer UNO game built with **React**, **Node.js**, **Express**, and **Socket.IO**.

The server maintains the authoritative game state while connected clients receive synchronized updates in real time. The project includes multiplayer rooms, turn management, card validation, draw penalties, UNO handling, animations, and rematch functionality.

---

## 🚀 Features

- 🎮 Real-time multiplayer gameplay
- 🏠 Create and join game rooms
- 👥 Multiplayer lobby
- 🃏 Number, Skip, Reverse, Draw Two, Wild, and Wild Draw Four cards
- ➕ Draw-card stacking
- 🌈 Wild-card color selection
- 🚨 UNO declaration and catch system
- 🔄 Turn-direction support
- ⏭️ Skip-turn functionality
- 🏆 Winner detection
- 🔁 Rematch support
- ⚡ Server-authoritative game state
- 📡 Real-time synchronization with Socket.IO
- 🎬 Animated interface with Framer Motion
- 🃏 Local card assets for the game interface

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Real-time Client | Socket.IO Client |
| Backend | Node.js |
| HTTP Server | Express 5 |
| Real-time Server | Socket.IO |
| Communication | WebSockets / Socket.IO |
| Package Manager | npm |

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│          React Client        │
│                              │
│  UI • Lobby • Game Board     │
│  Tailwind • Framer Motion    │
│  Socket.IO Client            │
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
│  Room Management             │
│  Deck & Card Logic           │
│  Turn Management             │
│  UNO / Draw Rules            │
│  Authoritative Game State    │
└──────────────────────────────┘
```

---

## 📁 Project Structure

```text
Uno-Multiplayer/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── cards/
│   │   │   └── effects/
│   │   ├── components/
│   │   │   ├── cards/
│   │   │   └── effects/
│   │   ├── utils/
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── socket.js
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .env.example
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

---

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
  ├── Play Card ──► Validate ──► Update Game State
  │
  ├── Draw Card ──► Update Hand ──► Continue / Next Turn
  │
  ├── Skip Turn ──► Next Player
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
```

---

## 🃏 Game Mechanics

The server handles the core UNO game rules, including:

- ✅ Valid-card checks
- ✅ Turn ownership
- ✅ Skip effects
- ✅ Reverse effects
- ✅ Draw Two penalties
- ✅ Wild Draw Four penalties
- ✅ Draw stacking
- ✅ Wild-card color selection
- ✅ UNO declaration
- ✅ UNO catch and penalty
- ✅ Win conditions
- ✅ Rematch handling
- ✅ Room state management

Game-rule validation is performed on the server so that clients do not independently determine the outcome of a move.

---

## ⚡ Real-Time Multiplayer

The game uses **Socket.IO** to synchronize gameplay between connected players in real time.

A game room maintains state such as:

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

When a player performs an action:

```text
Player Action
      │
      ▼
Socket.IO Event
      │
      ▼
Server Validation
      │
      ▼
Game State Update
      │
      ▼
Broadcast to Players
```

This allows all connected players to see the same game state in real time.

---

## 🌐 Live Demo

### 🎮 Play UNO Multiplayer

**Primary Demo:**

https://pruno.duckdns.org

**Alternative Deployment:**

https://uno-multiplayer-gamma.vercel.app/

---

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

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Start the Server

```bash
npm start
```

The Socket.IO server runs on port `5000` by default.

### 4. Start the Client

Open another terminal:

```bash
cd client
npm install
npm start
```

The React development server will start locally.

---

## 🔐 Environment Variables

Environment variables can be configured using the `.env.example` file.

Copy the example file and configure the required values for your local environment.

```bash
cp .env.example .env
```

**Never commit real credentials, API keys, passwords, or other secrets to the repository.**

---

## 🧪 Continuous Integration

The project includes a GitHub Actions workflow located at:

```text
.github/workflows/ci.yml
```

The workflow performs basic project checks such as:

- 📦 Installing client dependencies
- 🏗️ Building the React client
- 📦 Installing server dependencies
- 🔍 Running checks automatically for pushes and pull requests

This helps identify basic build and dependency issues before changes are merged.

---

## 🤝 Contributing

Contributions are welcome.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting changes.

A typical contribution workflow is:

```text
Fork
  │
  ▼
Create Branch
  │
  ▼
Make Changes
  │
  ▼
Test
  │
  ▼
Commit
  │
  ▼
Pull Request
```

---

## 🔮 Future Improvements

Potential improvements include:

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
- [ ] Improved room management
- [ ] Better handling of disconnected players

---

## 👨‍💻 Author

### Pruthvi Raj

Software development enthusiast focused on building web applications, real-time systems, and interactive software projects.

**GitHub:**  
https://github.com/Pruthvi654

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.