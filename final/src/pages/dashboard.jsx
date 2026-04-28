// Dashboard.jsx
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FaComments } from "react-icons/fa";

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [severity, setSeverity] = useState(null);
  const [limeImage, setLimeImage] = useState(null); // filename
  const [limeExplanation, setLimeExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  // XAI modal
  const [xaiOpen, setXaiOpen] = useState(false);

  // Chatbot states
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setUploadedImage(acceptedFiles[0]);
      setPrediction(null);
      setSeverity(null);
      setLimeImage(null);
      setLimeExplanation(null);
    },
  });

  const handlePredict = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedImage);

    try {
      setLoading(true);
      const res = await axios.post("https://multiple-lung-diseases-classification-1.onrender.com/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.error) {
        alert("Server error: " + res.data.error);
        return;
      }

      setPrediction(res.data.prediction);
      setSeverity(res.data.severity);
      setLimeImage(res.data.lime_image);
      setLimeExplanation(res.data.lime_explanation);

    } catch (err) {
      console.error(err);
      alert("Prediction failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  // sends message to backend and also provides contextual data
  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();

    // add user message to UI
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setChatInput("");

    try {
      const payload = {
        message: userMsg,
        prediction: prediction,
        severity: severity,
        lime_image: limeImage
      };

      const res = await axios.post("https://multiple-lung-diseases-classification-1.onrender.com/chatbot", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const botText = (res.data && res.data.response) ? res.data.response : "No reply";
      setMessages((m) => [...m, { from: "bot", text: botText }]);

      // if backend included a heatmap_url in response, open modal
      if (res.data.heatmap_url) {
        setXaiOpen(true);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((m) => [...m, { from: "bot", text: "Chat service unavailable." }]);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: "#1E1E2F", color: "#fff", padding: 20 }}>
        <h3>Dashboard</h3>
        <p style={{ color: "#bbb" }}>Lung disease predictor</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: 40, textAlign: "center" }}>
        <h2>Upload Lung X-Ray</h2>

        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #FF6B6B",
            padding: 40,
            borderRadius: 12,
            width: 420,
            margin: "20px auto",
            textAlign: "center",
          }}
        >
          <input {...getInputProps()} />
          {uploadedImage ? (
            <img
              src={URL.createObjectURL(uploadedImage)}
              alt="preview"
              style={{ width: 350, borderRadius: 8 }}
            />
          ) : (
            <p>Drag & drop image here, or click to select</p>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={handlePredict}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            {loading ? "Predicting..." : "Predict Disease"}
          </button>
        </div>

        {/* Prediction + severity */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          {prediction && (
            <>
              <div style={{ fontSize: 20, color: "#FF6B6B" }}>
                <strong>Prediction:</strong> {prediction}
              </div>
              {severity && (
                <div style={{ marginTop: 6, fontSize: 18, color: "#4a90e2" }}>
                  <strong>Severity:</strong> {severity}
                </div>
              )}
            </>
          )}
        </div>

        {/* XAI button & preview */}
        <div style={{ marginTop: 18 }}>
          {limeImage && (
            <>
              <button
                onClick={() => setXaiOpen(true)}
                style={{
                  padding: "10px 18px",
                  background: "#4a90e2",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                View XAI Explanation
              </button>

              <div style={{ marginTop: 12 }}>
                <small>Quick preview:</small>
                <div>
                  <img
                    src={`https://multiple-lung-diseases-classification-1.onrender.com/uploads/${limeImage}`}
                    alt="lime preview"
                    style={{ maxWidth: 360, borderRadius: 8, border: "1px solid #ddd" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {limeExplanation && (
          <div style={{ marginTop: 18, maxWidth: 760, marginLeft: "auto", marginRight: "auto", background: "#f7f7f7", padding: 16, borderRadius: 8 }}>
            <strong>Model explanation:</strong>
            <p style={{ marginTop: 6 }}>{limeExplanation}</p>
          </div>
        )}
      </div>

      {/* Chat floating button */}
      <div
        onClick={() => setChatOpen(true)}
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#FF6B6B",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          cursor: "pointer",
          zIndex: 4000,
        }}
      >
        <FaComments size={28} />
      </div>

      {/* Chat modal */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 22,
            width: 360,
            height: 480,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 6px 30px rgba(0,0,0,0.2)",
            zIndex: 4000,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "#FF6B6B", color: "white", padding: 12, display: "flex", justifyContent: "space-between" }}>
            <strong>AI Health Chatbot</strong>
            <button onClick={() => setChatOpen(false)} style={{ background: "transparent", border: "none", color: "white", fontSize: 20 }}>✖</button>
          </div>

          <div style={{ flex: 1, padding: 12, overflowY: "auto", background: "#fafafa" }}>
            {messages.length === 0 && <div style={{ color: "#666" }}>Ask about the prediction, severity, or XAI.</div>}
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, textAlign: m.from === "user" ? "right" : "left" }}>
                <div style={{ display: "inline-block", padding: "8px 12px", borderRadius: 12, background: m.from === "user" ? "#DCF8C6" : "#eee" }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 12, borderTop: "1px solid #eee", display: "flex" }}>
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type message..."
              style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
            />
            <button
              onClick={sendChat}
              style={{ marginLeft: 8, background: "#4a90e2", color: "white", border: "none", padding: "8px 12px", borderRadius: 8 }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* XAI Modal (full) */}
      {xaiOpen && (
        <div onClick={() => setXaiOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 4500 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "70%", background: "#fff", borderRadius: 10, padding: 20, overflow: "auto", maxHeight: "85vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: "#4a90e2" }}>XAI Explanation</h3>
              <button onClick={() => setXaiOpen(false)} style={{ background: "transparent", border: "none", fontSize: 20 }}>✖</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4>LIME Heatmap</h4>
              {limeImage ? (
                <img src={`https://multiple-lung-diseases-classification-1.onrender.com/uploads/${limeImage}`} alt="LIME heatmap" style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }} />
              ) : (
                <p>No heatmap generated yet.</p>
              )}
            </div>

            {limeExplanation && (
              <div style={{ marginTop: 12, background: "#fafafa", padding: 12, borderRadius: 8 }}>
                <strong>Explanation</strong>
                <p style={{ marginTop: 8 }}>{limeExplanation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
