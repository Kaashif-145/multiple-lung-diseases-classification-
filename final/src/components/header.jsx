import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal"; 
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // ⭐ Detect current route

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  // Sticky only for non-blog pages
  useEffect(() => {
    if (location.pathname === "/blogs") return; // ⭐ Disable transparency on Blogs

    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Disease Prediction button
  const handleDiseaseClick = () => {
    if (!isLoggedIn) setShowLogin(true);
    else navigate("/dashboard");
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ⭐ HEADER BACKGROUND LOGIC
  const headerClass =
    location.pathname === "/blogs"
      ? "bg-black py-4 shadow-md" // ALWAYS BLACK ON BLOG PAGE
      : isSticky
      ? "bg-black bg-opacity-90 shadow-md py-2"
      : "bg-transparent py-4";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            
            <h1 className="text-white text-xl font-serif">Medicare</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-white font-medium">
            <a href="#home" className="text-white no-underline hover:text-green-400">Home</a>
            <a href="#about" className="text-white no-underline hover:text-green-400">About</a>
            <a href="#features" className="text-white no-underline hover:text-green-400">Features</a>
            <a href="#doctors" className="text-white no-underline hover:text-green-400">Doctors</a>
            <a href="#departments" className="text-white no-underline hover:text-green-400">Departments</a>

            <Link to="/blogs" className="text-white no-underline hover:text-green-400">
              Blog
            </Link>

            <a href="#contact" className="text-white no-underline hover:text-green-400">Contact</a>
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-md font-medium hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleDiseaseClick}
                className="bg-green-600 text-white px-5 py-2 rounded-md font-medium hover:bg-green-700"
              >
                Disease Prediction
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Push content below header */}
      <div className="pt-0" />

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        zIndex={60}
      />
    </>
  );
};

export default Header;
