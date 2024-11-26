import React from "react";

function About() {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section: Image or Illustration */}
        <div className="flex justify-center">
          <img
            src="/news-platform.svg"
            alt="News Platform Illustration"
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Right Section: Text Content */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our platform leverages the <strong>News API</strong> to deliver curated articles
            while addressing the growing concerns of misinformation and misleading content.
            Using advanced sentiment analysis, the platform predicts whether articles are
            positive or critical, helping readers quickly understand the tone and make
            informed decisions.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            We also encourage user engagement by allowing readers to <strong>like</strong> or
            <strong> dislike</strong> articles, fostering an interactive feedback loop.
            Our standout feature is an <strong>AI-powered chatbot</strong>, which acts as
            a virtual assistant, answering questions and providing insights into news
            topics.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            With a combination of sentiment analysis, user interaction, and intelligent
            features, our platform creates a reliable and user-friendly environment for
            consuming and interacting with news.
          </p>

          {/* Call-to-Action */}
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
