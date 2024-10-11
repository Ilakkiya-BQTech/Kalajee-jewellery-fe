import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/vendor.css';
import { FetchItemsAPI } from '../../Services/APIManager';

const VendorPage = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(50); 
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchItemsAPI(limit, page);
        if (data && data.data) {
          setItems(data.data);
          setTotalItems(data.totalItems || 50);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchData();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [limit, page]);

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const itemCount = prevCart[item.itemId] ? prevCart[item.itemId].count + 1 : 1;
      const newCart = {
        ...prevCart,
        [item.itemId]: {
          ...item,
          count: itemCount,
        },
      };
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  // Calculate total cart items
  const totalCartItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);

  // Function to handle the item click to navigate to the detail page
  const handleItemClick = (item) => {
    navigate(`/item-detail`, { state: { item } });
  };

  const filteredItems = items.filter(
    (item) =>
      (item.itemCode && item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.rCode && item.rCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewCart = () => {
    navigate('/cart', { state: { selectedData: Object.values(cart) } });
  };

  return (
    <div className="vendor-page">
      <div className="vendor-header">
        <input
          type="text"
          placeholder="Search Jewellery..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <button className="cart-button" onClick={handleViewCart}>
          Cart ({totalCartItems})
        </button>
      </div>

      <div className="vendor-content">
        <div className="items-section">
          <div className="items-grid">
            {filteredItems.map((item) => (
              <div
                key={item.itemId}
                className="item-card"
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.images[0]?.imageUrl || 'placeholder.jpg'}
                  alt={item.itemName || 'Jewelry Image'}
                  className="vendor-item-image"
                />
                <p>{item.itemCode}</p>
                <button
                  className="add-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;
