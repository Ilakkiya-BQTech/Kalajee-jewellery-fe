import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/boxes.css';

const Boxes = () => {
  return (
    <div className="boxes-container">
      <Link to="/stock/1" className="box">
        <h2 className="box-title">Box 1</h2>
        <p className="box-subtitle">Count: 100</p>
      </Link>
      <Link to="/stock/2" className="box">
        <h2 className="box-title">Box 2</h2>
        <p className="box-subtitle">Count: 90</p>
      </Link>
    </div>
  );
};

export default Boxes;
