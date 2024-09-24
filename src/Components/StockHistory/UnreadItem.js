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
//         const detailsPromises = unreadItemIds.map(id => GetItemsByIDAPI(id));
//         const results = await Promise.all(detailsPromises);
    
//         const allDetails = results.map(result => {
//           if (result.error) {
//             throw new Error(result.error);
//           }
//           return result;
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
//       <div className="item-cards-container">
//       {itemDetails.length > 0 ? (
//         itemDetails.map(item => (
//           <div key={item.itemId} className="item-card">
//             <img src={item.images[0]?.imageUrl || 'default-image-url.jpg'} alt={item.itemCode} className="item-image" />
//             <div className="item-info">
//               <h3>Code: {item.itemCode}</h3>
//               <p><span>Name: </span>{item.itemName}</p>
//               <p><span>Gold Rate: </span>{item.prices.goldRate}</p>
//               <p><span>Retail Price: </span>{item.prices.retailPrice}</p>
//               <p><span>Gross Weight: </span>{item.grossWeightGrams} grams</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No unread items available.</p>
//       )}
//     </div>
    
//       ) : (
//         <p></p>
//       )}
//     </div>
//   );
// };

// export default UnreadItemsPage;
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GetItemsByIDAPI } from '../../Services/APIManager';

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
       
        const detailsPromises = unreadItemIds.map(id => GetItemsByIDAPI(id));
        const results = await Promise.all(detailsPromises);

       
        console.log('API Results:', results);

       
        const allDetails = results.filter(result => result.data && !result.error).map(result => result.data);

        setItemDetails(allDetails);
      } catch (err) {
        setError(`Error fetching details: ${err.message}`);
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
          {itemDetails.map((item) => (
            <div key={item.itemId} className="item-card">
              <img 
                src={(item.images && item.images[0]?.imageUrl) || 'default-image-url.jpg'} 
                alt={item.itemCode || 'Item Image'} 
                className="item-image" 
              />
              <div className="item-info">
                <h3>Code: {item.itemCode || 'N/A'}</h3>
                <p><span>Name: </span>{item.itemName || 'N/A'}</p>
                <p><span>Gold Rate: </span>{item.prices?.rates?.goldRate || 'N/A'}</p>
                <p><span>Retail Price: </span>{item.prices?.retailPrice || 'N/A'}</p>
                <p><span>Gross Weight: </span>{item.grossWeightGrams || 'N/A'} grams</p>
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
