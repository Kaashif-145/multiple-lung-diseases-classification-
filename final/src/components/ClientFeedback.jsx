import React, { useEffect, useRef } from "react";

const ClientFeedback = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Create player after API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current, {
        height: "360",
        width: "640",
        videoId: "y3LUlag7W1s", // your video ID
        playerVars: {
          autoplay: 0,
          controls: 1,
        },
      });
    };
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Make Your Lungs Healthy</h2>
          <p className="text-gray-600">
            Do these exercised regularly to keep your lungs healthy and strong. A healthy
            lifestyle along with these exercises can help improve lung function and
            overall respiratory health.
          </p>
        </div>

        {/* Right YouTube Video */}
        <div className="md:w-1/2">
          <div ref={playerRef} />
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
