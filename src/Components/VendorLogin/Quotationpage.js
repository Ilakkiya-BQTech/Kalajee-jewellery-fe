import React, { useState, useEffect } from "react";
import "../../Styles/outgoingstock.css";
import { Title } from "../../Container/Container";
import { useLocation } from 'react-router-dom';

const CartPage = ({ items, onRemove }) => {
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || {});
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Function to confirm the cart items
  const handleConfirm = () => {
    // Logic for confirming the cart items
    alert("Items confirmed successfully!"); // Placeholder
  };

  const handleRemove = (itemId) => {
    // Remove item from cartItems
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId]; // Remove the item from the object
    setCartItems(updatedCart); // Update the state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const cartItemsArray = Object.values(cartItems); // Convert cart object to array

  return (
    <div className="selected-vendoritems">
      <Title text='All Selected Items' />

      {cartItemsArray.length === 0 && <p>No items in the cart</p>}
      {cartItemsArray.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Code</th>
              <th>Count</th>
              <th>Action</th> {/* Add Action column */}
            </tr>
          </thead>
          <tbody>
            {cartItemsArray.map((item, index) => (
              <tr key={item.itemId}>
                <td>{index + 1}</td>
                <td>
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]?.imageUrl} alt={item.itemCode} width="50" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{item.itemCode}</td>
               
                <td>
                  <button onClick={() => handleRemove(item.itemId)}>Remove</button> {/* Remove button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="bottom-button">
        {cartItemsArray.length > 0 && <button onClick={handleConfirm}>Download Quotation</button>}
      </div>
    </div>
  );
};

export default CartPage;
