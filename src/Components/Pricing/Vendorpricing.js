import React, { useState } from "react";
import '../../Styles/Itemlist.css'
import { AiOutlineArrowLeft } from 'react-icons/ai';
const VendorPricing = ({ selectedData, onBack }) => {
    // Dummy vendor data
    const vendors = [
        { id: 1, name: "Vendor A" },
        { id: 2, name: "Vendor B" },
        { id: 3, name: "Vendor C" },
    ];

    // Dummy pricing details for demonstration
    const dummyPricingDetails = {
        1: { rate: 7500, description: "Standard pricing for Vendor A" },
        2: { rate: 7700, description: "Premium pricing for Vendor B" },
        3: { rate: 7400, description: "Discounted pricing for Vendor C" },
    };

    const [selectedVendor, setSelectedVendor] = useState(null);
    const [pricingDetails, setPricingDetails] = useState(null);

    const handleVendorChange = (e) => {
        const vendorId = e.target.value;
        setSelectedVendor(vendorId);
        
        // Fetch dummy pricing details based on selected vendor
        const details = dummyPricingDetails[vendorId];
        setPricingDetails(details);
    };

    // const handleCalculateQuotation = () => {
       
    //     alert("Calculating quotation for " + selectedVendor);
    // };

    return (
        <>
         <div className="back-button" onClick={onBack}>
                    <AiOutlineArrowLeft />
                </div>
        <div className="vendor-pricing">
            
            <div className="left-section">
           
                <h3>Select Vendor</h3>
                <select onChange={handleVendorChange}>
                    <option value="">Select a vendor</option>
                    {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                            {vendor.name}
                        </option>
                    ))}
                </select>
                {pricingDetails && (
                    <div className="vendor-pricing-details">
                        <h4>Vendor Pricing Details</h4>
                        <p>Rate: ₹{pricingDetails.rate}</p>
                        <p>Description: {pricingDetails.description}</p>
                    </div>
                )}
            </div>
            <div className="right-section">
                <h3>Chosen Items</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedData.map((item) => (
                            <tr key={item.itemId}>
                                <td>
                                    <img src={item.images?.[0]?.imageUrl || 'default-image-url'} alt={item.itemCode} width="50" />
                                </td>
                                <td>{item.itemCode}</td>
                                <td>{item.itemName}</td>
                                <td>₹{parseFloat(item.prices.retailPrice).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button >Calculate Quotation</button>
            </div>
        </div>
        </>
    );
};

export default VendorPricing;
