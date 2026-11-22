"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "@/lib/styles";
import { navLinks } from "@/lib/constants";
import { harisMinhas, menu, close } from "@/lib/assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;

      setScrolled(scrollTop > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${
        scrolled
          ? "glass-effect shadow-[0_8px_32px_rgba(0,0,0,0.5)] py-3 backdrop-blur-xl border-b border-white/10"
          : ""
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 9999,
        backgroundColor: scrolled ? "rgba(5, 8, 22, 0.95)" : "rgba(5, 8, 22, 1)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(8px)",
        willChange: "transform, opacity, background-color, box-shadow",
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#915EFF] shadow-[0_0_15px_#915EFF] group-hover:shadow-[0_0_25px_#915EFF] transition-shadow duration-300">
            <Image
              src={harisMinhas}
              alt="Haris Minhas"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex items-center">
            <span className="group-hover:text-[#915EFF] transition-colors duration-300">
              Haris Minhas
            </span>{" "}
            &nbsp;
            <span className="sm:block hidden text-secondary text-[14px] font-normal tracking-wide">
              | Full Stack Developer
            </span>
          </p>
        </a>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-[#915EFF] text-[16px] font-medium cursor-pointer transition-all duration-300 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span
                className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] transition-all duration-300 group-hover:w-full ${
                  active === nav.title ? "w-full" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <Image
            src={toggle ? close : menu}
            alt="menu"
            width={28}
            height={28}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-6 glass-effect absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-2xl border border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
              >
                <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-white" : "text-secondary"
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(nav.title);
                      }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
