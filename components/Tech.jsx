"use client";

import { useEffect } from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { technologies } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  useEffect(() => {
    const animation = gsap.fromTo(
      ".tech-icon",
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".tech-icons-wrapper",
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === ".tech-icons-wrapper") {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section>
      <div className="tech-icons-wrapper flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <Image
              src={technology.icon}
              alt={technology.name}
              width={112}
              height={112}
              className="tech-icon w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "");
