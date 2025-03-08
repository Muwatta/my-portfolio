import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky w-full z-50">
      <div className="w-full">
        {/* Logo Line */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-400 px-4 h-20 flex items-center justify-center rounded-t text-center">
          <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
            Muwatta
          </h1>
        </div>
        {/* Navigation Line */}
        <div className="bg-gray-800 px-4 h-16 flex items-center justify-center rounded-b text-center">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link
                to="/"
                style={{ textDecoration: "none" }}
                className="inline-block w-24 h-10 bg-gray-700 text-white flex items-center justify-center rounded transition-colors hover:bg-gray-600 focus:bg-gray-600 focus:ring-2 focus:ring-gray-400 active:bg-gray-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                style={{ textDecoration: "none" }}
                className="inline-block w-24 h-10 bg-gray-700 text-white flex items-center justify-center rounded transition-colors hover:bg-gray-600 focus:bg-gray-600 focus:ring-2 focus:ring-gray-400 active:bg-gray-500"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/skills"
                style={{ textDecoration: "none" }}
                className="inline-block w-24 h-10 bg-gray-700 text-white flex items-center justify-center rounded transition-colors hover:bg-gray-600 focus:bg-gray-600 focus:ring-2 focus:ring-gray-400 active:bg-gray-500"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ textDecoration: "none" }}
                className="inline-block w-24 h-10 bg-gray-700 text-white flex items-center justify-center rounded transition-colors hover:bg-gray-600 focus:bg-gray-600 focus:ring-2 focus:ring-gray-400 active:bg-gray-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
