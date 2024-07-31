
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import '../../Styles/stock.css';
// import { Para, Title } from '../../Container/Container';
// import { BoxByIDAPI,UpdateBoxAPI } from '../../Services/APIManager';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BoxStock = () => {
//   const { boxId } = useParams();
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [boxData, setBoxData] = useState(null);
//   const [selectedItems, setSelectedItems] = useState(new Set());

//   useEffect(() => {
//     const fetchBoxData = async () => {
//       const data = await BoxByIDAPI(boxId);
//       if (data?.data?.items) {
//         setItems(data.data.items);
//         setBoxData(data.data);
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

//   const filteredItems = items.filter(item => {
//     const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
//     return (
//       item.itemCode.toLowerCase().includes(lowerCaseSearchTerm) ||
//       item.goldValue.toLowerCase().includes(lowerCaseSearchTerm) ||
//       item.rCode.toLowerCase().includes(lowerCaseSearchTerm) ||
//       item.grossWtGrams.toLowerCase().includes(lowerCaseSearchTerm)
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

//               </th>
//               <th>Item Code</th>
//               <th>R-Code</th>
//               <th>Gross Weight</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredItems.map((item, index) => (
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
//                 <td>{getDisplayValue(item.rCode)}</td>
//                 <td>{getDisplayValue(item.grossWtGrams)} grams</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button className="remove-button" onClick={handleRemoveSelectedItems}  disabled={selectedItems.size === 0}>
//           Remove Selected Items
//         </button>

//         <button className="download-button">
//           Download Report
//         </button>
//       </div>
//       <div className="item-container">
//         {selectedItem ? (
//           <div className='item-top'>
//             <div className="item-image-section">
//               {selectedItem?.itemImages.length > 0 && (
//                 <img
//                   src={selectedItem.itemImages[0]?.imageUrl}
//                   alt={selectedItem.itemName || 'Item Image'}
//                   className="item-image"
//                 />
//               )}
//             </div>
//             <div className="item-details-section">
//               <Title text={selectedItem?.itemName || "No Item Selected"} />
//               <p><span>Item Code:</span> {getDisplayValue(selectedItem?.itemCode)}</p>
//               <p><span>Department:</span> {getDisplayValue(selectedItem?.dept)}</p>
//               <p><span>Silver Weight:</span> {getDisplayValue(selectedItem?.slvrWt)} grams</p>
//               <p><span>Sarraf Other Weight:</span> {getDisplayValue(selectedItem?.sarrafOtherWt)}</p>
//             </div>
//           </div>
//         ) : (
//           <Para text="Select an item from the table to view details." />
//         )}
//         {/* Diamonds Table */}
//         {selectedItem?.diamonds.length > 0 && (
//           <div className="item-diamonds">
//             <Title text='Diamonds' />
//             <table className="item-table">
//               <thead>
//                 <tr>
//                   <th>Weight (cts)</th>
//                   <th>Value</th>
//                   <th>Rate</th>
//                   <th>Details</th>
//                   <th>PCS</th>
//                   <th>Lot No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedItem.diamonds.map(diamond => (
//                   <tr key={diamond.diamondId}>
//                     <td>{getDisplayValue(diamond.weightCts)}</td>
//                     <td>{getDisplayValue(diamond.value)}</td>
//                     <td>{getDisplayValue(diamond.rate)}</td>
//                     <td>{getDisplayValue(diamond.details)}</td>
//                     <td>{getDisplayValue(diamond.pcs)}</td>
//                     <td>{getDisplayValue(diamond.lotNo)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Rose Cuts Table */}
//         {selectedItem?.roseCuts.length > 0 && (
//           <div className="item-roseCuts">
//             <Title text='Rose Cuts' />
//             <table className="item-table">
//               <thead>
//                 <tr>
//                   <th>Weight (cts)</th>
//                   <th>Value</th>
//                   <th>Rate</th>
//                   <th>PCS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedItem.roseCuts.map((roseCut, index) => (
//                   <tr key={index}>
//                     <td>{getDisplayValue(roseCut.weightCts)}</td>
//                     <td>{getDisplayValue(roseCut.value)}</td>
//                     <td>{getDisplayValue(roseCut.rate)}</td>
//                     <td>{getDisplayValue(roseCut.pcs)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         )}

//         {/* Polkis Table */}
//         {selectedItem?.polkis.length > 0 && (
//           <div className="item-polkis">
//             <Title text='Polkis' />
//             <table className="item-table">
//               <thead>
//                 <tr>
//                   <th>Weight (cts)</th>
//                   <th>Value</th>
//                   <th>Rate</th>
//                   <th>Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedItem.polkis.map(polki => (
//                   <tr key={polki.polkiId}>
//                     <td>{getDisplayValue(polki.weightCts)}</td>
//                     <td>{getDisplayValue(polki.value)}</td>
//                     <td>{getDisplayValue(polki.rate)}</td>
//                     <td>{getDisplayValue(polki.details)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Colored Stones Table */}
//         {selectedItem?.coloredStones.length > 0 && (
//           <div className="item-coloredStones">
//             <Title text='Colored Stones' />
//             <table className="item-table">
//               <thead>
//                 <tr>
//                   <th>Weight (cts)</th>
//                   <th>Value</th>
//                   <th>Rate</th>
//                   <th>PCS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedItem.coloredStones.map((stone, index) => (
//                   <tr key={index}>
//                     <td>{getDisplayValue(stone.weightCts)}</td>
//                     <td>{getDisplayValue(stone.value)}</td>
//                     <td>{getDisplayValue(stone.rate)}</td>
//                     <td>{getDisplayValue(stone.pcs)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BoxStock;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/stock.css';
import { Para, Title } from '../../Container/Container';
import { BoxByIDAPI,UpdateBoxAPI } from '../../Services/APIManager';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadReport from './DownloadReport';

const BoxStock = () => {
  const { boxId } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [boxData, setBoxData] = useState(null);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [boxName, setBoxName] = useState('');
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

  const filteredItems = items.filter(item => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    return (
      item.itemCode.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.goldValue.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.rCode.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.grossWtGrams.toLowerCase().includes(lowerCaseSearchTerm)
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

              </th>
              <th>Item Code</th>
              <th>R-Code</th>
              <th>Gross Weight</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={index}
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
                <td>{getDisplayValue(item.rCode)}</td>
                <td>{getDisplayValue(item.grossWtGrams)} grams</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="remove-button" onClick={handleRemoveSelectedItems}  disabled={selectedItems.size === 0}>
          Remove Selected Items
        </button>
        <DownloadReport items={items} boxName={boxName} />
        {/* <button className="download-button" items={items}>
          Download Report
        </button> */}
      </div>
      <div className="item-container">
        {selectedItem ? (
          <div className='item-top'>
            <div className="item-image-section">
              {selectedItem?.itemImages.length > 0 && (
                <img
                  src={selectedItem.itemImages[0]?.imageUrl}
                  alt={selectedItem.itemName || 'Item Image'}
                  className="item-image"
                />
              )}
            </div>
            <div className="item-details-section">
              <Title text={selectedItem?.itemName || "No Item Selected"} />
              <p><span>Item Code:</span> {getDisplayValue(selectedItem?.itemCode)}</p>
              <p><span>Department:</span> {getDisplayValue(selectedItem?.dept)}</p>
              <p><span>Silver Weight:</span> {getDisplayValue(selectedItem?.slvrWt)} grams</p>
              <p><span>Sarraf Other Weight:</span> {getDisplayValue(selectedItem?.sarrafOtherWt)}</p>
            </div>
          </div>
        ) : (
          <Para text="Select an item from the table to view details." />
        )}
        {/* Diamonds Table */}
        {selectedItem?.diamonds.length > 0 && (
          <div className="item-diamonds">
            <Title text='Diamonds' />
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
                {selectedItem.diamonds.map(diamond => (
                  <tr key={diamond.diamondId}>
                    <td>{getDisplayValue(diamond.weightCts)}</td>
                    <td>{getDisplayValue(diamond.value)}</td>
                    <td>{getDisplayValue(diamond.rate)}</td>
                    <td>{getDisplayValue(diamond.details)}</td>
                    <td>{getDisplayValue(diamond.pcs)}</td>
                    <td>{getDisplayValue(diamond.lotNo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rose Cuts Table */}
        {selectedItem?.roseCuts.length > 0 && (
          <div className="item-roseCuts">
            <Title text='Rose Cuts' />
            <table className="item-table">
              <thead>
                <tr>
                  <th>Weight (cts)</th>
                  <th>Value</th>
                  <th>Rate</th>
                  <th>PCS</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.roseCuts.map((roseCut, index) => (
                  <tr key={index}>
                    <td>{getDisplayValue(roseCut.weightCts)}</td>
                    <td>{getDisplayValue(roseCut.value)}</td>
                    <td>{getDisplayValue(roseCut.rate)}</td>
                    <td>{getDisplayValue(roseCut.pcs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

        {/* Polkis Table */}
        {selectedItem?.polkis.length > 0 && (
          <div className="item-polkis">
            <Title text='Polkis' />
            <table className="item-table">
              <thead>
                <tr>
                  <th>Weight (cts)</th>
                  <th>Value</th>
                  <th>Rate</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.polkis.map(polki => (
                  <tr key={polki.polkiId}>
                    <td>{getDisplayValue(polki.weightCts)}</td>
                    <td>{getDisplayValue(polki.value)}</td>
                    <td>{getDisplayValue(polki.rate)}</td>
                    <td>{getDisplayValue(polki.details)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Colored Stones Table */}
        {selectedItem?.coloredStones.length > 0 && (
          <div className="item-coloredStones">
            <Title text='Colored Stones' />
            <table className="item-table">
              <thead>
                <tr>
                  <th>Weight (cts)</th>
                  <th>Value</th>
                  <th>Rate</th>
                  <th>PCS</th>
                </tr>
              </thead>
              <tbody>
                {selectedItem.coloredStones.map((stone, index) => (
                  <tr key={index}>
                    <td>{getDisplayValue(stone.weightCts)}</td>
                    <td>{getDisplayValue(stone.value)}</td>
                    <td>{getDisplayValue(stone.rate)}</td>
                    <td>{getDisplayValue(stone.pcs)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </div>
  );
};

export default BoxStock;
