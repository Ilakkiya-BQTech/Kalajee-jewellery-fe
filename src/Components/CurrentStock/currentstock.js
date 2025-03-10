// import React from 'react';
// import '../../Styles/stock.css';
// import TableWithSearchAndPagination from '../../Container/FetchAllItems/FetchallItem';

// const CurrentStock = () => {
//     return (
//         <div className="stock">
//             <TableWithSearchAndPagination type="CurrentStock" />
//         </div>
//     );
// };

// export default CurrentStock;



import React, { useState, useEffect } from 'react';
import '../../Styles/stock.css';
import { Para, Subtitle, Title } from '../../Container/Container';
import { FetchItemsAPI } from '../../Services/APIManager';

const CurrentStock = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(10); 
  const [page, setPage] = useState(1); 
  const [totalItems, setTotalItems] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchItemsAPI(limit, page);
        if (data && data.data) {
          setItems(data.data);
          setTotalItems(data.totalItems || 50); 
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, [limit, page]);

 
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const formatNumber = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
};

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const getDisplayValue = (value) => (value === null || value === undefined ? '-' : value);

  return (
    <div className="stock">
      <div className="table-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <table className="item-tables">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>R-Code</th>
              <th>Gross Weight</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                onClick={() => setSelectedItem(item)}
                className={
                  selectedItem && selectedItem.itemId === item.itemId ? 'highlighted-row' : ''
                }
              >
                <td>{getDisplayValue(item.itemCode)}</td>
                <td>{getDisplayValue(item.prices.rCode)}</td>
                <td>{getDisplayValue(item.grossWeightGrams)} grams</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="arrows"
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            &lt;
          </button>
          {getPageNumbers().map((pg) => (
            <button
              key={pg}
              className={page === pg ? 'active' : ''}
              onClick={() => handlePageChange(pg)}
            >
              {pg}
            </button>
          ))}
          <button
            className="arrows"
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
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
                                        {/* <th>Labour Price</th> */}
                                        <th>Wholesale Price</th>
                                        <th>Retail Price</th>
                                        <th>GST Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{formatNumber(selectedItem.prices.goldPrice)}</td>
                                        <td>{formatNumber(selectedItem.prices.silverPrice)}</td>
                                        {/* <td>{formatNumber(selectedItem.prices.labourPrice)}</td> */}
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
                                    {selectedItem.diamonds.map((diamond, index) => (
                                        <tr key={index}>
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
                                        <th>PCS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItem.roseCuts.map((roseCut, index) => (
                                        <tr key={roseCut.id || index}>
                                            <td>{formatNumber(roseCut.weightCts)}</td>
                                            <td>{formatNumber(roseCut.value)}</td>
                                            <td>{formatNumber(roseCut.rate)}</td>
                                            <td>{getDisplayValue(roseCut.pcs)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
    
                {/* Polkis Table */}
                {selectedItem?.polkis && selectedItem.polkis.length > 0 && (
                    <div className="item-polkis">
                        <Title text='Polkis' />
                        <div className="table-scroll">
                            <table className="item-table">
                                <thead>
                                    <tr>
                                        <th>Weight (cts)</th>
                                        <th>Value</th>
                                        <th>Rate</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItem.polkis.map(polki => (
                                        <tr key={polki.polkiTypeId}>
                                            <td>{formatNumber(polki.polkiWeightCarat)}</td>
                                            <td>{getDisplayValue(polki.polkiTypeName)}</td>
                                            <td>{formatNumber(polki.polkiTypeRate)}</td>
                                            <td>{getDisplayValue(polki.polkiTypeCategory)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
    
                {/* Gold Table */}
                {selectedItem?.gold && selectedItem.gold.length > 0 && (
                    <div className="item-gold">
                        <Title text='Gold' />
                        <div className="table-scroll">
                            <table className="item-table">
                                <thead>
                                    <tr>
                                        <th>Gold Type</th>
                                        <th>Weight (grams)</th>
                                        <th>Rate (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItem.gold.map(gold => (
                                        <tr key={gold.goldTypeId}>
                                            <td>{getDisplayValue(gold.goldTypeName)}</td>
                                            <td>{formatNumber(gold.goldWeightGrams)}</td>
                                            <td>{formatNumber(gold.goldTypeRatePercent)}</td>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedItem.coloredStones.map(coloredStone => (
                                        <tr key={coloredStone.coloredStoneId || coloredStone.weightCts}>
                                            <td>{formatNumber(coloredStone.weightCts)}</td>
                                            <td>{formatNumber(coloredStone.value)}</td>
                                            <td>{formatNumber(coloredStone.rate)}</td>
                                            <td>{getDisplayValue(coloredStone.details)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
    
                
            </div>
    </div>
  );
};

export default CurrentStock;


