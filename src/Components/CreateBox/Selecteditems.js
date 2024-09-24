// import React, { useState, useEffect } from "react";
// import "../../Styles/outgoingstock.css";
// import { AllBoxesAPI, CreateBoxAPI, DownloadPrice } from '../../Services/APIManager';
// import { Title } from "../../Container/Container";
// import { useLocation } from 'react-router-dom';

// const ShowAllSelected = ({ selectedData, onBack }) => {
//   const [parent, setParent] = useState("");
//   const [description, setDescription] = useState("");
//   const [parentBoxes, setParentBoxes] = useState([]);
//   const { pathname } = useLocation();
  
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     const fetchParentBoxes = async () => {
//       const result = await AllBoxesAPI();
//       if (result && result.data) {
//         const parents = result.data.filter(box => box.boxType === 'parent');
//         setParentBoxes(parents);
//       }
//     };

//     fetchParentBoxes();
//   }, []);

//   const handleConfirm = async () => {
//     const parentId = parent === "" ? 0 : parent;
//     const itemIds = selectedData.map(item => item.itemId);
//     const boxDescription = description;

//     const result = await CreateBoxAPI(parentId, itemIds, boxDescription);

//     if (result.error) {
//       alert("Failed to create box: " + result.error);
//     } else {
//       alert("Box created successfully!");
//     }
//   };

//   const handleDownloadPrice = async () => {
//     const itemIds = selectedData.map(item => item.itemId);
//     const result = await DownloadPrice(itemIds);

//     if (result.error) {
//       alert("Failed to download price: " + result.error);
//     } else {
//       const url = window.URL.createObjectURL(result);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'prices.pdf';
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
//       alert("Price downloaded successfully!");
//     }
//   };

//   return (
//     <div className="show-all-selected">
//       <Title text='All Selected Items'/>
      
//       <div className="input-fields">
//         <label>
//           Parent:
//           <select value={parent} onChange={(e) => setParent(e.target.value)}>
//             <option value="">No parent</option>
//             {parentBoxes.map(box => (
//               <option key={box.boxId} value={box.boxId}>
//                 {box.boxId} | {box.boxDescription}
//               </option>
//             ))}
//           </select>
//         </label>
    
//         <label>
//           Description:
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}  
//             cols={50}  
//             style={{ resize: 'vertical' }}  
//           />
//         </label>
//         <button className="price" onClick={handleDownloadPrice}>Download Price</button>
//       </div>
//       {selectedData.length === 0 && <p>No items selected</p>}
//       {selectedData.length > 0 && (
//     <table>
//         <thead>
//             <tr>
//                 <th>No.</th>
//                 <th>Image</th>
//                 <th>Code</th>
//             </tr>
//         </thead>
//         <tbody>
//             {selectedData.map((item, index) => (
//                 <tr key={item.itemId}>
//                     <td>{index + 1}</td>
//                     <td>
//                         <img src={item.itemImages[0].imageUrl} alt={item.itemCode} width="50" />
//                     </td>
//                     <td>{item.itemCode}</td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// )}

//       <div className="bottom-button">
//         <button onClick={onBack}>Back</button>
//         {selectedData.length > 0 && <button onClick={handleConfirm}>Confirm</button>}
//       </div>
//     </div>
//   );
// };

// export default ShowAllSelected;

import React, { useState, useEffect } from "react";
import "../../Styles/outgoingstock.css";
import { AllBoxesAPI, CreateBoxAPI, DownloadPrice } from '../../Services/APIManager';
import { Title } from "../../Container/Container";
import { useLocation } from 'react-router-dom';

const ShowAllSelected = ({ selectedData, onBack }) => {
  const [parent, setParent] = useState("");
  const [description, setDescription] = useState("");
  const [parentBoxes, setParentBoxes] = useState([]);
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchParentBoxes = async () => {
      const result = await AllBoxesAPI();
      if (result && result.data) {
        const parents = result.data.filter(box => box.boxType === 'parent');
        setParentBoxes(parents);
      }
    };

    fetchParentBoxes();
  }, []);
  const handleConfirm = async () => {
    const parentId = parent === "" ? 0 : parent;
    const itemIds = selectedData.map(item => item.itemId);
    const boxDescription = description;
  
    console.log('Creating box with:', { parentId, itemIds, boxDescription });
  
    const result = await CreateBoxAPI(parentId, itemIds, boxDescription);
  
    if (result.error) {
      alert("Failed to create box: " + result.error);
    } else {
      alert("Box created successfully!");
    }
  };
  const handleDownloadPrice = async () => {
    const itemIds = selectedData.map(item => item.itemId);
    const result = await DownloadPrice(itemIds);

    if (result.error) {
      alert("Failed to download price: " + result.error);
    } else {
      const url = window.URL.createObjectURL(result);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prices.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      alert("Price downloaded successfully!");
    }
  };

    

  return (
    <div className="show-all-selected">
      <Title text='All Selected Items'/>
      
      <div className="input-fields">
        <label>
          Parent:
          <select value={parent} onChange={(e) => setParent(e.target.value)} >
            <option value="">No parent</option>
            {parentBoxes.map(box => (
              <option key={box.boxId} value={box.boxId}>
                {box.boxId} | {box.boxDescription}
              </option>
            ))}
          </select>
        </label>
    
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}  
            cols={50}  
            style={{ resize: 'vertical' }}  
          />
        </label>
        <button className="price" onClick={handleDownloadPrice} >Download Price</button>
      </div>

      {selectedData.length === 0 && <p>No items selected</p>}
      {selectedData.length > 0 && (
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Image</th>
        <th>Code</th>
      </tr>
    </thead>
    <tbody>
      {selectedData.map((item, index) => (
        <tr key={item.itemId}>
          <td>{index + 1}</td>
          <td>
            
            {item.images && item.images.length > 0 ? (
              <img src={item.images[0]?.imageUrl} alt={item.itemCode} width="50" />
            ) : (
              <span>No Image</span>
            )}
          </td>
          <td>{item.itemCode}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      <div className="bottom-button">
        <button onClick={onBack}>Back</button>
        {selectedData.length > 0 && <button onClick={handleConfirm}>Confirm</button>}
      </div>
    </div>
  );
};

export default ShowAllSelected;
