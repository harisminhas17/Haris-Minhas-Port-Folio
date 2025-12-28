import React, { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  logo,
  source_code_link,
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const animation = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={cardRef} className="h-full">
      <div
        className="glass-effect p-6 rounded-3xl w-full h-full flex flex-col transform transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(145,94,255,0.4)] border border-white/10 relative group overflow-hidden"
      >
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/10 via-transparent to-[#56ccf2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Image Container with enhanced effects */}
        <div className="relative w-full h-[260px] overflow-hidden rounded-2xl mb-5 group/image">
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            loading="lazy"
            decoding="async"
          />

          {/* GitHub button with enhanced styling */}
          <div className="absolute inset-0 flex justify-end items-start m-4 z-20">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#915EFF]/20 transition-all duration-300 border border-white/30 hover:border-[#915EFF]/60 hover:scale-110 hover:shadow-[0_0_20px_rgba(145,94,255,0.6)] backdrop-blur-sm"
            >
              <img
                src={github}
                alt="source code"
                className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="mt-2 flex-grow flex flex-col">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 mb-4">
            {logo && (
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/30 to-[#56ccf2]/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-xl group-hover:shadow-[0_0_25px_rgba(145,94,255,0.4)] transition-all duration-500 group-hover:scale-110">
                  <img
                    src={logo}
                    alt={`${name} logo`}
                    className="w-full h-full object-contain scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            )}
            <h3 className="text-white font-bold text-[26px] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#915EFF] group-hover:to-[#56ccf2] transition-all duration-500">
              {name}
            </h3>
          </div>
          
          {/* Description */}
          <p className="text-secondary text-[15px] leading-relaxed line-clamp-4 mb-5 group-hover:text-white/80 transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Tags Section with enhanced styling */}
        <div className="mt-auto pt-5 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(145,94,255,0.3)] ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  useEffect(() => {
    // Stagger effect for project cards
    const animation = gsap.fromTo(
      ".project-card", // Select all project cards
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1, // Stagger delay of 0.1 seconds between each card
        scrollTrigger: {
          trigger: ".works-container",
          start: "top bottom",  // Trigger when the top of the container reaches the bottom
          end: "top center",
          scrub: true,
          markers: false, // Set to true to see debug markers
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === ".works-container") {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
        </p>
      </div>

      <div className="works-container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8">
        {projects.map((project, index) => (
          <div key={`project-${index}`} className="project-card w-full max-w-sm">
            <ProjectCard index={index} {...project} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
