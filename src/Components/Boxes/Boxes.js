import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/boxes.css';
import { Title } from '../../Container/Container';
import { AllBoxesAPI } from '../../Services/APIManager';

const Boxes = () => {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const result = await AllBoxesAPI();
      if (!result.error) {
        setBoxes(result.data);
      } else {
        console.error(result.error);
      }
    };

    fetchBoxes();
  }, []);

  return (
    <div className="boxes-container">
      {boxes.length > 0 ? (
        boxes.map((box) => (
          <Link to={`/stock/${box.boxId}`} key={box.boxId} className="box">
            <Title text={`Box ${box.boxId}`} />
            <p><span>Description:</span> {box.boxDescription}</p>
            <p><span>Weight:</span> {box.boxWeight}</p>
            <p><span>Status:</span> {box.boxStatus}</p>
            <p><span>Quantity:</span> {box.count}</p>
          </Link>
        ))
      ) : (
        <p>Loading boxes...</p>
      )}
    </div>
  );
};

export default Boxes;



