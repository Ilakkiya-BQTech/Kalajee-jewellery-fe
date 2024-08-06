// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../../Styles/history.css";
// import { StockHistoryAPI } from '../../Services/APIManager';

// const TableComponent = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await StockHistoryAPI();
        
//         if (result && result.data) {
//           // Check if result.data is an array
//           if (Array.isArray(result.data)) {
//             const formattedData = result.data.map(item => ({
//               id: item.countId,
//               boxId: item.boxId,
//               totalItems: item.totalItems,
//               totalRead: item.totalRead,
//               totalUnread: item.totalUnread,
//               unreadItems: item.unreadItemIds.map(id => ({
//                 id,
//                 code: `Code-${id}`,
//                 imageUrl: `https://via.placeholder.com/50?text=Img${id}` // Placeholder image URL
//               }))
//             }));
//             setData(formattedData);
//           } else {
//             console.error('API response is not an array:', result.data);
//           }
//         } else {
//           console.error('API response is missing data:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleUnreadClick = (unreadItems) => {
//     navigate('/unread', { state: { unreadItems } });
//   };

//   return (
//     <div className='table-component'>
//       <table>
//         <thead>
//           <tr>
//             <th>Box ID</th>
//             <th>Total Items</th>
//             <th>Total Read</th>
//             <th>Total Unread</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.boxId}</td>
//               <td>{item.totalItems}</td>
//               <td>{item.totalRead}</td>
//               <td>
//                 <button className="unread-button" onClick={() => handleUnreadClick(item.unreadItems)}>
//                   {item.totalUnread}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../../Styles/history.css";
// import { StockHistoryAPI } from '../../Services/APIManager';

// const TableComponent = () => {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await StockHistoryAPI();
        
//         if (result && result.data) {
//           if (Array.isArray(result.data)) {
//             const formattedData = result.data.map(item => ({
//               id: item.countId,
//               boxId: item.boxId,
//               totalItems: item.totalItems,
//               totalRead: item.totalRead,
//               totalUnread: item.totalUnread,
//               unreadItemIds: item.unreadItemIds.map(id => ({
//                 id,
//                 code: `Code-${id}`,
//                 imageUrl: `https://via.placeholder.com/50?text=Img${id}` 
//               }))
//             }));
//             setData(formattedData);
//           } else {
//             console.error('API response is not an array:', result.data);
//           }
//         } else {
//           console.error('API response is missing data:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleUnreadClick = (unreadItemIds) => {
//     navigate('/unread', { state: { unreadItemIds } });
//   };

//   return (
//     <div className='table-component'>
      
//       <table>
//         <thead>
//           <tr>
//             <th>Box ID</th>
//             <th>Total Items</th>
//             <th>Total Read</th>
//             <th>Total Unread</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.boxId}</td>
//               <td>{item.totalItems}</td>
//               <td>{item.totalRead}</td>
//               <td>
//                 <button className="unread-button" onClick={() => handleUnreadClick(item.unreadItemIds.map(i => i.id))}>
//                   {item.totalUnread}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Styles/history.css";
import { StockHistoryAPI } from '../../Services/APIManager';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await StockHistoryAPI();
        if (result && result.data) {
          if (Array.isArray(result.data)) {
            const formattedData = result.data.map(item => ({
              id: item.countId,
              boxId: item.boxId,
              totalItems: item.totalItems,
              totalRead: item.totalRead,
              totalUnread: item.totalUnread,
              createdAt: new Date(item.createdAt).toLocaleString(),
              unreadItemIds: item.unreadItemIds.map(id => ({
                id,
                code: `Code-${id}`,
                imageUrl: `https://via.placeholder.com/50?text=Img${id}`
              }))
            }));
            setData(formattedData);
          } else {
            console.error('API response is not an array:', result.data);
          }
        } else {
          console.error('API response is missing data:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUnreadClick = (unreadItemIds) => {
    navigate('/unread', { state: { unreadItemIds } });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 3;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

    if (currentPage <= halfMaxPagesToShow) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className='table-component'>
      <table>
        <thead>
          <tr>
            <th>Box ID</th>
            <th>Total Items</th>
            <th>Created At</th>
            <th>Total Read</th>
            <th>Total Unread</th>
          
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.boxId}</td>
              <td>{item.totalItems}</td>
              <td>{item.createdAt}</td> 
              <td>{item.totalRead}</td>
              <td>
                <button className="unread-button" onClick={() => handleUnreadClick(item.unreadItemIds.map(i => i.id))}>
                  {item.totalUnread}
                </button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="arrows"
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="arrows"
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TableComponent;

