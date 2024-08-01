import React, { useState, useEffect } from 'react';
import '../../Styles/stock.css';
import { Para, Subtitle, Title } from '../../Container/Container';
import { FetchItemsAPI } from '../../Services/APIManager';

const CurrentStock = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchItemsAPI();
      if (data && data.data) { 
        setItems(data.data);
      }
    };
    fetchData();
  }, []);

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
                <th>Item Code</th>
                {/* <th>Gold Value</th> */}
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
                  <td>{getDisplayValue(item.itemCode)}</td>
                  {/* <td>{getDisplayValue(item.goldValue)}</td> */}
                  <td>{getDisplayValue(item.rCode)}</td>
                  <td>{getDisplayValue(item.grossWtGrams)} grams</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* <div className="container"> */}
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
                <p><span>Other Weight:</span> {getDisplayValue(selectedItem?.sarrafOtherWt)}</p>
              </div>
            </div>
          ) : (
            <Para text="Select an item from the table to view details." />
          )}

          {/* Diamonds Table */}
          {selectedItem?.diamonds.length > 0 && (
            <div className="item-diamonds">
               <Title text='Diamonds'/>
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
            </div>
          )}

          {/* Rose Cuts Table */}
          {selectedItem?.roseCuts.length > 0 && (
            <div className="item-roseCuts">
              <Title text='Rose Cuts'/>
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
            </div>
          )}

          {/* Polkis Table */}
          {selectedItem?.polkis.length > 0 && (
            <div className="item-polkis">
               <Title text='Polkis'/>
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
            </div>
          )}

          {/* Colored Stones Table */}
          {selectedItem?.coloredStones.length > 0 && (
            <div className="item-coloredStones">
               <Title text='Colored Stones'/>
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
            </div>
          )}
        </div>

        
      {/* </div> */}
    </div>
  );
};

export default CurrentStock;
