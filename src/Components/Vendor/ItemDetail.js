import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Styles/vendor.css'; 
import {Title} from '../../Container/Container'
const ItemDetailPage = () => {
  const location = useLocation();
  const { item } = location.state;  // Get the selected item from the location state
  const getDisplayValue = (value) => (value === null || value === undefined ? '-' : value);
  return (
    <div className='live-item'>
    <div className="item-detail-page">
      <div className="item-image-section">
        <img
          src={item.itemImages[0]?.imageUrl || 'placeholder.jpg'}
          alt={item.itemName || 'Jewelry'}
          className="detail-item-image"
        />
      </div>

      <div className="item-details-section">
        <h2>{item.itemName || 'Jewelry Details'}</h2>
        <p><strong>Item Code:</strong> {item.itemCode}</p>
        <p><strong>Gross Weight:</strong> {item.grossWtGrams} grams</p>
        <p><strong>Silver Weight:</strong> {item.slvrWt} grams</p>
        <p><strong>Other Weight:</strong> {item.sarrafOtherWt}</p>
        </div>
        </div>
        <div className='table-itemdetails'>
        {item?.diamonds.length > 0 && (
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
                  {item.diamonds.map(diamond => (
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
        {item?.roseCuts.length > 0 && (
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
                  {item.roseCuts.map((roseCut, index) => (
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
        {item?.polkis.length > 0 && (
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
                  {item.polkis.map(polki => (
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
        {item?.coloredStones.length > 0 && (
          <div className="item-coloredStones">
            <Title text='Colored Stones'/>
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
                  {item.coloredStones.map(coloredStone => (
                    <tr key={coloredStone.coloredStoneId}>
                      <td>{getDisplayValue(coloredStone.weightCts)}</td>
                      <td>{getDisplayValue(coloredStone.value)}</td>
                      <td>{getDisplayValue(coloredStone.rate)}</td>
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

export default ItemDetailPage;
