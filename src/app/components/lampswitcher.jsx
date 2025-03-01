"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LampSwitcher() {
  const [isOn, setIsOn] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const newAudio = new Audio("/song.mp3"); // Load the song
    newAudio.loop = true; // Loop music continuously
    setAudio(newAudio);
  }, []);

  const toggleLight = () => {
    setIsOn(!isOn);

    if (audio) {
      if (!isOn) {
        audio.play().catch((error) => console.error("Autoplay blocked:", error)); // Start music
      } else {
        audio.pause(); // Stop music
        audio.currentTime = 0; // Reset music
      }
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-700 px-4 overflow-hidden">
      
      {/* 🌙✨ Top Cover Image - Appears & Slides Down with Side Images */}
      {isOn && (
        <motion.div
          className="absolute top-0 left-0 w-full z-0"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/toppic.png"
            alt="Top Cover"
            layout="responsive"
            width={1200}
            height={250}
            className="w-full md:h-auto h-[200px] object-cover"
          />
        </motion.div>
      )}

      {/* Main Lamp Image */}
      <div className="flex flex-col items-center z-10">
        <Image
          src={isOn ? "/lamp-on.png" : "/lamp-off.png"}
          alt="Lamp"
          width={450}
          height={450}
          className={`transition-all duration-500 ${
            isOn ? "drop-shadow-[0_0_80px_rgb(255,255,0)]" : ""
          }`}
        />
      
        {/* Button - Controls Light & Music */}
        <motion.button
          onClick={toggleLight}
          className="mt-24 md:mt-32 px-10 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 
                     bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 
                     shadow-lg transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOn ? "Turn Off 🌙" : "Turn On 💡"}
        </motion.button>
      </div>

      {/* Side Images (Desktop) - Appear at the Same Time as Cover & Zoom In/Out */}
      {isOn && (
        <div className="hidden md:block z-10">
          <motion.div
            className="absolute left-[5%] top-[55%] transform -translate-y-1/2"
            initial={{ y: "-100%", opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: [1, 1.2, 1] }}
            transition={{
              opacity: { duration: 1.5 },
              y: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Image src="/left.png" alt="Left Image" width={300} height={300} />
          </motion.div>

          <motion.div
            className="absolute right-[5%] top-[55%] transform -translate-y-1/2"
            initial={{ y: "-100%", opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: [1, 1.2, 1] }}
            transition={{
              opacity: { duration: 1.5 },
              y: { duration: 1.5, ease: "easeOut" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Image src="/right.png" alt="Right Image" width={300} height={300} />
          </motion.div>
        </div>
      )}

      {/* Mobile: Right Image Appears BELOW the Button - Bigger in Mobile */}
      {isOn && (
        <motion.div
          className="md:hidden mt-6 z-10"
          initial={{ y: "-100%", opacity: 0, scale: 1 }}
          animate={{ y: 0, opacity: 1, scale: [1, 1.2, 1] }}
          transition={{
            opacity: { duration: 1.5 },
            y: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Image src="/right.png" alt="Mobile Image Below Button" width={230} height={230} />
        </motion.div>
      )}

      {/* ⚡ Updated Footer - Clean & Professional */}
      <footer className="absolute bottom-4 text-white text-sm text-center opacity-90 px-4">
        Made with ❤️ by <span className="font-semibold">Zemat</span> |  
        <a href="https://github.com/Zakariae-zemat/helloramadan" target="_blank" rel="noopener noreferrer" className="underline ml-1">
          Open Source 💻
        </a>
      </footer>
    </div>
  );
}
