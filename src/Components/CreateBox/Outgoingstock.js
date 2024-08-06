
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
    const [allItems, setAllItems] = useState([]);
    const rowsPerPage = 10;
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const fetchData = async (limit, page) => {
        const data = await FetchItemsAPI(limit, page);
        if (data && data.data) {
            const newItems = data.data.filter(
                (item) => !allItems.some((existingItem) => existingItem.itemId === item.itemId)
            );
            setItems(data.data);
            setAllItems((prevItems) => [...prevItems, ...newItems]);
            return data.data.length;
        }
        return 0;
    };

    useEffect(() => {
        fetchData(limit, page);
    }, [limit, page]);

    const handleSelectAllChange = (e) => {
        const pageData = items.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );
        if (pageData.length > 0) {
            if (e.target.checked) {
                const newSelectedRows = [
                    ...selectedRows,
                    ...pageData.map((row) => row.itemId).filter((id) => !selectedRows.includes(id)),
                ];
                setSelectedRows([...new Set(newSelectedRows)]);
            } else {
                const newSelectedRows = selectedRows.filter(
                    (id) => !pageData.map((row) => row.itemId).includes(id)
                );
                setSelectedRows(newSelectedRows);
            }
        }
    };

    const handleRowSelect = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...new Set([...selectedRows, id])]);
        }
    };

    const handlePageChange = async (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const totalPages = Math.ceil(allItems.length / rowsPerPage);
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
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {pages}
                <button className="arrows"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        );
    };

    const selectedData = [...new Map(allItems.filter(item => selectedRows.includes(item.itemId)).map(item => [item.itemId, item])).values()];

    if (showAllPage) {
        return <ShowAllSelected selectedData={selectedData} onBack={() => setShowAllPage(false)} />;
    }

    const handleNextPage = async () => {
        const nextPage = page + 1;
        const itemCount = await fetchData(limit, nextPage);
        if (itemCount > 0) {
            setPage(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

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
                                        <img src={item.itemImages[0]?.imageUrl} alt={item.itemCode} width="50" />
                                    </td>
                                    <td>{item.itemCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination-controls">
                        <button onClick={handlePreviousPage} disabled={page === 1}>
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button onClick={handleNextPage} disabled={items.length < limit}>
                            Next
                        </button>
                        {selectedRows.length > 0 && (
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
                                <img src={selectedRowDetails.itemImages[0]?.imageUrl} alt={selectedRowDetails.itemCode} width="100" />
                                <p>Code: {selectedRowDetails.itemCode}</p>
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

