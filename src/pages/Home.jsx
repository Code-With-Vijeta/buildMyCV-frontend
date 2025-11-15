import React from "react";
import { Link } from "react-router-dom";
import { FaRegFileAlt, FaFileDownload, FaRegLightbulb, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-700 to-purple-600 text-white overflow-hidden">
        {/* Hero bubbles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 bg-indigo-500 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-20 py-32 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 sm:mb-8 drop-shadow-2xl">
            Build Stunning Resumes Instantly
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Create, customize, and export professional resumes in minutes. Impress recruiters instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link
              to="/editor"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold shadow-2xl hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              Start Building
            </Link>
            <a
              href="#features"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {[
            {
              icon: <FaRegFileAlt size={48} />,
              title: "Professional Templates",
              desc: "Beautifully designed templates for every industry."
            },
            {
              icon: <FaRegLightbulb size={48} />,
              title: "Smart AI Suggestions",
              desc: "Get AI-powered suggestions for skills, achievements, and more."
            },
            {
              icon: <FaFileDownload size={48} />,
              title: "Export & Share",
              desc: "Download PDF or share your resume online instantly."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-300 hover:shadow-3xl"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              {
                step: 1,
                title: "Fill Your Info",
                desc: "Add personal details, education, experience, skills, and projects easily."
              },
              {
                step: 2,
                title: "Preview & Customize",
                desc: "Watch your resume update in real-time and choose professional templates."
              },
              {
                step: 3,
                title: "Export & Share",
                desc: "Download as PDF or share your professional profile online instantly."
              }
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="bg-white text-gray-900 p-6 sm:p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="text-indigo-600 font-bold text-4xl mb-4">{step}</div>
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 text-center px-6 sm:px-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Ready to Create Your Resume?</h2>
        <p className="mb-8 text-gray-300 text-base sm:text-lg">
          Join thousands of professionals building standout resumes effortlessly.
        </p>
        <Link
          to="/editor"
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold shadow-2xl hover:scale-105 hover:shadow-3xl transition-transform duration-300"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer with bubbles */}
      <footer className="relative bg-gray-900 text-gray-300 py-16 sm:py-20 overflow-hidden">
        {/* Footer bubbles */}
        <div className="absolute -bottom-20 -left-16 w-48 h-48 bg-indigo-600 rounded-full opacity-30 animate-pulse-slow blur-2xl"></div>
        <div className="absolute -top-20 -right-16 w-72 h-72 bg-purple-600 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 relative z-10">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} BuildMyCV. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
