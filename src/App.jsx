import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />.
      <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </main>
      <Footer/>
      </div>
    </>
  );
}

export default App;
