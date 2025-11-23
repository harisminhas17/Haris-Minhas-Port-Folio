import React from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full text-white px-6 py-8 bg-black-100/55">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        {/* About Me Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Me</h3>
          <p>
           I'm Haris Minhas, a Full Stack Developer who turns complex ideas into smart, scalable digital solutions. I don't just write code — I design systems that work intelligently and efficiently.
          </p>
        </div>

        {/* Socials Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/harisminhas17"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/haris-minhas-68693b2ba?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/harisminhas.5?igsh=MTB0dWd1amF1ajhkeA=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram size={20} />
            </a>
            
            
           
            
            
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: harisminhas0017@gmail.com</p>
          <p>Location: Old Airport Road ATS, Chaklala Cantt Rawalpindi</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Haris Minhas. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
