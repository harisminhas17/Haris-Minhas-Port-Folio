import { motion } from "framer-motion";
import { styles } from "../styles";

import { harisMinhas } from "../assets";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto flex flex-col items-center">
      <div className={`max-w-7xl mx-auto ${styles.paddingX} pt-32 pb-12 flex flex-col justify-center items-center gap-5 z-10`}>
        <div className="flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative group"
          >
            {/* Animated Glow Background */}
            <motion.div 
              className="absolute -inset-4 bg-[#915EFF] rounded-full blur-[50px] opacity-30"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Rotating Gradient Border Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full overflow-hidden"
            >
              <div 
                className="w-full h-full rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #915EFF, #B794F6, #C4B5FD, #915EFF, #B794F6, #C4B5FD, #915EFF)',
                  padding: '4px',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a0f]" />
              </div>
            </motion.div>

            {/* Floating Animation Container */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-[#915EFF] shadow-[0_0_60px_-15px_#915EFF] group-hover:shadow-[0_0_80px_-10px_#915EFF] transition-shadow duration-500"
            >
              {/* Image with subtle scale on hover */}
              <motion.img
                src={harisMinhas}
                alt="Haris Minhas"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Animated Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                style={{ transform: 'skewX(-20deg)' }}
              />
            </motion.div>

            {/* Orbiting Particles - Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformOrigin: 'center' }}
            >
              {[...Array(3)].map((_, i) => {
                const angle = (i * 120) * (Math.PI / 180);
                const radius = 130;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-[#915EFF] rounded-full shadow-[0_0_10px_#915EFF]"
                    style={{
                      x: x,
                      y: y,
                    }}
                    animate={{
                      scale: [0.8, 1.3, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4
                    }}
                  />
                );
              })}
            </motion.div>
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
      <div className="w-full flex justify-center items-center mt-auto mb-10">
        <a href='#about'>
          <div className='relative w-[80px] h-[80px] flex justify-center items-center group cursor-pointer'>
            {/* Outer Rotating Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className='absolute w-full h-full border-[1px] border-dashed border-[#915EFF] rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300'
              style={{ willChange: 'transform' }}
            />
            {/* Inner Counter-Rotating Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className='absolute w-[60%] h-[60%] border-[2px] border-[#915EFF] rounded-full opacity-60 border-t-transparent border-l-transparent group-hover:shadow-[0_0_20px_#915EFF] transition-shadow duration-300'
              style={{ willChange: 'transform' }}
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
