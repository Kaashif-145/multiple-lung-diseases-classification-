import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-20 pb-10 mt-20">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-4 tracking-wide">
            Medical+
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            AI-driven healthcare solutions for accurate disease prediction,
            expert consultation, and smart medical assistance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="w-10 h-10 bg-white/10 border border-white/20 rounded-full 
                flex items-center justify-center text-gray-300 hover:bg-white hover:text-black 
                transition-all cursor-pointer"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["Home", "Doctors", "Blogs", "Departments", "Research"].map((item) => (
              <li key={item} className="hover:text-white transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">
            Support
          </h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-white transition cursor-pointer">Help Center</li>
            <li className="hover:text-white transition cursor-pointer">FAQs</li>
            <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white transition cursor-pointer">Terms of Use</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-5">
            Subscribe
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Get updates on new features, research, and medical breakthroughs.
          </p>

          <div className="flex bg-white/10 border border-white/20 rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-grow bg-transparent text-gray-200 text-sm px-4 py-2 focus:outline-none"
            />
            <button className="bg-green-600 text-white px-5 text-sm hover:bg-green-700 transition">
              Send
            </button>
          </div>
        </div>

      </div>

      {/* Bottom text */}
      <div className="text-center text-gray-500 text-sm mt-16 border-t border-white/10 pt-5">
        © {new Date().getFullYear()} Medical+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
