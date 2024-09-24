
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/vendorlist.css'; 
import { GetUsersAPI } from '../../Services/APIManager';

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    useEffect(() => {
        const GetUsers = async () => {
          try {
            const result = await GetUsersAPI();
            console.log("Vendors fetched:", result); // Log the fetched vendors
            if (!result.error) {
              setVendors(result); // result is now the array directly
            } else {
              console.error(result.error);
            }
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        };
        GetUsers();
      }, []);
      
    const navigate = useNavigate();

    const handleViewDetails = (vendorId) => {
        navigate(`/vendor/${vendorId}`);
    };

   

    return (
        <div className="vendor-list-container">
            <h1 className="vendor-list-title">Select a Vendor</h1>
            {Array.isArray(vendors) && vendors.length > 0 ? (
                <div className="vendor-list">
                    {vendors.map((vendor) => (
                        <div key={vendor.userId} className="vendor-card">
                            <h3>{vendor.username}</h3>
                            <button onClick={() => handleViewDetails(vendor.id)} className="view-button">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No vendors...</p>
            )}
        </div>
    );
};

export default VendorList;
