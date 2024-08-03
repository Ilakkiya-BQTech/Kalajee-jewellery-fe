import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Styles/history.css";

const dummyData = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  box: `Box-${index + 1}`,
  quantity: 50,
  read: 45,
  unread: 5,
  unreadItems: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    code: `Code-${i + 1}`,
    imageUrl: `https://via.placeholder.com/50?text=Img${i + 1}`, // Placeholder image URL
  })),
}));

const TableComponent = () => {
  const navigate = useNavigate();

  const handleUnreadClick = (unreadItems) => {
    navigate('/unread', { state: { unreadItems } });
  };

  return (
    <div className='table-component'>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Box</th>
            <th>Quantity</th>
            <th>Read</th>
            <th>Unread</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.box}</td>
              <td>{item.quantity}</td>
              <td>{item.read}</td>
              <td>
             
                <button className="unread-button" onClick={() => handleUnreadClick(item.unreadItems)}>
                {item.unread}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

// import React from "react";
// import "../../Styles/history.css";

// const TableComponent = () => {
//   const data = [
//     { box: "Box 1", quantity: 50, read: 45, unread: 5 },
//     { box: "Box 2", quantity: 60, read: 54, unread: 6 },
//     { box: "Box 3", quantity: 70, read: 61, unread: 9 },
//     { box: "Box 4", quantity: 60, read: 55, unread: 5 },
//     { box: "Box 5", quantity: 70, read: 65, unread: 5 },
//   ];

//   return (
//     <div className="table-component">
//       <table>
//         <thead>
//           <tr>
//             <th>Index</th>
//             <th>Box</th>
//             <th>Quantity</th>
//             <th>Read</th>
//             <th>Unread</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.box}</td>
//               <td>{item.quantity}</td>
//               <td>{item.read}</td>
//               <td>
                
//                 <button className="unread-button">{item.unread}</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;
