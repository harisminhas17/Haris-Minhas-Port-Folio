import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { harisMinhas, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX
        } w-full flex items-center py-5 fixed z-50 transition-all duration-500 ease-in-out ${scrolled
          ? "glass-effect top-4 rounded-full max-w-7xl mx-auto left-0 right-0 shadow-[0_5px_30px_-15px_rgba(145,94,255,0.4)] border border-[#915EFF]/20 py-3"
          : "bg-transparent top-0"
        }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2 group'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={harisMinhas}
            alt='Haris Minhas'
            className='w-10 h-10 rounded-full object-cover border-2 border-[#915EFF] shadow-[0_0_15px_#915EFF] group-hover:shadow-[0_0_25px_#915EFF] transition-shadow duration-300'
          />
          <p className='text-white text-[18px] font-bold cursor-pointer flex items-center'>
            <span className="group-hover:text-[#915EFF] transition-colors duration-300">Haris Minhas</span> &nbsp;
            <span className='sm:block hidden text-secondary text-[14px] font-normal tracking-wide'>| Full Stack Developer</span>
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-white" : "text-secondary"
                } hover:text-[#915EFF] text-[16px] font-medium cursor-pointer transition-all duration-300 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-[#915EFF] transition-all duration-300 group-hover:w-full ${active === nav.title ? "w-full" : ""}`}></span>
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
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
                <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-secondary"
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
    </nav>
  );
};

export default Navbar;
