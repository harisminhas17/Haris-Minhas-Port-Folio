import React, { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const anim = gsap.fromTo(
      elementRef.current,
      animation.from,
      {
        ...animation.to,
        delay,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === elementRef.current) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, animation, delay]);
};

const ServiceCard = ({ index, title, icon, description }) => {
  const cardRef = useRef(null);
  useGsap(cardRef, {
    from: { opacity: 0, y: 100, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
  }, index * 0.2);

  return (
    <div className="xs:w-[250px] w-full h-full transform transition-all duration-300 hover:scale-105">
      <div ref={cardRef} className="w-full h-full green-pink-gradient p-[1px] rounded-[20px] shadow-card">
        <div className="bg-tertiary rounded-[20px] py-6 px-6 h-full min-h-[320px] flex flex-col items-center justify-center glass-effect transition-all hover:bg-opacity-80">
          <div className="flex-shrink-0 mb-5 h-16 w-16 flex items-center justify-center">
            <img 
              src={icon} 
              alt="web-development" 
              className="w-full h-full max-w-16 max-h-16 object-contain drop-shadow-lg brightness-110 contrast-110" 
              style={{ filter: 'brightness(1.2) contrast(1.1) saturate(1.2)' }}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h3 className="text-white text-[24px] font-bold text-center tracking-wide mb-4 flex-shrink-0 leading-tight">{title}</h3>
          <p className="text-secondary text-[16px] text-center leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  // Heading Animation
  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  // Paragraph Animation
  useGsap(paragraphRef, {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
  }, 0.3);

  return (
    <>
      <div ref={headingRef} className="relative z-10">
        <p className={`${styles.sectionSubText} text-glow`}>INTRODUCTION</p>
        <h2 className={`${styles.sectionHeadText} text-white`}>Overview.</h2>
      </div>

      <div className="mt-4 relative z-10">
        <div className="glass-effect p-8 rounded-2xl border-l-4 border-[#915EFF] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#915EFF] opacity-10 blur-[50px] rounded-full group-hover:opacity-20 transition-opacity duration-500"></div>
          <p ref={paragraphRef} className="text-secondary text-[17px] max-w-full leading-[32px]">
            I engineer high-impact digital solutions by merging complex logic with intuitive design. As a Full Stack Developer, I architect intelligent, scalable systems that drive efficiency and growth. With expertise spanning Laravel, PHP, React, and modern frontend technologies, I transform ambitious ideas into seamless, user-centric applications. Passionate about innovation, I'm actively integrating AI and machine learning capabilities to deliver intelligent, future-ready solutions that solve real-world challenges and create measurable business value.
          </p>
        </div>
      </div>

      <div className="mt-10 relative z-10">
        <a
          href={`https://wa.me/+923165461537`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <div className="absolute inset-0 transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#25D366] via-[#128C7E] to-[#25D366] rounded-full blur-lg group-hover:opacity-100 group-hover:blur-xl animate-tilt"></div>
          <div className="relative inline-flex items-center justify-center w-full h-full px-8 py-4 text-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-200">
            <span className="mr-2">Ping Me on WhatsApp</span>
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </a>
      </div>
      <div className="mt-12 mb-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch items-stretch gap-10 relative z-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
