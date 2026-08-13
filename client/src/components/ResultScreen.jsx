import { motion } from "framer-motion";
import { useEffect } from "react";
import ConfettiCanvas from "./effects/ConfettiCanvas";
import sounds from "../utils/soundEffects";

function ResultScreen({
  rankings,
  players,
  myId,
  requestRematch,
  rematchRequested
}) {
  useEffect(() => {
    sounds.victoryFanfare();
  }, []);
  // Map rankings to player data
  const fullRankings = rankings.map((r) => {
    const pData = players.find((p) => p.id === r.id);
    return {
      ...r,
      username: pData?.username || "Player",
      isMe: r.id === myId
    };
  });

  // Sort by position
  fullRankings.sort((a, b) => a.position - b.position);

  const firstPlace = fullRankings.find((r) => r.position === 1);
  const secondPlace = fullRankings.find((r) => r.position === 2);
  const thirdPlace = fullRankings.find((r) => r.position === 3);
  const restPlayers = fullRankings.filter((r) => r.position > 3);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between py-10 px-4 overflow-hidden select-none">
      {/* Dynamic Background Effects */}
      <ConfettiCanvas />

      {/* Radial Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="z-10 text-center mt-2"
      >
        <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm font-extrabold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
          MATCH FINISHED
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 drop-shadow-[0_4px_25px_rgba(251,191,36,0.5)]">
          VICTORY HALL
        </h1>
      </motion.div>

      {/* PODIUM SHOWCASE CONTAINER */}
      <div className="z-10 w-full max-w-4xl my-auto py-6 flex flex-col items-center">
        <div className="flex items-end justify-center gap-3 sm:gap-6 w-full max-w-2xl px-2 min-h-[320px]">
          {/* 2ND PLACE PODIUM */}
          <motion.div
            initial={{ scale: 0, y: 80 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 14 }}
            className="flex-1 flex flex-col items-center order-1"
          >
            {secondPlace ? (
              <>
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-[0_0_25px_rgba(203,213,225,0.4)] border-2 border-slate-200">
                    🥈
                  </div>
                  <span className="mt-2 text-sm sm:text-base font-bold text-slate-200 truncate max-w-[100px] sm:max-w-[140px] text-center">
                    {secondPlace.username}
                  </span>
                  {secondPlace.isMe && (
                    <span className="text-[10px] bg-slate-700 text-slate-200 px-2 py-0.5 rounded-full font-extrabold mt-0.5">
                      YOU
                    </span>
                  )}
                </div>
                <div className="w-full h-36 sm:h-44 bg-gradient-to-b from-slate-400/30 via-slate-600/20 to-slate-800/40 border-t-4 border-slate-300 rounded-t-2xl backdrop-blur-md flex flex-col items-center justify-start pt-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <span className="text-3xl sm:text-4xl font-black text-slate-300">2nd</span>
                </div>
              </>
            ) : (
              <div className="w-full h-32 opacity-20" />
            )}
          </motion.div>

          {/* 1ST PLACE PODIUM (CHAMPION) */}
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 12 }}
            className="flex-1 flex flex-col items-center order-2 -mt-8"
          >
            {firstPlace ? (
              <>
                {/* Crown badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="text-4xl sm:text-5xl mb-1 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                >
                  👑
                </motion.div>

                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 flex items-center justify-center text-4xl sm:text-5xl font-black shadow-[0_0_35px_rgba(251,191,36,0.7)] border-4 border-yellow-200">
                    🏆
                  </div>
                  <span className="mt-2 text-base sm:text-lg font-black text-yellow-300 tracking-wide truncate max-w-[120px] sm:max-w-[160px] text-center">
                    {firstPlace.username}
                  </span>
                  <span className="text-[11px] bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider mt-0.5 shadow-md">
                    WINNER
                  </span>
                </div>
                <div className="w-full h-48 sm:h-56 bg-gradient-to-b from-yellow-500/35 via-amber-600/20 to-yellow-900/40 border-t-4 border-yellow-400 rounded-t-3xl backdrop-blur-md flex flex-col items-center justify-start pt-4 shadow-[0_15px_40px_rgba(234,179,8,0.3)]">
                  <span className="text-4xl sm:text-5xl font-black text-yellow-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    1st
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-40 opacity-20" />
            )}
          </motion.div>

          {/* 3RD PLACE PODIUM */}
          <motion.div
            initial={{ scale: 0, y: 80 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 180, damping: 14 }}
            className="flex-1 flex flex-col items-center order-3"
          >
            {thirdPlace ? (
              <>
                <div className="relative mb-3 flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-[0_0_25px_rgba(217,119,6,0.4)] border-2 border-amber-400">
                    🥉
                  </div>
                  <span className="mt-2 text-sm sm:text-base font-bold text-amber-200 truncate max-w-[100px] sm:max-w-[140px] text-center">
                    {thirdPlace.username}
                  </span>
                  {thirdPlace.isMe && (
                    <span className="text-[10px] bg-amber-800 text-amber-100 px-2 py-0.5 rounded-full font-extrabold mt-0.5">
                      YOU
                    </span>
                  )}
                </div>
                <div className="w-full h-28 sm:h-36 bg-gradient-to-b from-amber-700/30 via-amber-900/20 to-amber-950/40 border-t-4 border-amber-500 rounded-t-2xl backdrop-blur-md flex flex-col items-center justify-start pt-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">3rd</span>
                </div>
              </>
            ) : (
              <div className="w-full h-24 opacity-20" />
            )}
          </motion.div>
        </div>

        {/* REST OF PLAYERS LIST */}
        {restPlayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="w-full max-w-lg mt-8 flex flex-col gap-2.5 px-4"
          >
            {restPlayers.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">💀</span>
                  <span className="font-bold text-lg text-slate-200">{player.username}</span>
                  {player.isMe && (
                    <span className="text-[10px] bg-indigo-600 px-2 py-0.5 rounded-full font-extrabold">
                      YOU
                    </span>
                  )}
                </div>
                <span className="font-extrabold text-slate-400">
                  {player.isLoser ? "ELIMINATED" : `#${player.position}`}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="z-10 flex gap-4 mt-4"
      >
        <button
          onClick={requestRematch}
          disabled={rematchRequested}
          className={`px-8 py-4 rounded-2xl text-xl sm:text-2xl font-black tracking-wide shadow-2xl transition-all duration-300 transform active:scale-95 ${
            rematchRequested
              ? "bg-slate-700 text-slate-400 border border-slate-600 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105"
          }`}
        >
          {rematchRequested ? "⌛ Waiting for Players..." : "🔄 PLAY AGAIN"}
        </button>

        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white px-8 py-4 rounded-2xl text-xl sm:text-2xl font-black tracking-wide shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:scale-105 transition-all duration-300 active:scale-95"
        >
          🚪 LEAVE
        </button>
      </motion.div>
    </div>
  );
}

export default ResultScreen;
