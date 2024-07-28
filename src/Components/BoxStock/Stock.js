import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/stock.css';
import { Para, Title } from '../../Container/Container';

const initialData = {
  1: [
    { id: 1, name: 'Earring 1', price: 10000, details: 'Details of Item 1', status: 'Available', image: 'https://www.kushals.com/cdn/shop/files/antique-earring-ruby-gold-antique-earring-153356-37651540344988.jpg?v=1710236795' },
    { id: 2, name: 'Earring 2', price: 20000, details: 'Details of Item 2', status: 'Sold', image: 'https://rimli.in/cdn/shop/files/tarikaearrringsantiquenonsilverrimli01.webp?v=1703324501' },
    { id: 3, name: 'Earring 3', price: 30000, details: 'Details of Item 3', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
    { id: 4, name: 'Earring 4', price: 100000, details: 'Details of Item 4', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
    { id: 5, name: 'Earring 5', price: 20000, details: 'Details of Item 5', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
    { id: 6, name: 'Earring 6', price: 30000, details: 'Details of Item 6', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' },
    { id: 7, name: 'Earring 7', price: 30000, details: 'Details of Item 7', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
    { id: 8, name: 'Earring 8', price: 100000, details: 'Details of Item 8', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
    { id: 9, name: 'Earring 9', price: 20000, details: 'Details of Item 9', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
    { id: 10, name: 'Earring 10', price: 30000, details: 'Details of Item 10', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' }
  ],
  2: [
    { id: 1, name: 'Earring 1', price: 10000, details: 'Details of Item 1', status: 'Available', image: 'https://www.kushals.com/cdn/shop/files/antique-earring-ruby-gold-antique-earring-153356-37651540344988.jpg?v=1710236795' },
    { id: 2, name: 'Earring 2', price: 20000, details: 'Details of Item 2', status: 'Sold', image: 'https://rimli.in/cdn/shop/files/tarikaearrringsantiquenonsilverrimli01.webp?v=1703324501' },
    { id: 3, name: 'Earring 3', price: 30000, details: 'Details of Item 3', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
    { id: 4, name: 'Earring 4', price: 100000, details: 'Details of Item 4', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
    { id: 5, name: 'Earring 5', price: 20000, details: 'Details of Item 5', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
    { id: 6, name: 'Earring 6', price: 30000, details: 'Details of Item 6', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' },
    { id: 7, name: 'Earring 7', price: 30000, details: 'Details of Item 7', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
    { id: 8, name: 'Earring 8', price: 100000, details: 'Details of Item 8', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
    { id: 9, name: 'Earring 9', price: 20000, details: 'Details of Item 9', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
    { id: 10, name: 'Earring 10', price: 30000, details: 'Details of Item 10', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' }
  ],
};

const Stock = () => {
  const { boxId } = useParams();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setData(initialData[boxId] || []);
  }, [boxId]);

  const filteredItems = data.filter(item => {
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

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item.id)) {
      setSelectedItems(selectedItems.filter(selectedId => selectedId !== item.id));
    } else {
      setSelectedItems([...selectedItems, item.id]);
    }
  };

  const handleRemoveItems = () => {
    const remainingItems = data.filter(item => !selectedItems.includes(item.id));
    setData(remainingItems);
    setSelectedItem(null);
    setSelectedItems([]);
  };

  const handleDownloadReport = () => {
    const headers = ['Item Name', 'Price', 'Status'];
    const rows = filteredItems.map(item => [item.name, item.price, item.status]);

    let csvContent = 'data:text/csv;charset=utf-8,'
      + headers.join(',') + '\n'
      + rows.map(row => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'stock_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <th></th>
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
                className={selectedItem && selectedItem.id === item.id ? 'highlighted-row' : ''}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(item);
                    }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleRemoveItems} disabled={selectedItems.length === 0} className="remove-button">
          Remove Selected Items
        </button>
        <button onClick={handleDownloadReport} className="download-button">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Stock;



// import React, { useState } from 'react';
// import '../../Styles/stock.css';
// import { Para, Title } from '../../Container/Container';

// const dummyData = [
//   { name: 'Earring 1', price: 10000, details: 'Details of Item 1', status: 'Available', image: 'https://www.kushals.com/cdn/shop/files/antique-earring-ruby-gold-antique-earring-153356-37651540344988.jpg?v=1710236795' },
//   { name: 'Earring 2', price: 20000, details: 'Details of Item 2', status: 'Sold', image: 'https://rimli.in/cdn/shop/files/tarikaearrringsantiquenonsilverrimli01.webp?v=1703324501' },
//   { name: 'Earring 3', price: 30000, details: 'Details of Item 3', status: 'Available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtN-TTSfKAOWO2xnhv5L-4tImm1C10e_0tPg&s' },
//   { name: 'Earring 4', price: 100000, details: 'Details of Item 4', status: 'Available', image: 'https://5.imimg.com/data5/ANDROID/Default/2023/3/292648741/NP/AN/AQ/3210993/product-jpeg-250x250.jpg' },
//   { name: 'Earring 5', price: 20000, details: 'Details of Item 5', status: 'Sold', image: 'https://gehnashop.com/cdn/shop/files/exclusive-antique-gold-plated-golden-chandbali-earrings-for-women-by-gehna-shop-gehna-shop-chandbali-earrings-for-ladies-and-girls-buy-online-41753248694587.jpg?v=1688017328' },
//   { name: 'Earring 6', price: 30000, details: 'Details of Item 6', status: 'Available', image: 'https://attrangi.in/cdn/shop/files/vintage-hola-antique-earrings-attrangi-1.jpg?v=1705734005' },
//   { name: 'Earring 7', price: 10000, details: 'Details of Item 7', status: 'Available', image: 'https://images-static.nykaa.com/media/catalog/product/f/1/f112fc7jwj446.jpg' },
//   { name: 'Earring 8', price: 20000, details: 'Details of Item 8', status: 'Sold', image: 'https://images.cltstatic.com/media/product/350/AE00353-SS0000-antique-nanammas-temple-visit-earrings-in--silver-prd-1-model.jpg' },
//   { name: 'Earring 9', price: 30000, details: 'Details of Item 9', status: 'Available', image: 'https://img.tatacliq.com/images/i11/437Wx649H/MP000000017654181_437Wx649H_202305240245571.jpeg' },
// ];

// const Stock = () => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredItems = dummyData.filter(item => {
//     const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
//     const lowerCaseStatus = item.status.toLowerCase();
    
//     if (lowerCaseSearchTerm === 'available' || lowerCaseSearchTerm === 'sold') {
//       return lowerCaseStatus.includes(lowerCaseSearchTerm);
//     }

//     return (
//       item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
//       item.price.toString().includes(lowerCaseSearchTerm) ||
//       lowerCaseStatus.includes(lowerCaseSearchTerm)
//     );
//   });

//   return (
//     <div className="app">
//       <div className="item-container">
//         {selectedItem ? (
//           <>
//             <img src={selectedItem.image} alt={selectedItem.name} className="item-image" />
//             <Title text={selectedItem.name} />
//             <p><span>Price:</span> ${selectedItem.price}</p>
//             <Para text={selectedItem.details} />
//             <p><span>Status: </span>{selectedItem.status}</p>
//           </>
//         ) : (
//             <p className='choose'>Select an item from the table</p>
          
//         )}
//       </div>
//       <div className="table-container">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="search-box"
//         />
//         <table className="item-table">
//           <thead>
//             <tr>
//               <th>Item Name</th>
//               <th>Price</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredItems.map((item, index) => (
//               <tr
//                 key={index}
//                 onClick={() => setSelectedItem(item)}
//                 className={selectedItem && selectedItem.name === item.name ? 'highlighted-row' : ''}
//               >
//                 <td>{item.name}</td>
//                 <td>{item.price}</td>
//                 <td>{item.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Stock;


