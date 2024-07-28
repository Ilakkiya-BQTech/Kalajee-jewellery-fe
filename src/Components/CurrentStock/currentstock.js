import React, { useState } from 'react';
import '../../Styles/stock.css';
import { Para, Title } from '../../Container/Container';

const dummyData = [
  { name: 'Earring 1', price: 10000, details: 'Details of Item 1', status: 'Available', image: 'https://www.kushals.com/cdn/shop/files/antique-earring-ruby-gold-antique-earring-153356-37651540344988.jpg?v=1710236795' },
  { name: 'Earring 2', price: 20000, details: 'Details of Item 2', status: 'Sold', image: 'https://rimli.in/cdn/shop/files/tarikaearrringsantiquenonsilverrimli01.webp?v=1703324501' },
  { name: 'Earring 3', price: 30000, details: 'Details of Item 3', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
  { name: 'Earring 4', price: 100000, details: 'Details of Item 4', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
  { name: 'Earring 5', price: 20000, details: 'Details of Item 5', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
  { name: 'Earring 6', price: 30000, details: 'Details of Item 6', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' },
  { name: 'Earring 7', price: 10000, details: 'Details of Item 7', status: 'Available', image: 'https://images-static.nykaa.com/media/catalog/product/f/1/f112fc7jwj446.jpg' },
  { name: 'Earring 8', price: 20000, details: 'Details of Item 8', status: 'Sold', image: 'https://images.cltstatic.com/media/product/350/AE00353-SS0000-antique-nanammas-temple-visit-earrings-in--silver-prd-1-model.jpg' },
  { name: 'Earring 9', price: 30000, details: 'Details of Item 9', status: 'Available', image: 'https://img.tatacliq.com/images/i11/437Wx649H/MP000000017654181_437Wx649H_202305240245571.jpeg' },
];

const CurrentStock = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = dummyData.filter(item => {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    const lowerCaseStatus = item.status.toLowerCase();
    
    if (lowerCaseSearchTerm === 'available' || lowerCaseSearchTerm === 'sold') {
      return lowerCaseStatus.includes(lowerCaseSearchTerm);
    }

    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.price.toString().includes(lowerCaseSearchTerm) ||
      lowerCaseStatus.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="stock">
      <div className="item-container">
        {selectedItem ? (
          <>
            <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
            <Title text={selectedItem.name} />
            <p><span>Price:</span> ${selectedItem.price}</p>
            <Para text={selectedItem.details} />
            <p><span>Status: </span>{selectedItem.status}</p>
          </>
        ) : (
            <p className='choose'>Select an item from the table</p>
        )}
      </div>
      <div className="table-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <table className="item-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={index}
                onClick={() => setSelectedItem(item)}
                className={selectedItem && selectedItem.name === item.name ? 'highlighted-row' : ''}
              >
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrentStock;

