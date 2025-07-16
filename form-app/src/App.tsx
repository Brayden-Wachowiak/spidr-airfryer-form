import React from "react";
import Form from "./components/Form/Form";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="section-container">
      <div className="float-left">
        <h1 className="text-center">Interested in our Air Fryer?</h1>
        <h4 className="text-center">
          All of our air fryers are made with 100% real cheese. Top chedda
          fryers!
        </h4>
        <Form />
      </div>
      <img
        src="images/air-fryer.jpg"
        className="img-responsive"
        alt="Image of Air Fryer"
      />
    </div>
  );
};

export default App;
