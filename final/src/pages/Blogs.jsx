import React, { useState } from "react";

const ITEMS_PER_PAGE = 10;

const blogItems = [
  // 30 items total (type: Research, News, Video, Tool, etc.)
  {
    id: 1,
    title: "AI models improve early detection of multi-class lung disease from X-ray images",
    type: "Research",
    source: "PubMed",
    date: "Jan 2025",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
  },
  {
    id: 2,
    title: "New deep learning pipeline for classifying normal, pneumonia and COVID-19 lungs",
    type: "Research",
    source: "ScienceDirect",
    date: "Dec 2024",
    url: "https://www.sciencedirect.com/",
  },
  {
    id: 3,
    title: "CT-based lung cancer screening: where AI tools are heading next",
    type: "News",
    source: "Radiology Today",
    date: "Nov 2024",
    url: "https://www.radiologytoday.net/",
  },
  {
    id: 4,
    title: "Explainer: What COPD, asthma and fibrosis do to your lungs over time",
    type: "Article",
    source: "Mayo Clinic",
    date: "Oct 2024",
    url: "https://www.mayoclinic.org/",
  },
  {
    id: 5,
    title: "YouTube: Understanding Lung Function Tests (PFT) in simple terms",
    type: "Video",
    source: "YouTube",
    date: "Sep 2024",
    url: "https://www.youtube.com/",
  },
  {
    id: 6,
    title: "Multi-disease chest X-ray dataset benchmarked for AI lung diagnosis",
    type: "Research",
    source: "arXiv",
    date: "Aug 2024",
    url: "https://arxiv.org/",
  },
  {
    id: 7,
    title: "How smoking and air pollution accelerate chronic lung disease progression",
    type: "Article",
    source: "WHO",
    date: "Jul 2024",
    url: "https://www.who.int/",
  },
  {
    id: 8,
    title: "Tool spotlight: Open-source lung segmentation toolkit for medical imaging",
    type: "Tool",
    source: "GitHub",
    date: "Jun 2024",
    url: "https://github.com/",
  },
  {
    id: 9,
    title: "Radiologists + AI: collaborative detection of small lung nodules",
    type: "News",
    source: "RSNA",
    date: "May 2024",
    url: "https://www.rsna.org/",
  },
  {
    id: 10,
    title: "How exercise and breathing routines improve lung capacity",
    type: "Article",
    source: "American Lung Association",
    date: "Apr 2024",
    url: "https://www.lung.org/",
  },
  {
    id: 11,
    title: "AI-based triage for emergency lung CT scans reduces reporting delays",
    type: "Research",
    source: "BMJ",
    date: "Mar 2024",
    url: "https://www.bmj.com/",
  },
  {
    id: 12,
    title: "Latest guidelines for managing pediatric pneumonia in low-resource settings",
    type: "News",
    source: "UNICEF",
    date: "Feb 2024",
    url: "https://www.unicef.org/",
  },
  {
    id: 13,
    title: "YouTube: How to read a chest X-ray like a doctor",
    type: "Video",
    source: "YouTube",
    date: "Jan 2024",
    url: "https://www.youtube.com/",
  },
  {
    id: 14,
    title: "COVID-19 to long COVID: monitoring long-term lung damage",
    type: "Article",
    source: "NIH",
    date: "Dec 2023",
    url: "https://www.nih.gov/",
  },
  {
    id: 15,
    title: "Mobile apps for tracking asthma symptoms and inhaler usage",
    type: "Tool",
    source: "App Review",
    date: "Nov 2023",
    url: "https://play.google.com/",
  },
  {
    id: 16,
    title: "Lung cancer immunotherapy: how new drugs change survival rates",
    type: "Article",
    source: "Cancer Research UK",
    date: "Oct 2023",
    url: "https://www.cancerresearchuk.org/",
  },
  {
    id: 17,
    title: "Deep learning model distinguishes between bacterial and viral pneumonia",
    type: "Research",
    source: "Nature",
    date: "Sep 2023",
    url: "https://www.nature.com/",
  },
  {
    id: 18,
    title: "Bronchoscopy: how doctors see inside your lungs",
    type: "Article",
    source: "Cleveland Clinic",
    date: "Aug 2023",
    url: "https://my.clevelandclinic.org/",
  },
  {
    id: 19,
    title: "Interactive 3D lung anatomy tools for students",
    type: "Tool",
    source: "Web App",
    date: "Jul 2023",
    url: "https://google.com/",
  },
  {
    id: 20,
    title: "How sleep apnea affects lung and heart health",
    type: "Article",
    source: "Harvard Health",
    date: "Jun 2023",
    url: "https://www.health.harvard.edu/",
  },
  {
    id: 21,
    title: "Research: lung microbiome patterns linked to disease severity",
    type: "Research",
    source: "Frontiers in Medicine",
    date: "May 2023",
    url: "https://www.frontiersin.org/",
  },
  {
    id: 22,
    title: "YouTube: breathing exercises for COPD and asthma",
    type: "Video",
    source: "YouTube",
    date: "Apr 2023",
    url: "https://www.youtube.com/",
  },
  {
    id: 23,
    title: "Occupational lung diseases in factory and mine workers",
    type: "Article",
    source: "Lancet Respiratory Medicine",
    date: "Mar 2023",
    url: "https://www.thelancet.com/",
  },
  {
    id: 24,
    title: "Radiology AI: automatic lung field detection and cropping",
    type: "Tool",
    source: "GitHub",
    date: "Feb 2023",
    url: "https://github.com/",
  },
  {
    id: 25,
    title: "Big data analysis of hospital admissions for chronic lung disease",
    type: "Research",
    source: "IEEE",
    date: "Jan 2023",
    url: "https://ieeexplore.ieee.org/",
  },
  {
    id: 26,
    title: "New blood biomarkers correlate with ARDS severity",
    type: "Research",
    source: "JAMA",
    date: "Dec 2022",
    url: "https://jamanetwork.com/",
  },
  {
    id: 27,
    title: "How air quality sensors help protect lung health in cities",
    type: "Article",
    source: "WHO",
    date: "Nov 2022",
    url: "https://www.who.int/",
  },
  {
    id: 28,
    title: "YouTube: guide to spirometry test results",
    type: "Video",
    source: "YouTube",
    date: "Oct 2022",
    url: "https://www.youtube.com/",
  },
  {
    id: 29,
    title: "Telemedicine for remote management of chronic lung diseases",
    type: "News",
    source: "Digital Health News",
    date: "Sep 2022",
    url: "https://www.digitalhealth.net/",
  },
  {
    id: 30,
    title: "Digital twin lungs: simulating breathing for treatment planning",
    type: "Research",
    source: "Computational Medicine",
    date: "Aug 2022",
    url: "https://google.com/",
  },
];

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogItems.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleItems = blogItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="pt-28 pb-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Small, clean heading */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Lung Health – Research & Updates
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Curated articles, research papers, tools and videos around lungs, lung diseases and AI in healthcare.
        </p>

        {/* Vertical list */}
        <div className="space-y-5">
          {visibleItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-gray-200 pb-4 group"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[13px] uppercase tracking-wide text-gray-400">
                    {item.type} • {item.source}
                  </p>
                  <h2 className="text-base font-semibold text-gray-900 mt-1 group-hover:text-green-700 transition-colors">
                    {item.title}
                  </h2>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {item.date}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === idx + 1
                  ? "bg-green-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
