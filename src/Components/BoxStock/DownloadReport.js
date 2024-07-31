import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const fetchImageAsBase64 = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error, url);
    return null;
  }
};

const DownloadReport = ({ items, boxId }) => {
  const handleDownload = async () => {
    try {
      if (!items || items.length === 0) {
        console.error("No items available for the report");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Items Report');

      // Define columns
      worksheet.columns = [
        { header: 'Image', key: 'image', width: 50 },
        { header: 'Item Code', key: 'itemCode', width: 20 },
        { header: 'WH Price', key: 'whPrice', width: 20 },
        { header: '18k Gold (in gms)', key: 'goldWeight', width: 20 },
        { header: 'Gold Value', key: 'goldValue', width: 20 },
        { header: 'Labour', key: 'labour', width: 20 },
        { header: 'Diamond Weight (in cts)', key: 'diamondWeight', width: 20 },
        { header: 'Diamond Value', key: 'diamondValue', width: 20 },
        { header: 'Polki Weight (in cts)', key: 'polkiWeight', width: 20 },
        { header: 'Polki Value', key: 'polkiValue', width: 20 },
        { header: 'Polki Details', key: 'polkiDetails', width: 20 },
        { header: 'Polki Type', key: 'polkiType', width: 20 },
        { header: 'CS Weight (in cts)', key: 'csWeight', width: 20 },
        { header: 'Col St. PCS', key: 'colStPcs', width: 20 },
        { header: 'Col St. Rate (per ct)', key: 'colStRatePerCt', width: 20 },
        { header: 'Col St. Rate (per pc)', key: 'colStRatePerPc', width: 20 },
        { header: 'Col St. Value', key: 'colStValue', width: 20 },
        { header: 'C Stone Name', key: 'cStoneName', width: 20 },
        { header: 'Item Name', key: 'itemName', width: 30 },
        { header: 'Metal Colour', key: 'metalColour', width: 20 },
        { header: 'Silver Weight', key: 'silverWeight', width: 20 },
        { header: 'Sarraf/Other Weight', key: 'sarrafOtherWeight', width: 20 },
        { header: 'Gross Weight (in gms)', key: 'grossWeight', width: 20 },
      ];

      // Apply styles to header
      worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
        cell.font = { bold: true };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ff00ff' } // Violet color
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Add rows and images
      for (const item of items) {
        const row = worksheet.addRow({
          itemCode: item.itemCode || '-',
          whPrice: item.whPrice || '-',
          goldWeight: item.gold18KGrams || '-',
          goldValue: item.goldValue || '-',
          labour: item.labour || '-',
          diamondWeight: item.diamonds.map(d => d.weightCts).join('; ') || '-',
          diamondValue: item.diamonds.map(d => d.value).join('; ') || '-',
          polkiWeight: item.polkis.map(p => p.weightCts).join('; ') || '-',
          polkiValue: item.polkis.map(p => p.value).join('; ') || '-',
          polkiDetails: item.polkis.map(p => p.details).join('; ') || '-',
          polkiType: item.polkis.map(p => p.type).join('; ') || '-',
          csWeight: item.coloredStones.map(cs => cs.weightCts).join('; ') || '-',
          colStPcs: item.coloredStones.map(cs => cs.pcs).join('; ') || '-',
          colStRatePerCt: item.coloredStones.map(cs => cs.ratePerCt).join('; ') || '-',
          colStRatePerPc: item.coloredStones.map(cs => cs.ratePerPc).join('; ') || '-',
          colStValue: item.coloredStones.map(cs => cs.value).join('; ') || '-',
          cStoneName: item.coloredStones.map(cs => cs.name).join('; ') || '-',
          itemName: item.itemName || '-',
          metalColour: item.metalColour || '-',
          silverWeight: item.slvrWt || '-',
          sarrafOtherWeight: item.sarrafOtherWt || '-',
          grossWeight: item.grossWtGrams || '-',
        });

        row.height = 100; 

        if (item.itemImages.length > 0) {
          const base64Image = await fetchImageAsBase64(item.itemImages[0].imageUrl);
          if (base64Image) {
            const imageId = workbook.addImage({
              base64: base64Image.split(",")[1], // Splitting to get the Base64 string without the metadata prefix
              extension: 'jpeg', // Change extension based on your image type
            });

            worksheet.mergeCells(`A${row.number}:A${row.number}`);

            worksheet.addImage(imageId, {
              tl: { col: 0, row: row.number - 1 },
              ext: { width: 100, height: 100 },
            });

            console.log(`Image added for item: ${item.itemCode}`);
          } else {
            worksheet.getCell(`A${row.number}`).value = '-';
            console.log(`Image not added for item: ${item.itemCode}`);
          }
        } else {
          worksheet.getCell(`A${row.number}`).value = '-';
          console.log(`No images available for item: ${item.itemCode}`);
        }
      }

      const buffer = await workbook.xlsx.writeBuffer();
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'BoxStock_Report.xlsx');
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <button className="download-button" onClick={handleDownload}>
      Download Report
    </button>
  );
};

export default DownloadReport;
