import React from 'react';
import '../../Styles/boxes.css';

const Boxes = () => {
  return (
    <div className="boxes-container">
      <div className="box">
        <h2 className="box-title">Box 1</h2>
        <p className="box-subtitle">Count: 100</p>
      </div>
      <div className="box">
        <h2 className="box-title">Box 2</h2>
        <p className="box-subtitle">Count: 90</p>
      </div>
    </div>
  );
};

export default Boxes;
