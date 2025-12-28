import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => {
  // Use a `ref` to apply GSAP animations
  const cardRef = React.useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Add the ScrollTrigger animation with GSAP
    const animation = gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 100, // Initial position off-screen
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom", // Trigger when the top of the element reaches the bottom of the viewport
          end: "top center",   // End the animation when the top reaches the center
          scrub: true,         // Link the animation progress to the scroll position
          markers: false,      // Set to true if you want to see the markers for debugging
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
    <div
      ref={cardRef}
      className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full flex flex-col h-full"
    >
      <p className="text-white font-black text-[48px] leading-none mb-0">"</p>

      <div className="mt-1 flex-1 flex flex-col">
        <p className="text-white tracking-wider text-[18px] leading-[1.6] text-left flex-1">{testimonial}</p>

        <div className="mt-7 flex justify-start items-center gap-3">
          <div className="flex flex-col">
            <p className="text-white font-medium text-[16px] leading-tight">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            <p className="mt-1 text-secondary text-[12px] leading-tight">
              {designation} of {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feedbacks = () => {
  return (
    <div className={`mt-12 md:-mt-20 pb-14 md:pb-5 bg-black-100 rounded-[20px] md:-mb-20`}>
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <div>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </div>
      </div>
      <div
        className={`-mt-20 pb-14 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-stretch`}
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
