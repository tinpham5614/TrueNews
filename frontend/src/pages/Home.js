import React from "react";
import Articles from "../components/Articles";
import Chatbot from "../components/Chatbot";

function Home() {
  return (
    <div className="text-left">
      <Articles />
      <Chatbot />
    </div>
  );
}

export default Home;
