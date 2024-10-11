import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Styles/vendor.css';
import { Title } from '../../Container/Container';

const ItemDetailPage = () => {
  const location = useLocation();
  const { item } = location.state;

  const getDisplayValue = (value) => (value === null || value === undefined ? '-' : value);
  const formatNumber = (number) => number?.toLocaleString() || '-'; // Assuming you have this function for formatting numbers

  return (
    <div className='live-item'>
      <div className="live-item-container">
        {item ? (
          <>
            <div className="item-top">
              <div className="item-image-section">
                {item?.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]?.imageUrl || 'placeholder.jpg'}
                    alt={item.itemName || 'Jewelry Image'}
                    className="itemdetail-img"
                  />
                )}

              </div>

              <div className="item-details-section">
                <Title text={item?.itemName || "No Item Selected"} />
                <p><span>Item Code:</span> {getDisplayValue(item?.itemCode)}</p>
                <p><span>Department:</span> {getDisplayValue(item?.department)}</p>
                <p><span>Silver Weight:</span> {getDisplayValue(item?.slvrWt)} grams</p>
                <p><span>Other Weight:</span> {getDisplayValue(item?.sarrafOtherWt)}</p>
              </div>
            </div>

            {/* Prices Table */}
            {item?.prices && (
              <div className="item-prices">
                <Title text='Prices' />
                <div className="table-scroll">
                  <table className="item-table">
                    <thead>
                      <tr>
                        <th>Gold Price</th>
                        <th>Silver Price</th>
                        <th>Wholesale Price</th>
                        <th>Retail Price</th>
                        <th>GST Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatNumber(item.prices.goldPrice)}</td>
                        <td>{formatNumber(item.prices.silverPrice)}</td>
                        <td>{formatNumber(item.prices.wholesalePrice)}</td>
                        <td>{formatNumber(item.prices.retailPrice)}</td>
                        <td>{formatNumber(item.prices.gstPrice)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Diamonds Table */}
            {item?.diamonds && item.diamonds.length > 0 && (
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
                      {item.diamonds.map((diamond, index) => (
                        <tr key={diamond.diamondId || index}>
                          <td>{formatNumber(diamond.weightCts)}</td>
                          <td>{getDisplayValue(diamond.value)}</td>
                          <td>{formatNumber(diamond.rate)}</td>
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
            {item?.roseCuts && item.roseCuts.length > 0 && (
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
                      {item.roseCuts.map((roseCut, index) => (
                        <tr key={index}>
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
            {item?.polkis && item.polkis.length > 0 && (
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
                      {item.polkis.map(polki => (
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

            {/* Colored Stones Table */}
            {item?.coloredStones && item.coloredStones.length > 0 && (
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
                      {item.coloredStones.map((coloredStone, index) => (
                        <tr key={coloredStone.coloredStoneId || index}>
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

            {/* Gold Table */}
            {item?.gold && item.gold.length > 0 && (
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
                      {item.gold.map(gold => (
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
          </>
        ) : (
          <p>Select an item from the table to view details.</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetailPage;

