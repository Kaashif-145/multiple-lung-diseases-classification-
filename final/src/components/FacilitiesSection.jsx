import React from "react";
import { FaStethoscope, FaHospital, FaUserMd, FaAmbulance } from "react-icons/fa";

const facilities = [
  {
    icon: <FaStethoscope size={30} className="text-green-600" />,
    title: "Expert Doctors",
    description: "Certified and experienced specialists to provide the best care.",
  },
  {
    icon: <FaHospital size={30} className="text-green-600" />,
    title: "Modern Models",
    description: "State-of-the-art models for accurate and fast results.",
  },
  {
    icon: <FaUserMd size={30} className="text-green-600" />,
    title: "Emergency Care",
    description: "24/7 emergency services to handle all critical situations.",
  },
  {
    icon: <FaAmbulance size={30} className="text-green-600" />,
    title: "Accurate Results",
    description: "Rapid and reliable  service with results of 99% accuracy.",
  },
];

const FacilitiesSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Our Latest Facilities</h2>
        <p className="text-gray-600 mb-12">
          We provide world-class facilities to ensure top-notch medical care for every patient.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{facility.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
