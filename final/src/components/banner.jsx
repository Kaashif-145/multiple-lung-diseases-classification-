import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import doc1 from "../assets/doc1.webp";
import doc2 from "../assets/doc2.jpg";
import doc3 from "../assets/doc3.jpg";

import "swiper/css";

const Banner = () => {
  const slides = [doc1, doc2, doc3];

  return (
    <div id="home" className="relative w-full h-screen"> 
      {/* Full height banner */}

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        grabCursor={true}
        speed={800}
        className="w-full h-full z-0"
      >
        {slides.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} className="w-full h-full object-cover" alt="slide" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Banner Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold leading-snug">
          We Care for Your Health <br /> Every Moment
        </h1>
        <p className="text-gray-200 mt-4 max-w-2xl">
          Test your Lung X-Ray images with our AI-powered disease prediction tool and get instant results to take charge of your health.
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Banner;
