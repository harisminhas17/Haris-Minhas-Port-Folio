import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { zoomIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: "Ahmad Raza",
        from_email: form.email,
        to_email: "ahmedraza01272003@gmail.com",
        message: form.message,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex justify-center overflow-hidden`}>
      <motion.div
        variants={zoomIn(0.2, 0.5)}
        className='flex-[0.75] lg:max-w-2xl glass-effect p-8 rounded-2xl relative overflow-hidden'
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#915EFF] opacity-10 blur-[60px] rounded-full pointer-events-none"></div>
        <p className={`${styles.sectionSubText} text-glow`}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8 relative z-10'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 tracking-wide'>YOUR NAME</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-[#151030] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-all focus:border-[#915EFF] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)]'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 tracking-wide'>YOUR EMAIL</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-[#151030] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-all focus:border-[#915EFF] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)]'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4 tracking-wide'>YOUR MESSAGE</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-[#151030] py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/10 font-medium transition-all focus:border-[#915EFF] focus:shadow-[0_0_15px_rgba(145,94,255,0.3)] resize-none'
            />
          </label>

          <div className="w-full flex justify-start">
            <button
              type='submit'
              className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-transparent font-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#915EFF]"
            >
              <div className="absolute inset-0 transition-all duration-1000 opacity-70 inset-0 bg-gradient-to-r from-[#915EFF] to-[#1d1836] rounded-xl blur-lg group-hover:opacity-100 group-hover:blur-xl animate-tilt"></div>
              <div className="relative inline-flex items-center justify-center w-full h-full px-8 py-3 text-lg bg-tertiary rounded-xl ring-1 ring-white/10 group-hover:bg-[#1d1836] transition-colors duration-200">
                <span>{loading ? "Sending..." : "Send Message"}</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
