// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import '../../Styles/stock.css';
// import { Para, Title } from '../../Container/Container';
// import { BoxByIDAPI, UpdateBoxAPI } from '../../Services/APIManager';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { DownloadReport } from '../../Container/Container';

// const BoxStock = () => {
//   const { boxId } = useParams();
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [boxData, setBoxData] = useState(null);
//   const [selectedItems, setSelectedItems] = useState(new Set());
//   const [boxName, setBoxName] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const fetchBoxData = async () => {
//       const data = await BoxByIDAPI(boxId);
//       if (data?.data?.items) {
//         setItems(data.data.items);
//         setBoxData(data.data);
//         setBoxName(data.boxId);
//       }
//     };
//     fetchBoxData();
//   }, [boxId]);

//   const handleCheckboxChange = (itemId) => {
//     setSelectedItems(prevSelectedItems => {
//       const newSelectedItems = new Set(prevSelectedItems);
//       if (newSelectedItems.has(itemId)) {
//         newSelectedItems.delete(itemId);
//       } else {
//         newSelectedItems.add(itemId);
//       }
//       return newSelectedItems;
//     });
//   };

//   const handleSelectAllChange = (e) => {
//     const isChecked = e.target.checked;
//     setSelectedItems(isChecked ? new Set(items.map(item => item.itemId)) : new Set());
//   };
//   const formatNumber = (value) => {
//     const number = parseFloat(value);
//     return isNaN(number) ? '0.00' : number.toFixed(2);
// };
//   const filteredItems = items.filter(item => {
//     const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
//     return (
//       item.itemCode.toLowerCase().includes(lowerCaseSearchTerm) ||
//       item.grossWeightGrams.toLowerCase().includes(lowerCaseSearchTerm)
//     );
//   });

//   const getDisplayValue = (value) => value === null || value === undefined ? '-' : value;

//   const handleRemoveSelectedItems = async () => {
//     if (selectedItems.size === 0) {
//       alert("No items selected");
//       return;
//     }

//     const itemIds = Array.from(selectedItems);

//     try {
//       const result = await UpdateBoxAPI(boxId, itemIds);
//       if (result.error) {
//         console.error(result.error);
//         toast.error("Failed to remove selected items");
//       } else {
//         toast.success("Selected items removed successfully");
//         setItems(prevItems => prevItems.filter(item => !itemIds.includes(item.itemId)));
//         setSelectedItems(new Set());
//       }
//     } catch (error) {
//       console.error("Error removing selected items:", error);
//       alert("Failed to remove selected items");
//     }
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="stock">
//       <div className="table-container">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="search-box"
//         />
//         <table className="item-tables">
//           <thead>
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.size === items.length}
//                   onChange={handleSelectAllChange}
//                 />
//               </th>
//               <th>Item Code</th>
//               <th>Gross Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedItems.map((item, index) => (
//               <tr
//                 key={index}
//                 onClick={() => setSelectedItem(item)}
//                 className={selectedItem && selectedItem.itemId === item.itemId ? 'highlighted-row' : ''}
//               >
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedItems.has(item.itemId)}
//                     onChange={() => handleCheckboxChange(item.itemId)}
//                   />
//                 </td>
//                 <td>{getDisplayValue(item.itemCode)}</td>
//                 <td>{getDisplayValue(item.grossWeightGrams)} grams</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="remove-button" onClick={handleRemoveSelectedItems} disabled={selectedItems.size === 0}>
//           Remove Selected Items
//         </button>
//         <DownloadReport items={items} boxName={boxName} />
//         {/* Pagination */}
//         <div className="pagination">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               className={currentPage === index + 1 ? 'active' : ''}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Display Selected Item Details */}
//       <div className="item-container">
//                 {selectedItem ? (
//                     <div className='item-top'>
//                         <div className="item-image-section">
//                             {selectedItem?.images && selectedItem.images.length > 0 && (
//                                 <img
//                                     src={selectedItem.images[0]?.imageUrl}
//                                     alt={selectedItem.itemName || 'Item Image'}
//                                     className="item-image"
//                                 />
//                             )}
//                         </div>
//                         <div className="item-details-section">
//                             <Title text={selectedItem?.itemName || "No Item Selected"} />
//                             <p><span>Item Code:</span> {getDisplayValue(selectedItem?.itemCode)}</p>
//                             <p><span>Department:</span> {getDisplayValue(selectedItem?.department)}</p>
//                             <p><span>Silver Weight:</span> {getDisplayValue(selectedItem?.silverWeightGrams)} grams</p>
//                             <p><span>Other Weight:</span> {getDisplayValue(selectedItem?.saraffaOtherWeightGrams)}</p>
//                         </div>
//                     </div>
//                 ) : (
//                     <Para text="Select an item from the table to view details." />
//                 )}
//     {/* Prices Table */}
//     {selectedItem?.prices && (
//                     <div className="item-prices">
//                         <Title text='Prices' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Gold Price</th>
//                                         <th>Silver Price</th>
//                                         {/* <th>Labour Price</th> */}
//                                         <th>Wholesale Price</th>
//                                         <th>Retail Price</th>
//                                         <th>GST Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>{formatNumber(selectedItem.prices.goldPrice)}</td>
//                                         <td>{formatNumber(selectedItem.prices.silverPrice)}</td>
//                                         {/* <td>{formatNumber(selectedItem.prices.labourPrice)}</td> */}
//                                         <td>{formatNumber(selectedItem.prices.wholesalePrice)}</td>
//                                         <td>{formatNumber(selectedItem.prices.retailPrice)}</td>
//                                         <td>{formatNumber(selectedItem.prices.gstPrice)}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//                 {/* Diamonds Table */}
//                 {selectedItem?.diamonds && selectedItem.diamonds.length > 0 && (
//                     <div className="item-diamonds">
//                         <Title text='Diamonds' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Weight (cts)</th>
//                                         <th>Value</th>
//                                         <th>Rate</th>
//                                         <th>Details</th>
//                                         <th>PCS</th>
//                                         <th>Lot No</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedItem.diamonds.map((diamond, index) => (
//                                         <tr key={index}>
//                                             <td>{formatNumber(diamond.diamondWeightCarat)}</td>
//                                             <td>{getDisplayValue(diamond.diamondTypeName)}</td>
//                                             <td>{formatNumber(diamond.diamondTypeRate)}</td>
//                                             <td>{getDisplayValue(diamond.diamondDetails)}</td>
//                                             <td>{getDisplayValue(diamond.diamondPieces)}</td>
//                                             <td>{getDisplayValue(diamond.diamondTypeId)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* Rose Cuts Table */}
//                 {selectedItem?.roseCuts && selectedItem.roseCuts.length > 0 && (
//                     <div className="item-roseCuts">
//                         <Title text='Rose Cuts' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Weight (cts)</th>
//                                         <th>Value</th>
//                                         <th>Rate</th>
//                                         <th>PCS</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedItem.roseCuts.map((roseCut, index) => (
//                                         <tr key={roseCut.id || index}>
//                                             <td>{formatNumber(roseCut.weightCts)}</td>
//                                             <td>{formatNumber(roseCut.value)}</td>
//                                             <td>{formatNumber(roseCut.rate)}</td>
//                                             <td>{getDisplayValue(roseCut.pcs)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* Polkis Table */}
//                 {selectedItem?.polkis && selectedItem.polkis.length > 0 && (
//                     <div className="item-polkis">
//                         <Title text='Polkis' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Weight (cts)</th>
//                                         <th>Value</th>
//                                         <th>Rate</th>
//                                         <th>Category</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedItem.polkis.map(polki => (
//                                         <tr key={polki.polkiTypeId}>
//                                             <td>{formatNumber(polki.polkiWeightCarat)}</td>
//                                             <td>{getDisplayValue(polki.polkiTypeName)}</td>
//                                             <td>{formatNumber(polki.polkiTypeRate)}</td>
//                                             <td>{getDisplayValue(polki.polkiTypeCategory)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* Gold Table */}
//                 {selectedItem?.gold && selectedItem.gold.length > 0 && (
//                     <div className="item-gold">
//                         <Title text='Gold' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Gold Type</th>
//                                         <th>Weight (grams)</th>
//                                         <th>Rate (%)</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedItem.gold.map(gold => (
//                                         <tr key={gold.goldTypeId}>
//                                             <td>{getDisplayValue(gold.goldTypeName)}</td>
//                                             <td>{formatNumber(gold.goldWeightGrams)}</td>
//                                             <td>{formatNumber(gold.goldTypeRatePercent)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* Colored Stones Table */}
//                 {selectedItem?.coloredStones && selectedItem.coloredStones.length > 0 && (
//                     <div className="item-coloredStones">
//                         <Title text='Colored Stones' />
//                         <div className="table-scroll">
//                             <table className="item-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Weight (cts)</th>
//                                         <th>Value</th>
//                                         <th>Rate</th>
//                                         <th>Details</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {selectedItem.coloredStones.map(coloredStone => (
//                                         <tr key={coloredStone.coloredStoneId || coloredStone.weightCts}>
//                                             <td>{formatNumber(coloredStone.weightCts)}</td>
//                                             <td>{formatNumber(coloredStone.value)}</td>
//                                             <td>{formatNumber(coloredStone.rate)}</td>
//                                             <td>{getDisplayValue(coloredStone.details)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}


//             </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default BoxStock;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/stock.css';
import { Para, Title } from '../../Container/Container';
import { BoxByIDAPI, UpdateBoxAPI } from '../../Services/APIManager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadReport } from '../../Container/Container';

const BoxStock = () => {
  const { boxId } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxData, setBoxData] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [boxName, setBoxName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchBoxData = async () => {
      const data = await BoxByIDAPI(boxId);
      if (data?.data?.items) {
        setItems(data.data.items);
        setBoxData(data.data);
        setBoxName(data.boxId);
      }
    };
    fetchBoxData();
  }, [boxId]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prevSelectedItems => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setSelectedItems(isChecked ? new Set(items.map(item => item.itemId)) : new Set());
  };

  const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  const filteredItems = items.filter(item => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    return (
      item.itemCode.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.grossWeightGrams.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const getDisplayValue = (value) => value === null || value === undefined ? '-' : value;

  const handleRemoveSelectedItems = async () => {
    if (selectedItems.size === 0) {
      alert("No items selected");
      return;
    }

    const itemIds = Array.from(selectedItems);

    try {
      const result = await UpdateBoxAPI(boxId, itemIds);
      if (result.error) {
        console.error(result.error);
        toast.error("Failed to remove selected items");
      } else {
        toast.success("Selected items removed successfully");
        setItems(prevItems => prevItems.filter(item => !itemIds.includes(item.itemId)));
        setSelectedItems(new Set());
      }
    } catch (error) {
      console.error("Error removing selected items:", error);
      alert("Failed to remove selected items");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="stock">
      <div className="table-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <table className="item-tables">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.size === items.length}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>Item Code</th>
              <th>Gross Weight</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr
                key={item.itemId} // Ensure this is unique
                onClick={() => setSelectedItem(item)}
                className={selectedItem && selectedItem.itemId === item.itemId ? 'highlighted-row' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.has(item.itemId)}
                    onChange={() => handleCheckboxChange(item.itemId)}
                  />
                </td>
                <td>{getDisplayValue(item.itemCode)}</td>
                <td>{getDisplayValue(item.grossWeightGrams)} grams</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="remove-button" onClick={handleRemoveSelectedItems} disabled={selectedItems.size === 0}>
          Remove Selected Items
        </button>
        <DownloadReport items={items} boxName={boxName} />
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Display Selected Item Details */}
      <div className="item-container">
        {selectedItem ? (
          <div className='item-top'>
            <div className="item-image-section">
              {selectedItem?.images && selectedItem.images.length > 0 && (
                <img
                  src={selectedItem.images[0]?.imageUrl}
                  alt={selectedItem.itemName || 'Item Image'}
                  className="item-image"
                />
              )}
            </div>
            <div className="item-details-section">
              <Title text={selectedItem?.itemName || "No Item Selected"} />
              <p><span>Item Code:</span> {getDisplayValue(selectedItem?.itemCode)}</p>
              <p><span>Department:</span> {getDisplayValue(selectedItem?.department)}</p>
              <p><span>Silver Weight:</span> {getDisplayValue(selectedItem?.silverWeightGrams)} grams</p>
              <p><span>Other Weight:</span> {getDisplayValue(selectedItem?.saraffaOtherWeightGrams)}</p>
            </div>
          </div>
        ) : (
          <Para text="Select an item from the table to view details." />
        )}
        {/* Prices Table */}
        {selectedItem?.prices && (
          <div className="item-prices">
            <Title text='Prices' />
            <div className="table-scroll">
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Gold Price</th>
                    <th>Silver Price</th>
                    <th>Wholesale Price</th>
                    <th>Retail Price</th>
                    <th>GST Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatNumber(selectedItem.prices.goldPrice)}</td>
                    <td>{formatNumber(selectedItem.prices.silverPrice)}</td>
                    <td>{formatNumber(selectedItem.prices.wholesalePrice)}</td>
                    <td>{formatNumber(selectedItem.prices.retailPrice)}</td>
                    <td>{formatNumber(selectedItem.prices.gstPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Diamonds Table */}
        {selectedItem?.diamonds && selectedItem.diamonds.length > 0 && (
          <div className="item-diamonds">
            <Title text='Diamonds' />
            <div className="table-scroll">
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Weight (cts)</th>
                    <th>Value</th>
                    <th>Rate</th>
                    <th>Details</th>
                    <th>PCS</th>
                    <th>Lot No</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.diamonds.map((diamond) => (
                    <tr key={diamond.diamondTypeId}> {/* Ensure diamondTypeId is unique */}
                      <td>{formatNumber(diamond.diamondWeightCarat)}</td>
                      <td>{getDisplayValue(diamond.diamondTypeName)}</td>
                      <td>{formatNumber(diamond.diamondTypeRate)}</td>
                      <td>{getDisplayValue(diamond.diamondDetails)}</td>
                      <td>{getDisplayValue(diamond.diamondPieces)}</td>
                      <td>{getDisplayValue(diamond.diamondTypeId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Rose Cuts Table */}
        {selectedItem?.roseCuts && selectedItem.roseCuts.length > 0 && (
          <div className="item-roseCuts">
            <Title text='Rose Cuts' />
            <div className="table-scroll">
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Weight (cts)</th>
                    <th>Value</th>
                    <th>Rate</th>
                    <th>Details</th>
                    <th>PCS</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.roseCuts.map((roseCut) => (
                    <tr key={roseCut.roseCutTypeId}> {/* Ensure roseCutTypeId is unique */}
                      <td>{formatNumber(roseCut.roseCutWeightCarat)}</td>
                      <td>{getDisplayValue(roseCut.roseCutValue)}</td>
                      <td>{formatNumber(roseCut.roseCutRate)}</td>
                      <td>{getDisplayValue(roseCut.roseCutDetails)}</td>
                      <td>{getDisplayValue(roseCut.roseCutPieces)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Colored Stones Table */}
        {selectedItem?.coloredStones && selectedItem.coloredStones.length > 0 && (
          <div className="item-coloredStones">
            <Title text='Colored Stones' />
            <div className="table-scroll">
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Weight (cts)</th>
                    <th>Value</th>
                    <th>Rate</th>
                    <th>Details</th>
                    <th>PCS</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItem.coloredStones.map((coloredStone) => (
                    <tr key={coloredStone.coloredStoneTypeId}> {/* Ensure coloredStoneTypeId is unique */}
                      <td>{formatNumber(coloredStone.coloredStoneWeightCarat)}</td>
                      <td>{getDisplayValue(coloredStone.coloredStoneValue)}</td>
                      <td>{formatNumber(coloredStone.coloredStoneRate)}</td>
                      <td>{getDisplayValue(coloredStone.coloredStoneDetails)}</td>
                      <td>{getDisplayValue(coloredStone.coloredStonePieces)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BoxStock;
