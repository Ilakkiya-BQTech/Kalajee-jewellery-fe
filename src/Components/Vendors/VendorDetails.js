// VendorDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../Styles/vendorlist.css';

const VendorDetails = () => {
    const { vendorId } = useParams();

    const jewelryDetails = {
        gold: { weight: "15g", price: "₹75,000" },
        diamond: { weight: "2 carats", price: "₹1,20,000" },
        roseCuts: { weight: "0.5 carats", price: "₹30,000" },
        polis: { weight: "0.3 carats", price: "₹25,000" },
    };

    return (
        <>  
        <Link to="/vendorlist" className="back-link">← Back to Vendors</Link>
        <div className="vendor-details-container">
          
            <h2 className="vendor-details-title">Jewellery Details for Vendor {vendorId}</h2>

            <div className="details-section">
                <div className="detail-card">
                    <h3>Gold</h3>
                    <p>Weight: {jewelryDetails.gold.weight}</p>
                    <p>Price: {jewelryDetails.gold.price}</p>
                </div>

                <div className="detail-card">
                    <h3>Diamond</h3>
                    <p>Weight: {jewelryDetails.diamond.weight}</p>
                    <p>Price: {jewelryDetails.diamond.price}</p>
                </div>

                <div className="detail-card">
                    <h3>Rose Cuts</h3>
                    <p>Weight: {jewelryDetails.roseCuts.weight}</p>
                    <p>Price: {jewelryDetails.roseCuts.price}</p>
                </div>

                <div className="detail-card">
                    <h3>Polis</h3>
                    <p>Weight: {jewelryDetails.polis.weight}</p>
                    <p>Price: {jewelryDetails.polis.price}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default VendorDetails;
