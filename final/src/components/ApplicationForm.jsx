import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { db1 as db } from "../firebaseConfig"; // db1 is exported from Project 1
import { addDoc, collection } from "firebase/firestore";

const SERVICE_ID = "service_c7x49hr";
const TEMPLATE_ID = "template_fihchna";
const PUBLIC_KEY = "JT6ABnuE26KrudQhA";

const AppointmentForm = () => {
  // form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    disease: "",
    date: "",
    message: "",
  });

  // computed min date for appointment -> tomorrow
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const iso = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD
    setMinDate(iso);
    // prefill appointment date to tomorrow (optional)
    setFormData((s) => ({ ...s, date: iso }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // quick client-side validation
    if (!formData.name || !formData.phone || !formData.email || !formData.date) {
      alert("Please fill name, phone, email and appointment date.");
      return;
    }

    try {
      console.log("Submitting formData:", formData);

      // 1) Save to Firestore (collection "appointments")
      const docRef = await addDoc(collection(db, "appointments"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      console.log("Firestore doc created with ID:", docRef.id);

      // 2) Send Email via EmailJS - map fields explicitly to template variables
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        disease: formData.disease,
        message: formData.message,
      };

      const emailResult = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log("EmailJS result:", emailResult);

      alert("Appointment booked successfully! A confirmation email has been sent.");

      // reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        disease: "",
        date: minDate, // reset to tomorrow
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting the form (check console).");
    }
  };

  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT */}
        <div className="px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
            Make an Appointment
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Get the best medical consultation from our expert doctors. Choose a convenient appointment date and we'll confirm with you shortly.
          </p>

          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="inline-block bg-green-100 text-green-700 rounded-full p-2">✓</span>
              <div>
                <div className="font-semibold">Expert Doctors</div>
                <div className="text-sm">Certified and experienced specialists</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block bg-green-100 text-green-700 rounded-full p-2">✓</span>
              <div>
                <div className="font-semibold">Quick Confirmation</div>
                <div className="text-sm">We’ll email you the appointment details</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block bg-green-100 text-green-700 rounded-full p-2">✓</span>
              <div>
                <div className="font-semibold">Secure Storage</div>
                <div className="text-sm">Your appointment is stored in our secure database</div>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="relative z-20">
          <div className="bg-white p-6 md:p-8 shadow-2xl rounded-2xl border">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-4">Book an Appointment</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />

              <select
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                className="w-full border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select Disease Type (optional)</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Dental</option>
                <option>Eye Specialist</option>
              </select>

              {/* Appointment date - only tomorrow onwards */}
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                className="w-full border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-200"
                required
              />

              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                className="w-full border-gray-200 rounded-md p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-semibold shadow hover:from-green-700"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
