import { motion } from "framer-motion";
import { styles } from "../styles";

import { harisMinhas } from "../assets";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col items-center">
      <div className={`max-w-7xl mx-auto ${styles.paddingX} pt-32 pb-12 flex flex-col justify-center items-center gap-5 z-10`}>
        <div className="flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="absolute -inset-4 bg-[#915EFF] rounded-full blur-[50px] opacity-30 animate-pulse"></div>
            <img
              src={harisMinhas}
              alt="Haris Minhas"
              className="relative w-52 h-52 rounded-full border-4 border-[#915EFF] object-cover shadow-[0_0_60px_-15px_#915EFF]"
            />
          </motion.div>

          <div className="text-center z-10">
            <h1 className={`${styles.heroHeadText} text-white font-black`}>
              Hi, I'm <br className="sm:hidden block" />
              <span className="text-[#915EFF] drop-shadow-[0_0_20px_rgba(145,94,255,0.4)]">Haris Minhas</span>
            </h1>
            <p className={`${styles.heroSubText} mt-6 text-secondary max-w-2xl mx-auto leading-relaxed`}>
              Transforming <span className="text-[#915EFF] font-medium">complex ideas</span> into elegant, <br className="sm:block hidden" />
              <span className="text-[#915EFF] font-medium">high-performance</span> digital experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Down Button */}
      {/* Sci-Fi HUD Scroll Indicator */}
      <div className="w-full flex justify-center items-center pb-10">
        <a href='#about'>
          <div className='relative w-[80px] h-[80px] flex justify-center items-center group cursor-pointer'>
            {/* Outer Rotating Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className='absolute w-full h-full border-[1px] border-dashed border-[#915EFF] rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300'
            />
            {/* Inner Counter-Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className='absolute w-[60%] h-[60%] border-[2px] border-[#915EFF] rounded-full opacity-60 border-t-transparent border-l-transparent group-hover:shadow-[0_0_20px_#915EFF] transition-shadow duration-300'
            />
            {/* Pulsing Core */}
            <div className='absolute w-[8px] h-[8px] bg-[#915EFF] rounded-full shadow-[0_0_15px_#915EFF] animate-ping opacity-75' />

            {/* Static Core Dot */}
            <div className='absolute w-[6px] h-[6px] bg-white rounded-full shadow-[0_0_10px_white]' />

            {/* Directional Chevron */}
            <motion.div
              animate={{ y: [15, 25, 15], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute text-[#915EFF] text-xs font-bold tracking-widest mt-8"
            >
              ▼
            </motion.div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
