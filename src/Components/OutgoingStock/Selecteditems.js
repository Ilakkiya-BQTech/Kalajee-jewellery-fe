import React from "react";
import "../../Styles/outgoingstock.css";

const ShowAllSelected = ({ selectedData, onBack }) => {
  return (
    <div className="show-all-selected">
      <h3>All Selected Items</h3>
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
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.imageUrl} alt={item.code} width="50" />
                </td>
                <td>{item.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="bottom-button">
      <button onClick={onBack}>Back</button>
      {selectedData.length > 0 && <button>Confirm</button>}
      </div>
    </div>
  );
};

export default ShowAllSelected;

