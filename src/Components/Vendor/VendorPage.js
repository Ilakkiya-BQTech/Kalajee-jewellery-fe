import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../Styles/vendor.css';
import { FetchItemsAPI } from '../../Services/APIManager';

const VendorPage = () => {
  const [items, setItems] = useState([]);
  const [folder, setFolder] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(15);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900); 
  const navigate = useNavigate(); 
  const folderDropRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchItemsAPI(limit, page);
        if (data && data.data) {
          setItems(data.data);
          setTotalItems(data.totalItems || 50);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();

   
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900); 
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, [limit, page]);

 
  const createFolderIfNeeded = () => {
    if (!folder) {
      const folderName = 'Folder1';
      setFolder({ name: folderName, items: [] });
    }
  };

  
  const handleAddToFolder = (item) => {
    createFolderIfNeeded(); 

    
    setFolder((prevFolder) => ({
      ...prevFolder,
      items: [...prevFolder.items, item],
    }));
  };

  
  const handleAddButtonClick = (e, item) => {
    e.stopPropagation(); // Prevent default click behavior
    handleAddToFolder(item); // Add item to the folder
  };

  
  const handleItemClick = (item) => {
    navigate(`/item-detail`, { state: { item } }); // Navigate to item detail page
  };

 
  const handleFolderClick = () => {
    navigate('/folder', { state: { folder } }); // Pass folder data to FolderPage
  };


  const handleDragStart = (e, item) => {
    e.dataTransfer.setData('item', JSON.stringify(item)); // Store item data in drag event
  };

  
  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData('item');
    if (itemData) {
      const item = JSON.parse(itemData);
      handleAddToFolder(item); // Add item to folder on drop
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
  };

 
  const renderFolderArea = () => {
    if (!isMobile) {
      return (
        <div
          ref={folderDropRef}
          className="folder-drop-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {folder ? (
            <div>
              <h3>{`${folder.name} (${folder.items.length})`}</h3>
              <ul className="folder-items-list">
                {folder.items.map((item, index) => (
                  <li key={index} className="folder-item-detail">
                      {/* <div className="item-image-section">
        <img
          src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
          alt={item.itemName || 'Jewelry'}
          className="detail-item-image"
        />
      </div> */}
                    <span><strong>Item Code:</strong> {item.itemCode}</span>
                    <span><strong>Name:</strong> {item.itemName}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            'Drag items here to create a folder'
          )}
        </div>
      );
    }
  };

  const filteredItems = items.filter(
    (item) =>
      (item.itemCode && item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.rCode && item.rCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="vendor-page">
      <div className="vendor-header">
        <input
          type="text"
          placeholder="Search Jewellery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        <button
          onClick={handleFolderClick} // Show folder items on click, open folder page
          className="create-folder-button"
          disabled={!folder} // Disable button if no folder created
        >
          {folder ? `${folder.name} (${folder.items.length})` : 'Create Folder'}
        </button>
      </div>
<div className='Area'>
     

      <div className="vendor-content">
        <div className="items-section">
          {/* <h2> Items</h2> */}
          <div className="items-grid">
            {filteredItems.map((item) => (
              <div
                key={item.itemId}
                className="item-card"
                onClick={() => handleItemClick(item)} 
                draggable={!isMobile} 
                onDragStart={(e) => handleDragStart(e, item)} 
              >
                <img
                  src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
                  alt={item.itemName || 'Jewelry'}
                  className="item-image"
                />
                <p>{item.itemCode}</p>

              
                {isMobile && (
                  <button className="add-button" onClick={(e) => handleAddButtonClick(e, item)}>
                    Add
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>
        {renderFolderArea()} 
      </div>
    </div>
  );
};

export default VendorPage;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/vendor.css';
// import { FetchItemsAPI } from '../../Services/APIManager';

// const VendorPage = () => {
//   const [items, setItems] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null); // Track selected item for mobile
//   const [searchTerm, setSearchTerm] = useState('');
//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [showFolderSelect, setShowFolderSelect] = useState(false); // Control folder selection UI
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await FetchItemsAPI(limit, page);
//         if (data && data.data) {
//           setItems(data.data);
//           setTotalItems(data.totalItems || 50);
//         }
//       } catch (error) {
//         console.error('Error fetching items:', error);
//       }
//     };
//     fetchData();
//   }, [limit, page]);

//   const handleCreateFolder = () => {
//     const folderName = `Folder-${folders.length + 1}`;
//     setFolders([...folders, { name: folderName, items: [] }]);
//   };

//   // Add selected item to folder (for mobile Add button)
//   const handleAddToFolder = (folderName) => {
//     if (selectedItem) {
//       const updatedFolders = folders.map((folder) =>
//         folder.name === folderName
//           ? { ...folder, items: [...folder.items, selectedItem] }
//           : folder
//       );
//       setFolders(updatedFolders);
//       setSelectedItem(null);
//       setShowFolderSelect(false); // Hide folder select UI after adding
//     }
//   };

//   // Handle click for mobile "Add" button
//   const handleAddButtonClick = (e, item) => {
//     e.stopPropagation(); // Prevent the default behavior of routing to item details
//     setSelectedItem(item);
//     setShowFolderSelect(true); // Show folder selection dropdown
//   };

//   const filteredItems = items.filter(
//     (item) =>
//       (item.itemCode && item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (item.rCode && item.rCode.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Handle item click to navigate to detail page
//   const handleItemClick = (item) => {
//     navigate(`/item-detail`, { state: { item } });
//   };

//   return (
//     <div className="vendor-page">
//       <div className="vendor-header">
//         <input
//           type="text"
//           placeholder="Search Jewelry..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="search-box"
//         />
//         <button onClick={handleCreateFolder} className="create-folder-button">
//           Create Folder
//         </button>
//       </div>

//       <div className="vendor-content">
//         <div className="items-section">
//           <h2>Jewelry Items</h2>
//           <div className="items-grid">
//             {filteredItems.map((item) => (
//               <div
//                 key={item.itemId}
//                 className="item-card"
//                 onClick={() => handleItemClick(item)}  // Handle item click to route to details
//               >
//                 <img
//                   src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
//                   alt={item.itemName || 'Jewelry'}
//                   className="item-image"
//                 />
//                 <p>{item.itemCode}</p>
                
//                 {/* Show Add button for mobile screens smaller than 500px */}
//                 {window.innerWidth < 500 && (
//                   <button className="add-button" onClick={(e) => handleAddButtonClick(e, item)}>
//                     Add
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="folders-section">
//           <h2>Folders</h2>
//           <div className="folders-grid">
//             {folders.map((folder, index) => (
//               <div key={index} className="folder-card">
//                 <h3>{folder.name}</h3>
//                 <div className="folder-items">
//                   {folder.items.length > 0 ? (
//                     folder.items.map((item) => (
//                       <div key={item.itemId} className="folder-item">
//                         <img
//                           src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
//                           alt={item.itemName || 'Jewelry'}
//                           className="folder-item-image"
//                         />
//                         <p>{item.itemCode}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>No items in this folder</p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Show folder selection dropdown when "Add" button is clicked */}
//       {showFolderSelect && (
//         <div className="folder-select-overlay">
//           <div className="folder-select-container">
//             <h3>Select a folder to add the item</h3>
//             {folders.map((folder) => (
//               <button
//                 key={folder.name}
//                 className="folder-select-button"
//                 onClick={() => handleAddToFolder(folder.name)}
//               >
//                 {folder.name}
//               </button>
//             ))}
//             <button
//               className="folder-select-cancel"
//               onClick={() => setShowFolderSelect(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorPage;
