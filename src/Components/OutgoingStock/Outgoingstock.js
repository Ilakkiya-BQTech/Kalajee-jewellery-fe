// import React, { useState, useEffect } from "react";
// import "../../Styles/outgoingstock.css";
// import ShowAllSelected from "./Selecteditems";
// import { Subtitle } from "../../Container/Container";
// import { EnterBoxAPI } from "../../Services/APIManager";

// const StockManager = () => {
//     const [selectedOption, setSelectedOption] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [showAllPage, setShowAllPage] = useState(false);
//     const [selectedRowDetails, setSelectedRowDetails] = useState(null);
//     const [dummyData, setDummyData] = useState([]);
//     const rowsPerPage = 10;

//     const fetchEntryData = async () => {
//         try {
//             const result = await EnterBoxAPI(1, 150, [
//                 "E2003412012B170006754E15",
//                 "E2003412012F170006754FF5",
//                 "E2003412012A170006757914",
//                 "E2003412012F1700067551D0"
//             ]);
    
//             if (result.error) {
//                 console.error('Error fetching entry data:', result.error);
//                 return;
//             }
    
//             if (result) {
//                 console.log("Fetched data:", result); // Log fetched data
//                 // Handle and display the `data` field
//                 const formattedData = result.items ? result.items.map((item) => ({
//                     id: item.itemId,
//                     code: item.itemCode,
//                     imageUrl: item.itemImages.length > 0 ? item.itemImages[0].imageUrl : 'https://via.placeholder.com/50',
//                 })) : [];
//                 setDummyData(formattedData);
//             } else {
//                 console.error('No data found in the response');
//             }
//         } catch (error) {
//             console.error('Error fetching entry data:', error);
//         }
//     };
    
    

//     const handleOptionChange = (e) => {
//         setSelectedOption(e.target.value);
//         setCurrentPage(1);
//     };

//     const handleSelectAllChange = (e) => {
//         const pageData = dummyData.slice(
//             (currentPage - 1) * rowsPerPage,
//             currentPage * rowsPerPage
//         );
//         if (e.target.checked) {
//             const newSelectedRows = [
//                 ...selectedRows,
//                 ...pageData.map((row) => row.id).filter((id) => !selectedRows.includes(id)),
//             ];
//             setSelectedRows(newSelectedRows);
//         } else {
//             const newSelectedRows = selectedRows.filter(
//                 (id) => !pageData.map((row) => row.id).includes(id)
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

//     const totalPages = Math.ceil(dummyData.length / rowsPerPage);
//     const paginatedData = dummyData.slice(
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

//     const selectedData = dummyData.filter((item) => selectedRows.includes(item.id));

//     if (showAllPage) {
//         return <ShowAllSelected selectedData={selectedData} onBack={() => setShowAllPage(false)} />;
//     }

//     return (
//         <div className="stock-manager">
//             <div className="dropdown-container">
//                 <Subtitle text='Select Stock Type:' />
//                 <select
//                     id="stockType"
//                     value={selectedOption}
//                     onChange={handleOptionChange}
//                 >
//                     <option value="">-- Select an option --</option>
//                     <option value="entry">Stock Entry</option>
//                     <option value="exit">Stock Exit</option>
//                 </select>
//             </div>

//             {selectedOption && (
//                 <div className="exit-table-layout">
//                     <div className="exit-table-container">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>
//                                         <input
//                                             type="checkbox"
//                                             onChange={handleSelectAllChange}
//                                             checked={
//                                                 paginatedData.every((item) => selectedRows.includes(item.id)) &&
//                                                 paginatedData.length > 0
//                                             }
//                                         />
//                                     </th>
//                                     <th>Image</th>
//                                     <th>Code</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paginatedData.map((item) => (
//                                     <tr
//                                         key={item.id}
//                                         className={selectedRows.includes(item.id) ? "selected" : ""}
//                                         onClick={() => setSelectedRowDetails(item)}
//                                     >
//                                         <td>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedRows.includes(item.id)}
//                                                 onChange={() => handleRowSelect(item.id)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <img src={item.imageUrl} alt={item.code} width="50" />
//                                         </td>
//                                         <td>{item.code}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <div className="table-bottom">
//                             {renderPagination()}
//                             {currentPage === totalPages && selectedData.length > 0 && (
//                                 <button onClick={() => setShowAllPage(true)}>
//                                     Show All Selected Items
//                                 </button>
//                             )}
//                         </div>
//                     </div>

//                     <div className="selected-items-container">
//                         <h3>Selected Item Details</h3>
//                         <div className="item-details-container">
//                             {selectedRowDetails ? (
//                                 <div className="exit-item-details">
//                                     <img src={selectedRowDetails.imageUrl} alt={selectedRowDetails.code} width="100" />
//                                     <p>Code: {selectedRowDetails.code}</p>
//                                 </div>
//                             ) : (
//                                 <p>No item selected</p>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StockManager;



import React, { useState } from "react";
import "../../Styles/outgoingstock.css";
import ShowAllSelected from "./Selecteditems";
import { Subtitle, Title } from "../../Container/Container";

const dummyData = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    code: `Code-${index + 1}`,
    imageUrl: `https://via.placeholder.com/50?text=Img${index + 1}`, // Placeholder image URL
}));

const StockManager = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [showAllPage, setShowAllPage] = useState(false);
    const [selectedRowDetails, setSelectedRowDetails] = useState(null); // New state for row details
    const rowsPerPage = 10;

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setCurrentPage(1);
    };

    const handleSelectAllChange = (e) => {
        const pageData = dummyData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );
        if (e.target.checked) {
            const newSelectedRows = [
                ...selectedRows,
                ...pageData.map((row) => row.id).filter((id) => !selectedRows.includes(id)),
            ];
            setSelectedRows(newSelectedRows);
        } else {
            const newSelectedRows = selectedRows.filter(
                (id) => !pageData.map((row) => row.id).includes(id)
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

    const totalPages = Math.ceil(dummyData.length / rowsPerPage);
    const paginatedData = dummyData.slice(
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

    const selectedData = dummyData.filter((item) => selectedRows.includes(item.id));

    if (showAllPage) {
        return <ShowAllSelected selectedData={selectedData} onBack={() => setShowAllPage(false)} />;
    }

    return (
        <div className="stock-manager">
            <div className="dropdown-container">
                <Subtitle text='Select Stock Type:' />
                {/* <label htmlFor="stockType">Select Stock Type:</label> */}
                <select
                    id="stockType"
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="">-- Select an option --</option>
                    <option value="entry">Stock Entry</option>
                    <option value="exit">Stock Exit</option>
                </select>
            </div>

            {selectedOption && (
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
                                                paginatedData.every((item) => selectedRows.includes(item.id)) &&
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
                                        key={item.id}
                                        className={selectedRows.includes(item.id) ? "selected" : ""}
                                        onClick={() => setSelectedRowDetails(item)}
                                    >
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleRowSelect(item.id)}
                                            />
                                        </td>
                                        <td>
                                            <img src={item.imageUrl} alt={item.code} width="50" />
                                        </td>
                                        <td>{item.code}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="table-bottom">
                        {renderPagination()}
                        {currentPage === totalPages && selectedData.length > 0 && (
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
                                    <img src={selectedRowDetails.imageUrl} alt={selectedRowDetails.code} width="100" />
                                    <p>Code: {selectedRowDetails.code}</p>
                                </div>
                            ) : (
                                <p>No item selected</p>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default StockManager;
