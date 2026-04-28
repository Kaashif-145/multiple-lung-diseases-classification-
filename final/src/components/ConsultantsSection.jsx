// src/components/ConsultantsSection.jsx

import React from "react";

// ⭐ Correct image imports
import rajniImg from "../assets/rajnimaam.png";
import aashnaImg from "../assets/aashna.jpeg";
import kaashifImg from "../assets/kaashif.jpeg";
import harryImg from "../assets/harry.jpeg";

const consultants = [
  {
    name: "Dr. Rajni Mohana",
    role: "Dean, ASET, AUP",
    image: rajniImg,
    bio: "Has over 10 years of experience in Academia ,with various national and international publications to her credit."
  },
  {
    name: "Aashna Khurana",
    role: "Student, AUP",
    image: aashnaImg,
    bio: "A passionate final-year BTech student driven by innovation and continuous learning, with a strong dedication to building impactful real-world solutions."
  },
  {
    name: "Kaashif Matto",
    role: "Student, AUP",
    image: kaashifImg,
    bio: "Enthusiastic final-year BTech student with a deep interest in technology, problem-solving, and developing modern, user-focused applications."
  },
  {
    name: "Hridyansh Lakhan",
    role: "Student, AUP",
    image: harryImg,
    bio: "A motivated final-year BTech student committed to excellence, passionate about exploring emerging technologies and creating meaningful digital solutions."
  },
];

export default function ConsultantsSection() {
  return (
    <section className="py-20 bg-gray-50" id="creators">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Meet Our Creators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultants.map((c, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="w-full h-60 overflow-hidden">
                <img 
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {c.name}
                </h3>

                <p className="text-green-600 font-medium mb-3">{c.role}</p>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {c.bio}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
