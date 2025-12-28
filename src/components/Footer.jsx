import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full text-white bg-black-100 relative pt-10 pb-6 border-t border-[#1f1b41] overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-50"></div>

      {/* Background Blur Effect */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#915EFF] rounded-full mix-blend-screen filter blur-[150px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-sm relative z-10">
        {/* About Me Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white tracking-wide border-b-2 border-[#915EFF] w-fit pb-1">About Me</h3>
          <p className="text-secondary leading-relaxed text-[15px] max-w-sm">
            I engineer high-impact digital solutions by merging complex logic with intuitive design. As a Full Stack Developer, I architect intelligent, scalable systems that drive efficiency and growth.
          </p>
        </div>

        {/* Socials Section */}
        <div className="flex flex-col gap-4 md:items-center">
          <h3 className="text-xl font-bold text-white tracking-wide border-b-2 border-[#915EFF] w-fit pb-1">Follow Me</h3>
          <div className="flex gap-6 mt-2">
            <motion.a
              href="https://github.com/harisminhas17"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#915EFF" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: { duration: 0.5 },
                backgroundColor: { duration: 0.3 }
              }}
              className="group p-3 glass-effect rounded-full hover:shadow-[0_0_20px_#915EFF] border border-white/10"
            >
              <FaGithub size={24} className="text-white" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/haris-minhas-68693b2ba?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5, backgroundColor: "#0077b5" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                },
                opacity: { duration: 0.5, delay: 0.1 },
                backgroundColor: { duration: 0.3 }
              }}
              className="group p-3 glass-effect rounded-full hover:shadow-[0_0_20px_#0077b5] border border-white/10"
            >
              <FaLinkedin size={24} className="text-white" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/harisminhas.5?igsh=MTB0dWd1amF1ajhkeA=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5, backgroundColor: "#E1306C" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                },
                opacity: { duration: 0.5, delay: 0.2 },
                backgroundColor: { duration: 0.3 }
              }}
              className="group p-3 glass-effect rounded-full hover:shadow-[0_0_20px_#E1306C] border border-white/10"
            >
              <FaInstagram size={24} className="text-white" />
            </motion.a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-white tracking-wide border-b-2 border-[#915EFF] w-fit pb-1">Contact</h3>
          <div className="flex flex-col gap-3 text-[15px] text-secondary">
            <div className="hover:text-white transition-colors cursor-pointer">
              <span className="font-semibold text-[#915EFF]">Email:</span> harisminhas0017@gmail.com
            </div>
            <div className="hover:text-white transition-colors">
              <span className="font-semibold text-[#915EFF]">Location:</span> ATS Old Airport Road, Chaklala Cantt Rawalpindi Pakistan
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 pt-6 border-t border-white/10 text-center relative z-10">
        <p className="text-xs text-secondary tracking-widest uppercase">
          © {new Date().getFullYear()} Haris Minhas. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
