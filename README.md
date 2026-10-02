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

📁 Project Structure
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

🎯 Game Flow
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

🃏 Game Mechanics
The server handles core UNO rules, including:
Valid-card checks
Turn ownership
Reverse and Skip effects
Draw penalties
Draw stacking
Wild-card color selection
UNO state
Win conditions
Room state
This keeps the rules centralized instead of trusting browser clients to determine the outcome of a move.

⚡ Real-Time State
A room can contain state such as:
Room
├── Host
├── Players
├── Deck
├── Discard pile
├── Player hands
├── Current turn
├── Turn direction
├── Pending draw
├── Top card
├── UNO state
├── Winner state
└── Rematch state
Socket.IO is responsible for delivering state changes to connected players in real time.

🌐 Live Demo
Play now:
pruno.duckdns.org
or
https://uno-multiplayer-gamma.vercel.app/⁠

💻 Local Development
Requirements
Node.js 18+
npm
Clone
git clone https://github.com/Pruthvi654/Uno-Multiplayer.git
cd Uno-Multiplayer
Start the Server
cd server
npm install
npm start
Start the Client
Open another terminal:
cd client
npm install
npm start
The React application will start in development mode.

🔐 Environment Variables
Use .env.example as a reference for local configuration.
Do not commit real secrets or private credentials.

🧪 CI
GitHub Actions is configured to:
Install client dependencies
Build the React client
Install server dependencies
This provides a basic automated health check for changes pushed to main or submitted through pull requests.

🔮 Future Improvements
[ ] Reconnect support
[ ] Persistent player profiles
[ ] Match history
[ ] Public matchmaking
[ ] Private invite links
[ ] Spectator mode
[ ] Production logging and monitoring
[ ] Expanded automated test coverage
[ ] Accessibility improvements
[ ] Mobile application

👨‍💻 Author
Pruthvi Raj
GitHub: https://github.com/Pruthvi654

📄 License
This project is licensed under the MIT License.
See LICENSE for details.