import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky w-full z-50 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">muwatta</h1>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/portfolio" className="text-white hover:text-gray-300">
              Portfolio
            </Link>
            <Link to="/skills" className="text-white hover:text-gray-300">
              Skills
            </Link>
            <Link to="/blog" className="text-white hover:text-gray-300">
              Blog
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/portfolio"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gray-300"
              >
                Portfolio
              </Link>
              <Link
                to="/skills"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gray-300"
              >
                Skills
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gray-300"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-white hover:text-gray-300"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
