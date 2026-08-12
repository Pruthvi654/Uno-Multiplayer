import { useState } from "react";
import { motion } from "framer-motion";

function Lobby({
  createName,
  setCreateName,
  joinName,
  setJoinName,
  joinRoomCode,
  setJoinRoomCode,
  roomId,
  createRoom,
  joinRoom,
  players,
  startGame,
  isHost,
  gameMode,
  setGameMode
}) {
  const [copyStatus, setCopyStatus] = useState("");

  const copyRoomCode = async () => {
    if (!roomId) return;

    try {
      await navigator.clipboard.writeText(roomId);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 1500);
    } catch (error) {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 1500);
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b17] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.16),_transparent_20%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0.06))]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-[0.35em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
            UNO
          </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.45em] text-slate-400">
            Multiplayer Arena
          </p>
        </div>

        <div className="w-full max-w-6xl grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
            <div className="relative space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
                  Setup your match
                </p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white">
                  Create or join a room
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-300">
                  Choose your username, select a room mode, and start the game using the polished UNO arena theme.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/70 p-5 shadow-inner shadow-emerald-500/10 border border-emerald-400/10">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">Create room</p>
                    <input
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                      placeholder="Player name"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <select
                      value={gameMode}
                      onChange={(e) => setGameMode(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20"
                    >
                      <option value="normal">Normal Mode</option>
                      <option value="elimination">Elimination Mode</option>
                    </select>
                    <button
                      onClick={createRoom}
                      disabled={!createName}
                      className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4 text-lg font-bold text-white transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Create Match
                    </button>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5 shadow-inner shadow-amber-500/10 border border-amber-400/10">
                  <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300/80">Join room</p>
                    <input
                      value={joinRoomCode}
                      onChange={(e) => setJoinRoomCode(e.target.value)}
                      placeholder="Enter room code"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />
                    <input
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      placeholder="Player name"
                      className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                    <button
                      onClick={joinRoom}
                      disabled={!joinName || !joinRoomCode}
                      className="rounded-2xl bg-gradient-to-r from-lime-500 to-emerald-500 px-5 py-4 text-lg font-bold text-black transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Join Match
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/30 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10" />
            <div className="relative space-y-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Room overview</p>
                <h3 className="text-3xl font-extrabold text-white">Live Lobby</h3>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Room code</p>
                    <div className="mt-2 flex items-center gap-3">
                      <p className="text-2xl font-bold text-white">{roomId || "Not assigned"}</p>
                      {roomId && (
                        <button
                          onClick={copyRoomCode}
                          className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/20"
                        >
                          📋
                        </button>
                      )}
                    </div>
                    {copyStatus && <p className="mt-2 text-sm text-emerald-300">{copyStatus}</p>}
                  </div>
                  <div className="rounded-3xl bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                    {isHost ? "Host" : "Guest"}
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Players in room</p>
                <div className="mt-4 space-y-3">
                  {players.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-black/30 px-4 py-6 text-center text-slate-400">
                      No players yet. Create or join a room to begin.
                    </div>
                  ) : (
                    players.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4"
                      >
                        <span className="font-semibold text-white">{player.username}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {player.id === roomId ? "Host" : "Player"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-3xl bg-slate-950/80 px-6 py-4 text-sm text-slate-300">
                  A refined lobby experience for the match-ready UNO theme.
                </div>
                <button
                  onClick={startGame}
                  disabled={!isHost || players.length < 2}
                  className="rounded-3xl bg-gradient-to-r from-red-500 to-fuchsia-500 px-6 py-4 text-lg font-bold text-white transition hover:scale-[1.01] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isHost ? "Start Game" : "Waiting for host"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
