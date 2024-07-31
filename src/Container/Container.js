import React from 'react';
import '../Styles/container.css'

// Title Component
const Title = ({ text }) => {
  return <h1 className="title">{text}</h1>;
};

//subtitle component
const Subtitle = ({ text }) => {
  return <h2 className="subtitle">{text}</h2>;
};

// Button Component
const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

// Card Component
const Card = ({ image, title, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};


// Para Component
const Para = ({ text }) => {
    return <p className="para">{text}</p>;
  };

export { Title, Button, Card, Para,Subtitle };


