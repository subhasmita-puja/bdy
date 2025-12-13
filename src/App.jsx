import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

export default function App() {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [musicError, setMusicError] = useState(null);
  const [open, setOpen] = useState(false);

  // --- MUSIC LOGIC ---
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Setup audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.playbackRate = playbackRate;

    const handlePlay = () => {
      setIsPlaying(true);
      setMusicError(null);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      setMusicError("Failed to load audio file");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Play failed:", error);
        setMusicError("Click again to play music");
      });
    } else {
      audio.pause();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSpeedChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const startMusicAndLights = () => {
    const el = audioRef.current;
    if (!el) return;

    el.volume = volume;
    el.playbackRate = playbackRate;
    
    el.play()
      .then(() => {
        setLightsOn(true);
        setMusicError(null);
      })
      .catch((error) => {
        console.error("Failed to start music:", error);
        setMusicError("Browser blocked music. Click ▶ to play.");
      });
  };
  // --- END MUSIC LOGIC ---

  const HER_NAME = "Debasmita 💖";
  const GALLERY = [
    { img: "/img1.jpg", caption: "🌸 Sister Day-OUT" },
    { img: "/img2.jpg", caption: "🌊 Memory With Beach" },
    { img: "/img9.jpg", caption: "🎶 Crazy Ness" },
    { img: "/img6.jpg", caption: "💖 Forever Memory" },
    { img: "/img16.jpg", caption: "✨ Smiles Forever" },
    { img: "/img15.jpg", caption: "💖 Best Day With You" },
  ];
  const helloMessage = `Hello ${HER_NAME}✨ Today is not just your birthday... it's the day my world became brighter because you exist. With you, even the simplest days turn into memories.`;
  const finalMessage =
    "Hey Bagu 💖, You are my safest place, my brightest smile, and my biggest blessing. With you life feels lighter, softer, and so full of meaning. you don't just make my days better - you make my whole existence better. I'm endlessly proud of the person you are.but honestly, life would be way too boring without you! You're my partner in crime, my biggest tease, and yes, my favorite troublemaker.So on this special day, I wish for your life to be filled with the same love, joy. May this year give you everything you dream of — because you truly deserve it all. 💫 🎂💖✨";

  // Typing effect
  useEffect(() => {
    const msg = step === 0 ? helloMessage : step === 3 ? finalMessage : "";
    if (!msg) return;
    setTypedText("");
    let i = 0;
    const id = setInterval(() => {
      setTypedText(msg.slice(0, i));
      i++;
      if (i > msg.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [step]);

  // Confetti window size
  const [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });
  
  useEffect(() => {
    const handleResize = () => setWindowSize({ 
      width: window.innerWidth, 
      height: window.innerHeight 
    });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-linear-to-br from-[#0b0f1a] to-[#15192d] text-white">
      {/* Music player */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        preload="auto"
        loop
      />

      {/* Music Controls */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end gap-2 sm:gap-3">
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-pink-400 to-purple-500 text-white text-lg shadow-md hover:scale-110 transition active:scale-95"
        >
          {open ? "✖" : "🎵"}
        </button>
        <div
          className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-md transition-all
            ${open ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none sm:opacity-100 sm:scale-100 sm:pointer-events-auto"}`}
        >
          {/* Play Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-linear-to-r from-pink-400 to-purple-500 text-white text-sm sm:text-lg shadow-md hover:scale-110 transition active:scale-95"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          
          {/* Volume Control */}
          <div className="flex items-center gap-1">
            <span className="text-xs">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-12 sm:w-16 md:w-20 accent-pink-500 cursor-pointer"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
          
          {/* Speed Control */}
          <select
            value={playbackRate}
            onChange={handleSpeedChange}
            className="bg-white/35 text-[10px] sm:text-xs text-black rounded px-1 sm:px-2 py-0.5 sm:py-1 cursor-pointer"
            title="Playback speed"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {musicError && (
        <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 bg-red-500/80 text-white px-3 py-2 sm:px-4 rounded-lg shadow-lg text-xs sm:text-sm max-w-[200px] sm:max-w-none">
          {musicError}
        </div>
      )}

      <div className="h-full w-full flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.section 
              key="s0" 
              className="flex flex-col justify-center items-center min-h-screen text-center px-4 sm:px-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-pink-200 via-cyan-200 to-yellow-200"
              >
                {`Hello ${HER_NAME} ✨`}
              </motion.h1>
              <p className="mt-4 text-white/85 max-w-xs sm:max-w-md md:max-w-lg text-sm sm:text-base md:text-lg leading-6 sm:leading-7">
                {typedText}
              </p>
              <button
                onClick={() => setStep(1)}
                className="mt-6 px-6 sm:px-8 py-3 rounded-2xl text-sm sm:text-base font-semibold bg-linear-to-r from-fuchsia-500 to-sky-500 hover:scale-105 active:scale-95 transition"
              >
                Continue
              </button>
            </motion.section>
          )}

          {step === 1 && (
            <motion.section 
              key="s1" 
              className="flex flex-col justify-center items-center min-h-screen relative overflow-hidden w-full px-4 sm:px-6 lg:px-8"
            >
              <div className="flex justify-center gap-2 sm:gap-4 md:gap-6 absolute top-8 sm:top-12 md:top-16">
                {["#FFD93D", "#4CC9F0", "#90EE90", "#FF61A6", "#FF9F45"].map((color, i) => (
                  <motion.div key={i} className="flex flex-col items-center">
                    <div className="w-0.5 h-6 sm:h-10 md:h-12 bg-gray-600"></div>
                    <motion.div
                      animate={lightsOn
                        ? { 
                            backgroundColor: color, 
                            boxShadow: `0 0 20px ${color}`, 
                            scale: [1, 1.1, 1] 
                          }
                        : { backgroundColor: "#222" }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl text-center w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-yellow-200 to-cyan-300 leading-relaxed">
                  {lightsOn
                    ? "✨ See? Only you have the power to bring light into my life 🎉💖 'Now come with me, there's more waiting...'"
                    : "🌙 Darkness is nothing scary... But with you even darkness turns into magic 💡💕"}
                </h2>
                {!lightsOn ? (
                  <motion.button
                    onClick={startMusicAndLights}
                    className="mt-4 sm:mt-6 px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full bg-linear-to-r from-yellow-300 via-pink-400 to-red-400 text-slate-900 font-semibold shadow-lg animate-pulse text-xs sm:text-sm md:text-base"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    💡 Light it up
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => setStep(2)}
                    className="mt-4 sm:mt-6 px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full bg-linear-to-r from-pink-400 via-purple-500 to-blue-500 text-white font-semibold shadow-lg animate-pulse text-xs sm:text-sm md:text-base"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ❤️ Take Me There
                  </motion.button>
                )}
              </motion.div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section 
              key="s2" 
              className="relative min-h-screen w-full flex flex-col items-center overflow-y-auto px-3 sm:px-6 md:px-8 py-6 sm:py-8"
            >
              <h2 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-linear-to-r from-cyan-200 via-rose-200 to-amber-200 drop-shadow-lg px-2">
                Our Beautiful Memories ✨
              </h2>
              <motion.div
                transition={{ repeat: Infinity, repeatType: "mirror" }}
                className="relative bg-white rounded-lg shadow-lg p-2 w-[85%] sm:w-80 md:w-96 lg:w-88 h-72 sm:h-80 md:h-96 lg:h-112 mb-4 sm:mb-6"
              >
                <img 
                  src="/img7.jpg" 
                  alt="memory" 
                  className="w-full h-full object-cover rounded-md" 
                />
              </motion.div>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg font-bold text-white text-center px-2">
                Most Precious Moment Of Life
              </p>
              <div className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap justify-center z-10 mb-6 sm:mb-8 md:mb-10">
                {GALLERY.map((g, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      rotate: [i % 2 === 0 ? -5 : 5, i % 2 === 0 ? 5 : -5] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "mirror", 
                      duration: 4 + i * 0.5 
                    }}
                    className="relative bg-white rounded-lg shadow-lg p-1 w-28 sm:w-32 md:w-36 lg:w-40 h-36 sm:h-40 md:h-44 lg:h-52"
                  >
                    <img 
                      src={g.img} 
                      alt="memory" 
                      className="w-full h-[75%] object-cover rounded-md" 
                    />
                    <p className="mt-1 text-[0.65rem] sm:text-[0.7rem] md:text-xs text-center text-slate-700 leading-tight">
                      {g.caption}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="w-full flex justify-center mt-2 sm:mt-4 mb-6 sm:mb-8">
                <button
                  onClick={() => {
                    setConfetti(true);
                    setStep(3);
                  }}
                  className="px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full bg-linear-to-r from-sky-500 to-fuchsia-500 text-white font-semibold shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 text-xs sm:text-sm md:text-base"
                >
                  Next Surprise 🎁
                </button>
              </div>
            </motion.section>
          )}

          {step === 3 && (
            <motion.section 
              key="s3" 
              className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden w-full px-4 sm:px-6 py-8"
            >
              {confetti && (
                <Confetti 
                  numberOfPieces={250} 
                  recycle={true} 
                  gravity={0.15} 
                  width={windowSize.width} 
                  height={windowSize.height} 
                />
              )}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "radial-gradient(circle at top left, #ff9a9e55, transparent 70%)",
                    "radial-gradient(circle at bottom right, #fad0c455, transparent 70%)",
                    "radial-gradient(circle at top right, #a1c4fd55, transparent 70%)",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
              />
              {[...Array(15)].map((_, i) => {
                const size = Math.random() * 20 + 12;
                const left = Math.random() * 100;
                const delay = Math.random() * 6;
                const duration = Math.random() * 7 + 5;
                const symbols = ["❤️", "💕", "💖", "💞"];
                const colors = ["#FF61A6", "#FFD93D", "#90EE90", "#4CC9F0"];
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ 
                      fontSize: `${size}px`, 
                      left: `${left}%`, 
                      bottom: "-60px", 
                      color: colors[i % colors.length], 
                      zIndex: 10 
                    }}
                    animate={{ 
                      y: ["0vh", "-110vh"], 
                      opacity: [0, 1, 0], 
                      scale: [0.8, 1.4, 1] 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration, 
                      delay, 
                      ease: "easeInOut" 
                    }}
                  >
                    {symbols[i % symbols.length]}
                  </motion.div>
                );
              })}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute text-yellow-200"
                  style={{ 
                    fontSize: `${Math.random() * 10 + 6}px`, 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%` 
                  }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: Math.random() * 2 + 2, 
                    delay: Math.random() * 5 
                  }}
                >
                  ✨
                </motion.div>
              ))}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.02, rotate: [0, -1, 1, 0] }}
                className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-4 sm:p-6 md:p-8 text-center max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg z-20 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-pink-300/50"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px #ff9a9e, 0 0 20px #fad0c4", 
                      "0 0 15px #a1c4fd, 0 0 25px #c2e9fb"
                    ] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
                />
                <img
                  src="/img13.jpg"
                  alt="Birthday"
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-full border-2 border-white/50 shadow-md mx-auto relative z-10"
                />
                <h3 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-yellow-200 to-cyan-300 relative z-10">
                  🎉 Happy Birthday {HER_NAME}! 🎂
                </h3>
                <p className="mt-2 sm:mt-3 text-white/85 text-xs sm:text-sm md:text-base leading-relaxed relative z-10 px-1">
                  {finalMessage}
                </p>
                <h3 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-pink-300 via-yellow-200 to-cyan-300 relative z-10">
                  Love You So Much {HER_NAME}! 💖
                </h3>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
