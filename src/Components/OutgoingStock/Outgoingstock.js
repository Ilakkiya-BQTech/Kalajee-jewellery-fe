// import React, { useState, useEffect } from "react";
// import "../../Styles/outgoingstock.css";
// import ShowAllSelected from "./Selecteditems";
// import { FetchItemsAPI } from '../../Services/APIManager';

// const StockManager = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [showAllPage, setShowAllPage] = useState(false);
//     const [selectedRowDetails, setSelectedRowDetails] = useState(null);
//     const [items, setItems] = useState([]);
//     const rowsPerPage = 10;
    

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await FetchItemsAPI();
//             if (data && data.data) {
//                 setItems(data.data);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleSelectAllChange = (e) => {
//         const pageData = items.slice(
//             (currentPage - 1) * rowsPerPage,
//             currentPage * rowsPerPage
//         );
//         if (e.target.checked) {
//             const newSelectedRows = [
//                 ...selectedRows,
//                 ...pageData.map((row) => row.itemId).filter((id) => !selectedRows.includes(id)),
//             ];
//             setSelectedRows(newSelectedRows);
//         } else {
//             const newSelectedRows = selectedRows.filter(
//                 (id) => !pageData.map((row) => row.itemId).includes(id)
//             );
//             setSelectedRows(newSelectedRows);
//         }
//     };

//     const handleRowSelect = (id) => {
//         if (selectedRows.includes(id)) {
//             setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
//         } else {
//             setSelectedRows([...selectedRows, id]);
//         }
//     };

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const totalPages = Math.ceil(items.length / rowsPerPage);
//     const paginatedData = items.slice(
//         (currentPage - 1) * rowsPerPage,
//         currentPage * rowsPerPage
//     );

//     const renderPagination = () => {
//         const pages = [];
//         for (let i = 1; i <= totalPages; i++) {
//             pages.push(
//                 <button
//                     key={i}
//                     className={currentPage === i ? "active" : ""}
//                     onClick={() => handlePageChange(i)}
//                 >
//                     {i}
//                 </button>
//             );
//         }
//         return (
//             <div className="pagination">
//                 <button className="arrows"
//                     onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                 >
//                     &lt;
//                 </button>
//                 {pages}
//                 <button className="arrows"
//                     onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                 >
//                     &gt;
//                 </button>
//             </div>
//         );
//     };

//     const selectedData = items.filter((item) => selectedRows.includes(item.itemId));

//     if (showAllPage) {
//         return <ShowAllSelected selectedData={selectedData} onBack={() => setShowAllPage(false)} />;
//     }

//     return (
//         <div className="stock-manager">
//             <div className="exit-table-layout">
//                 <div className="exit-table-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>
//                                     <input
//                                         type="checkbox"
//                                         onChange={handleSelectAllChange}
//                                         checked={
//                                             paginatedData.every((item) => selectedRows.includes(item.itemId)) &&
//                                             paginatedData.length > 0
//                                         }
//                                     />
//                                 </th>
//                                 <th>Image</th>
//                                 <th>Code</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paginatedData.map((item) => (
//                                 <tr
//                                     key={item.itemId}
//                                     className={selectedRows.includes(item.itemId) ? "selected" : ""}
//                                     onClick={() => setSelectedRowDetails(item)}
//                                 >
//                                     <td>
//                                         <input
//                                             type="checkbox"
//                                             checked={selectedRows.includes(item.itemId)}
//                                             onChange={() => handleRowSelect(item.itemId)}
//                                         />
//                                     </td>
//                                     <td>
//                                         <img src={item.itemImages[0].imageUrl} alt={item.itemCode} width="50" />
//                                     </td>
//                                     <td>{item.itemCode}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="table-bottom">
//                         {renderPagination()}
//                         {currentPage === totalPages && selectedData.length > 0 && (
//                             <button onClick={() => setShowAllPage(true)}>
//                                 Show All Selected Items
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <div className="selected-items-container">
//                     <h3>Selected Item Details</h3>
//                     <div className="item-details-container">
//                         {selectedRowDetails ? (
//                             <div className="exit-item-details">
//                                 <img src={selectedRowDetails.itemImages[0].imageUrl} alt={selectedRowDetails.itemCode} width="100" />
//                                 <p>Code: {selectedRowDetails.itemCode}</p>
//                                 {/* <p>W-Code: {selectedRowDetails.wCode}</p>
//                                 <p>R-Code: {selectedRowDetails.rCode}</p>
//                                 <p>Item Nme: {selectedRowDetails.itemName}</p>
//                                 <p>DesignNo: {selectedRowDetails.designNo}</p> */}
//                             </div>
//                         ) : (
//                             <p>No item selected</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StockManager;


import React, { useState, useEffect } from "react";
import "../../Styles/outgoingstock.css";
import ShowAllSelected from "./Selecteditems";
import { FetchItemsAPI } from '../../Services/APIManager';

const StockManager = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAllPage, setShowAllPage] = useState(false);
    const [selectedRowDetails, setSelectedRowDetails] = useState(null);
    const [items, setItems] = useState([]);
    const rowsPerPage = 10;
    

    useEffect(() => {
        const fetchData = async () => {
            const data = await FetchItemsAPI();
            if (data && data.data) {
                setItems(data.data);
            }
        };
        fetchData();
    }, []);

    const handleSelectAllChange = (e) => {
        const pageData = items.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );
        if (e.target.checked) {
            const newSelectedRows = [
                ...selectedRows,
                ...pageData.map((row) => row.itemId).filter((id) => !selectedRows.includes(id)),
            ];
            setSelectedRows(newSelectedRows);
        } else {
            const newSelectedRows = selectedRows.filter(
                (id) => !pageData.map((row) => row.itemId).includes(id)
            );
            setSelectedRows(newSelectedRows);
        }
    };

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const totalPages = Math.ceil(items.length / rowsPerPage);
    const paginatedData = items.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={currentPage === i ? "active" : ""}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return (
            <div className="pagination">
                <button className="arrows"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {pages}
                <button className="arrows"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    const selectedData = items.filter((item) => selectedRows.includes(item.itemId));

    if (showAllPage) {
        return <ShowAllSelected selectedData={selectedData} onBack={() => setShowAllPage(false)} />;
    }

    return (
        <div className="stock-manager">
            <div className="exit-table-layout">
                <div className="exit-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAllChange}
                                        checked={
                                            paginatedData.every((item) => selectedRows.includes(item.itemId)) &&
                                            paginatedData.length > 0
                                        }
                                    />
                                </th>
                                <th>Image</th>
                                <th>Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr
                                    key={item.itemId}
                                    className={selectedRows.includes(item.itemId) ? "selected" : ""}
                                    onClick={() => setSelectedRowDetails(item)}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.itemId)}
                                            onChange={() => handleRowSelect(item.itemId)}
                                        />
                                    </td>
                                    <td>
                                        <img src={item.itemImages[0].imageUrl} alt={item.itemCode} width="50" />
                                    </td>
                                    <td>{item.itemCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="table-bottom">
                        {renderPagination()}
                        {selectedData.length > 0 && (
                            <button onClick={() => setShowAllPage(true)}>
                                Show All Selected Items
                            </button>
                        )}
                    </div>
                </div>

                <div className="selected-items-container">
                    <h3>Selected Item Details</h3>
                    <div className="item-details-container">
                        {selectedRowDetails ? (
                            <div className="exit-item-details">
                                <img src={selectedRowDetails.itemImages[0].imageUrl} alt={selectedRowDetails.itemCode} width="100" />
                                <p>Code: {selectedRowDetails.itemCode}</p>
                                {/* <p>W-Code: {selectedRowDetails.wCode}</p>
                                <p>R-Code: {selectedRowDetails.rCode}</p>
                                <p>Item Nme: {selectedRowDetails.itemName}</p>
                                <p>DesignNo: {selectedRowDetails.designNo}</p> */}
                            </div>
                        ) : (
                            <p>No item selected</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockManager;
