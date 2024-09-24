import React from 'react';
import { useLocation } from 'react-router-dom'; // To get the folder data

const FolderPage = () => {
  const location = useLocation(); // Access the state passed via navigate
  const folder = location.state?.folder; // Extract folder from state

  return (
    <div className="folder-page">
      <h1>{folder?.name} Items</h1>

      {folder && folder.items.length > 0 ? (
        <div className="folder-items-grid">
          {folder.items.map((item) => (
            <div key={item.itemId} className="folder-item">
              <img
                src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
                alt={item.itemName || 'Jewelry'}
                className="folder-item-image"
              />
              <p>{item.itemCode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in this folder</p>
      )}
    </div>
  );
};

export default FolderPage;
