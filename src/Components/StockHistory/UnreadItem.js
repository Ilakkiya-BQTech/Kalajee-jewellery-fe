import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetItemsByIDAPI } from '../../Services/APIManager';
import "../../Styles/history.css";

const UnreadItemsPage = () => {
  const location = useLocation();
  const unreadItemIds = location.state?.unreadItemIds || [];

  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = unreadItemIds.map(id => GetItemsByIDAPI(id));
        const results = await Promise.all(details);
        
        const allDetails = results.map(result => {
          if (result.error) {
            throw new Error(result.error);
          }
          return result.data;
        });

        setItemDetails(allDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [unreadItemIds]);

  return (
    <div className="unread-items-page">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {itemDetails.length > 0 ? (
        <div className="item-cards-container">
          {itemDetails.map(item => (
            <div key={item.itemId} className="item-card">
              <img src={item.itemImages[0]?.imageUrl} alt={item.itemCode} className="item-image" />
              <div className="item-info">
                <h3>Code: {item.itemCode}</h3>
                <p><span>Name: </span>{item.itemName}</p>
                <p><span>Gold Rate: </span>{item.goldRate}</p>
                <p><span>Retail Price: </span>{item.retailPrice}</p>
                <p><span>Gross Weight: </span>{item.grossWtGrams} grams</p>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UnreadItemsPage;

// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { GetItemsByIDAPI } from '../../Services/APIManager';
// import "../../Styles/history.css";

// const UnreadItemsPage = () => {
//   const location = useLocation();
//   const unreadItemIds = location.state?.unreadItemIds || [];

//   const [itemDetails, setItemDetails] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const details = unreadItemIds.map(id => GetItemsByIDAPI(id));
//         const results = await Promise.all(details);
        
//         const allDetails = results.map(result => {
//           if (result.error) {
//             throw new Error(result.error);
//           }
//           return result.data;
//         });

//         setItemDetails(allDetails);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [unreadItemIds]);

//   return (
//     <div className="unread-items-page">
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">Error: {error}</p>}
//       {itemDetails.length > 0 ? (
//         <div className="item-details-list">
//           {itemDetails.map(item => (
//             <div key={item.itemId} className="item-details">
//               <img src={item.itemImages[0]?.imageUrl} alt={item.itemCode} width="100" />
//               <p>Code: {item.itemCode}</p>
//               <p>Name: {item.itemName}</p>
//               <p>Gold Rate: {item.goldRate}</p>
//               <p>Retail Price: {item.retailPrice}</p>
//               <p>Gross Weight: {item.grossWtGrams} grams</p>
//               {/* Add more fields as needed */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No unread items to display.</p>
//       )}
//     </div>
//   );
// };

// export default UnreadItemsPage;
