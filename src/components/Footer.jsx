import { FaFacebook, FaWhatsapp, FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/abdullahi.musliudeen"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#1877F2]"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://wa.me/2349026642320"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#25D366]"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://linkedin.com/in/abdullahi-musliudeen-64435a239"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#0077B5]"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://x.com/MusliudeenAbdu1"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#1DA1F2]"
          > 
            <FaTwitter size={20} />
          </a>
          <a
            href="https://leetcode.com/u/muwatta/"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-[#FFA116]"
          >
            <SiLeetcode size={20} />
          </a>
          <a
            href="https://github.com/Muwatta"
            target="_blank"
            rel="noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={20} />
          </a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Muwatta Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
