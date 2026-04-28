import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Header from "./components/header";
import Banner from "./components/banner";
import ApplicationForm from "./components/ApplicationForm";
import FacilitiesSection from "./components/FacilitiesSection";
import Dashboard from "./pages/dashboard";
import ConsultantsSection from "./components/ConsultantsSection";
import ClientFeedback from "./components/ClientFeedback";
import RecentResearchSection from "./components/RecentResearchSection";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname === "/dashboard";

  // 🔥 Global prediction state
  const [prediction, setPrediction] = useState("");

  // 🔥 Function to call Flask backend
  const handlePredict = async (inputData) => {
    try {
      const response = await fetch("https://multiple-lung-diseases-classification-1.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputData }),  // example: [12, 45, 67]
      });

      const data = await response.json();
      setPrediction(data.prediction);

      console.log("Prediction from backend:", data.prediction);
      return data.prediction;

    } catch (error) {
      console.error("Error calling prediction API:", error);
    }
  };

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              
              {/* Pass handlePredict + prediction to ApplicationForm or any component */}
              <ApplicationForm 
                onPredict={handlePredict} 
                prediction={prediction}
              />

              <FacilitiesSection />
              <ConsultantsSection />
              <ClientFeedback />
              <RecentResearchSection />
            </>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              onPredict={handlePredict} 
              prediction={prediction}
            />
          } 
        />

        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      {!hideHeader && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
