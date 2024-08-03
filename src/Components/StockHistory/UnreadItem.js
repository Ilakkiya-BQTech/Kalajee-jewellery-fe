import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../../Styles/history.css";
const UnreadItemsPage = () => {
  const location = useLocation();
  const unreadItems = location.state?.unreadItems || [];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="unread-items-page">
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {unreadItems.map((item, index) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td>{index + 1}</td>
              <td>{item.code}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div className="item-details">
          <img src={selectedItem.imageUrl} alt={selectedItem.code} width="100" />
          <p>Code: {selectedItem.code}</p>
        </div>
      )}
    </div>
  );
};

export default UnreadItemsPage;
