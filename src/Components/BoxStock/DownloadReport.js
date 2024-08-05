const DownloadReport = ({ items, boxName }) => {
  // Component logic here
  return (
    <button className="download-button">
      Download Report
    </button>
  );
};

// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import logo from '../../Assets/KALAJEE_LOGO-5_3e0d5ad5-5092-430a-8bce-e4060e272afa_115x.avif'
// const DownloadReport = ({ items, boxName, logoUrl }) => {
//   const generateReport = () => {
//     const doc = new jsPDF('landscape');
    
 
//     doc.text('Report for Boxes', 30, 20);

//     // Add logo at top right
//     if (logoUrl) {
//       doc.addImage(logoUrl, 'JPEG', 250, 5, 30, 30); // Adjust the position and size as needed
//     }

//     const columns = [
//       { header: "Image", dataKey: "image" },
//       { header: "Item Code", dataKey: "itemCode" },
//       // { header: "WH Price", dataKey: "whPrice" },
//       // { header: "14k Gold", dataKey: "gold14k" },
//       { header: "Gold Rate", dataKey: "goldRate" },
//       { header: "Gold Value", dataKey: "goldValue" },
//       { header: "Labour", dataKey: "labour" },
//       { header: "Diamond Weight (Cts)", dataKey: "diamondWeight" },
//       { header: "Diamond Rate", dataKey: "diamondRate" },
//       { header: "Diamond Value", dataKey: "diamondValue" },
//       { header: "Polki Weight (Cts)", dataKey: "polkiWeight" },
//       { header: "Polki Rate", dataKey: "polkiRate" },
//       { header: "Polki Value", dataKey: "polkiValue" },
//       { header: "Polki Details", dataKey: "polkiDetails" },
//       { header: "Polki Type", dataKey: "polkiType" },
//       { header: "Colored Stone Weight (Cts)", dataKey: "csWeight" },
//       { header: "Colored Stone Rate", dataKey: "csRate" },
//       { header: "Colored Stone Name", dataKey: "csName" },
//       { header: "Item Name", dataKey: "itemName" },
//       { header: "Metal", dataKey: "metal" },
//       { header: "Color", dataKey: "color" },
//       { header: "Silver Weight (Grams)", dataKey: "silverWeight" },
//       { header: "Sarrafas/Other Weight", dataKey: "otherWeight" },
//       { header: "Gross Weight (Grams)", dataKey: "grossWeight" }
//     ];

//     const rows = items.map(item => ({
//       image: item.itemImages?.[0]?.imageUrl || "N/A",
//       itemCode: item.itemCode || "N/A",
//       // whPrice: item.wholesalePrice || "N/A",
//       // gold14k: item.gold14k || "N/A",
//       goldRate: item.goldRate || "N/A",
//       goldValue: item.goldValue || "N/A",
//       labour: item.labour || "N/A",
//       diamondWeight: item.diamonds.reduce((acc, diamond) => acc + (diamond.weightCts || 0), 0),
//       diamondRate: item.diamonds.reduce((acc, diamond) => acc + (diamond.rate || 0), 0),
//       diamondValue: item.diamonds.reduce((acc, diamond) => acc + (diamond.value || 0), 0),
//       polkiWeight: item.polkis.reduce((acc, polki) => acc + (polki.weightCts || 0), 0),
//       polkiRate: item.polkis.reduce((acc, polki) => acc + (polki.rate || 0), 0),
//       polkiValue: item.polkis.reduce((acc, polki) => acc + (polki.value || 0), 0),
//       polkiDetails: item.polkis.map(polki => polki.details || "N/A").join(', '),
//       polkiType: item.polkis.map(polki => polki.type || "N/A").join(', '),
//       csWeight: item.coloredStones.reduce((acc, stone) => acc + (stone.weightCts || 0), 0),
//       csRate: item.coloredStones.reduce((acc, stone) => acc + (stone.rate || 0), 0),
//       csName: item.coloredStones.map(stone => stone.name || "N/A").join(', '),
//       itemName: item.itemName || "N/A",
//       metal: item.metal || "N/A",
//       color: item.color || "N/A",
//       silverWeight: item.slvrWt || "N/A",
//       otherWeight: item.sarrafOtherWt || "N/A",
//       grossWeight: item.grossWtGrams || "N/A"
//     }));

//     // Add table
//     doc.autoTable({
//       columns: columns,
//       body: rows,
//       startY: 40, // Start below the logo
//       theme: 'grid',
//       didDrawCell: (data) => {
//         // Check if the current cell is the image column
//         if (data.column.dataKey === 'image' && data.cell.section === 'body') {
//           const imgUrl = data.cell.raw;
//           if (imgUrl !== 'N/A') {
//             doc.addImage(imgUrl, 'JPEG', data.cell.x + 2, data.cell.y + 2, 20, 20);
//           }
//         }
//       },
//       columnStyles: {
//         image: { cellWidth: 30 },
//         itemCode: { cellWidth: 30 },
//         whPrice: { cellWidth: 20 },
//         gold14k: { cellWidth: 20 },
//         goldRate: { cellWidth: 20 },
//         goldValue: { cellWidth: 20 },
//         labour: { cellWidth: 20 },
//         diamondWeight: { cellWidth: 20 },
//         diamondRate: { cellWidth: 20 },
//         diamondValue: { cellWidth: 20 },
//         polkiWeight: { cellWidth: 20 },
//         polkiRate: { cellWidth: 20 },
//         polkiValue: { cellWidth: 20 },
//         polkiDetails: { cellWidth: 40 },
//         polkiType: { cellWidth: 20 },
//         csWeight: { cellWidth: 20 },
//         csRate: { cellWidth: 20 },
//         csName: { cellWidth: 30 },
//         itemName: { cellWidth: 30 },
//         metal: { cellWidth: 20 },
//         color: { cellWidth: 20 },
//         silverWeight: { cellWidth: 20 },
//         otherWeight: { cellWidth: 20 },
//         grossWeight: { cellWidth: 20 }
//       }
//     });

//     doc.save('BoxesReport.pdf');
//   };

//   return (
//     <button onClick={generateReport} className="download-button">
//       Download Report
//     </button>
//   );
// };

// export default DownloadReport;

