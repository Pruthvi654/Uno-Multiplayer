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

  const copyInviteLink = async () => {
    if (!roomId) return;
    const link = `${window.location.origin}${window.location.pathname}?join=${roomId}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus("Invite Link Copied! 🔗");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const copyRoomCode = async () => {
    if (!roomId) return;

    try {
      await navigator.clipboard.writeText(roomId);
      setCopyStatus("Room Code Copied! 📋");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      setCopyStatus("Copy failed");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white select-none">
      {/* Dynamic Background Glows & Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
        {/* HEADER BRANDING */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-block px-5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-black uppercase tracking-[0.4em] mb-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            MULTIPLAYER ARENA
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_0_40px_rgba(251,191,36,0.4)]">
            UNO
          </h1>
        </motion.div>

        {/* LOBBY CONTENT CONTAINER */}
        <div className="w-full max-w-6xl grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
          {/* LEFT PANEL: SETUP MATCH */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] border border-white/15 bg-slate-900/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
            <div className="relative space-y-8">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-cyan-300">
                  GET STARTED
                </span>
                <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-white">
                  Create or Join a Room
                </h2>
                <p className="mt-2 text-sm text-slate-300">
                  Enter your player username to host a new match or join your friends in the arena.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* CREATE ROOM CARD */}
                <div className="rounded-3xl bg-slate-950/80 p-6 shadow-inner border border-emerald-500/20 hover:border-emerald-500/40 transition duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-emerald-400">
                        Create Room
                      </p>
                    </div>

                    <input
                      value={createName}
                      onChange={(e) => setCreateName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 font-bold"
                    />

                    <select
                      value={gameMode}
                      onChange={(e) => setGameMode(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 font-bold cursor-pointer"
                    >
                      <option value="normal">Normal Mode</option>
                      <option value="elimination">Elimination Mode</option>
                    </select>

                    <button
                      onClick={createRoom}
                      disabled={!createName}
                      className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4 text-base font-black text-white shadow-[0_0_25px_rgba(16,185,129,0.3)] transition hover:scale-[1.02] hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      CREATE MATCH
                    </button>
                  </div>
                </div>

                {/* JOIN ROOM CARD */}
                <div className="rounded-3xl bg-slate-950/80 p-6 shadow-inner border border-amber-500/20 hover:border-amber-500/40 transition duration-300">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-amber-400">
                        Join Room
                      </p>
                    </div>

                    <input
                      value={joinRoomCode}
                      onChange={(e) => setJoinRoomCode(e.target.value)}
                      placeholder="Room Code"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold tracking-wider"
                    />

                    <input
                      value={joinName}
                      onChange={(e) => setJoinName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3.5 text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-bold"
                    />

                    <button
                      onClick={joinRoom}
                      disabled={!joinName || !joinRoomCode}
                      className="rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-4 text-base font-black text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition hover:scale-[1.02] hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      JOIN MATCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL: LIVE LOBBY STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[36px] border border-white/15 bg-slate-900/60 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 pointer-events-none" />
            <div className="relative space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-slate-400">
                  ARENA STATUS
                </span>
                <h3 className="mt-1 text-3xl font-black text-white">Live Lobby</h3>
              </div>

              {/* ROOM CODE DISPLAY */}
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
                        Room Code
                      </p>
                      <p className="text-2xl font-black text-amber-300 tracking-wider mt-0.5">
                        {roomId || "------"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-amber-500/10 border border-amber-400/20 px-4 py-2 text-xs font-black uppercase tracking-wider text-amber-300">
                      {isHost ? "👑 Host" : "🎮 Player"}
                    </div>
                  </div>

                  {roomId && (
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <button
                        onClick={copyInviteLink}
                        className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-xs font-black text-white shadow-md transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>🔗</span>
                        <span>Copy Invite Link</span>
                      </button>

                      <button
                        onClick={copyRoomCode}
                        className="rounded-xl bg-slate-800 border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-slate-700 active:scale-95 cursor-pointer"
                      >
                        📋 Copy Code
                      </button>
                    </div>
                  )}

                  {copyStatus && (
                    <p className="text-xs font-bold text-emerald-400 animate-pulse">{copyStatus}</p>
                  )}
                </div>
              </div>

              {/* PLAYERS LIST */}
              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-slate-400">
                    Players Ready ({players.length})
                  </p>
                  <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
                    {gameMode === "elimination" ? "Elimination" : "Normal"}
                  </span>
                </div>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {players.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/50 px-4 py-6 text-center text-xs font-bold text-slate-400">
                      No players in room yet.
                    </div>
                  ) : (
                    players.map((player, idx) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-xs font-black text-indigo-300">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-sm text-white">{player.username}</span>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-300">
                          {idx === 0 ? "HOST" : "READY"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* START GAME BUTTON */}
              <button
                onClick={startGame}
                disabled={!isHost || players.length < 2}
                className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600 px-6 py-4 text-lg font-black text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] transition hover:scale-[1.02] hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isHost
                  ? players.length < 2
                    ? "WAITING FOR PLAYERS (2 MIN)"
                    : "🚀 START GAME NOW"
                  : "⌛ WAITING FOR HOST TO START"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
